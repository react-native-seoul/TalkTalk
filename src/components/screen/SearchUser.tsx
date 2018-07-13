import firebase from 'firebase';
import { USE_FIRESTORE } from '@utils/Constants';

import UserListItem from '@shared/UserListItem';
import EmptyListItem from '@shared/EmptyListItem';
import ProfileModal from '@shared/ProfileModal';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  View,
  FlatList,
  Platform,
  Animated, 
} from 'react-native';

import { ratio, colors, statusBarHeight } from '@utils/Styles';
import { IC_BACK, IC_SEARCH } from '@utils/Icons';
import { getString } from '@STRINGS';
import appStore from '@stores/appStore';
import { db_getAllUser } from '@db/User'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  viewSearch: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: colors.dodgerBlue,
    overflow: 'hidden',
  },
  imgSearch: {
    position: 'absolute', 
    width: 16,
    height: 16,
    left: 30, top: 18,
  },
  inputSearch: {
    backgroundColor: 'rgb(247,248,251)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});

class Screen extends Component<any, any> {
  private static navigationOptions = {
    title: getString('SEARCH_USER'),
  };

  private profileModal: any;
  private searchTxt: string = '';
  private scrollY: any = new Animated.Value(0);
  private users: any = [];

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  public async componentDidMount() {
    console.log('componentDidMount', 'SearchUser');
    this.users = await db_getAllUser();
    this.setState({ users: this.users });
  }

  public render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.viewSearch, 
          {height: 50, transform: [{translateY: this.scrollY.interpolate({ 
            inputRange: [-50, 0, 50, 100], 
            outputRange: [0, 0, -50, -50],
          })}],  
          }]}>
          <Animated.View style={{position: 'absolute', width: '100%', paddingHorizontal: 20, height: 50, 
            opacity: this.scrollY.interpolate({ 
            inputRange: [-50, 0, 50, 100], 
            outputRange: [1, 1, 0, 0],
          })}}>
            <TextInput
              onChangeText={(text) => this.onTxtChanged(text)}
              underlineColorAndroid='transparent' // android fix
              autoCapitalize='none'
              autoCorrect={false}
              multiline={false}
              // value={this.searchTxt}
              style={{width: '100%', height: 30, top: 10, backgroundColor: 'white', 
                 borderRadius: 4, paddingLeft: 34, paddingRight: 10}}
              onSubmitEditing={this.onSearch}
              defaultValue={this.searchTxt}
            />
            <Image source={IC_SEARCH} style={styles.imgSearch}/>
          </Animated.View>
        </Animated.View>
        <AnimatedFlatList
          style={{
            width: '100%', height: '100%', marginBottom: -50, 
            transform: [{translateY: this.scrollY.interpolate({ 
              inputRange: [-50, 0, 50, 100], 
              outputRange: [0, 0, -50, -50],
            })}],
          }}
          contentContainerStyle={
            this.state.users.length === 0
              ? {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }
              : null
          }
          keyExtractor={(item, index) => index.toString()}
          data={this.state.users}
          renderItem={this.renderItem}
          ListEmptyComponent={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
          
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.scrollY}}}],
            {useNativeDriver: true, listener: this.onScroll}, 
          )}
        />
      </View>
    );
  }

  private onScroll = (e) => {
    // console.log(e.nativeEvent.contentOffset.y);
  }

  private renderItem = ({ item }) => {
    return (
      <UserListItem
        item={item}
        onPress={() => this.onItemClick(item)}
      />
    );
  }

  private onItemClick = (item) => {
    // console.log(item);
    this.props.navigation.navigate('Profile', { user: item });
  }

  private onTxtChanged = (txt) => {
    this.searchTxt = txt;
    this.onSearch();
  }

  private onSearch = () => {
    console.log('onSearch: ' + this.searchTxt);
    if (this.searchTxt === '') {
      this.setState({users: this.users});
    } else {
      this.setState({users: this.users.filter((item) => item.displayName.includes(this.searchTxt))});
    }
  }

  private onChat = () => {
    this.props.navigation.navigate('Chat');
  }
}

export default Screen;
