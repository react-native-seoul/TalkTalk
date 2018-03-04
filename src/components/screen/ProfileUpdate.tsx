import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  Platform,
} from 'react-native';

import { ratio, colors, statusBarHeight } from '@utils/Styles';
import HeaderBack from '@shared/HeaderBack';
import { IC_BACK, IC_MASK } from '@utils/Icons';
import { getString } from '@STRINGS';
import appStore from '@stores/appStore';
import TextInput from '@shared/TextInput';
import Button from '@shared/Button';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight, // false to get height of android too.
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    marginTop: 40 * ratio,
    width: '78%',

    flexDirection: 'column',
    alignItems: 'center',
  },
  btnWrapper: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24 * ratio,
    marginBottom: 48 * ratio,
  },
  btnLogout: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 4 * ratio,
    borderWidth: 1 * ratio,
    width: 136 * ratio,
    height: 60 * ratio,
    borderColor: colors.dodgerBlue,
    marginRight: 4 * ratio,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLogout: {
    fontSize: 16 * ratio,
    fontWeight: 'bold',
    color: colors.dodgerBlue,
  },
  btnUpdate: {
    backgroundColor: colors.dodgerBlue,
    borderColor: colors.dodgerBlue,
    borderRadius: 4 * ratio,
    borderWidth: 1 * ratio,
    width: 136 * ratio,
    height: 60 * ratio,
    marginLeft: 4 * ratio,
    shadowColor: colors.dodgerBlue,
    shadowOffset: {
      width: 0,
      height: 10 * ratio,
    },
    shadowRadius: 4 * ratio,
    shadowOpacity: 0.3,

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtUpdate: {
    fontSize: 16 * ratio,
    fontWeight: 'bold',
    color: 'white',
  },
  img: {
    width: 60 * ratio,
    height: 60 * ratio,
  },
});

class Screen extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      name: '',
      statusMsg: '',
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <HeaderBack
          imgSrc={IC_BACK}
          onBackPressed={this.goBack}
        >{getString('MY_PROFILE')}</HeaderBack>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.wrapper}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.onPressImg}
            >
              <Image source={IC_MASK} style={styles.img} />
            </TouchableOpacity>
            <TextInput
              style={{ marginTop: 24 * ratio }}
              txtLabel={getString('NAME')}
              txtHint={ getString('NAME') }
              txt={ this.state.pw }
              onTextChanged={ (text) => this.onTextChanged('NAME', text)}
              isPassword={ true }
            />
            <TextInput
              style={{ marginTop: 24 * ratio }}
              txtLabel={getString('STATUS_MSG')}
              txtHint={ getString('STATUS_MSG') }
              txt={ this.state.pw }
              onTextChanged={ (text) => this.onTextChanged('STATUS_MSG', text)}
              isPassword={ true }
            />
            <View style={styles.btnWrapper}>
              <Button
                onPress={this.onLogout}
                style={styles.btnLogout}
                textStyle={styles.txtLogout}
              >{getString('LOGOUT')}</Button>
              <Button
                isLoading={this.state.isUpdating}
                onPress={this.onUpdate}
                style={styles.btnUpdate}
                textStyle={styles.txtUpdate}
              >{getString('UPDATE')}</Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  private onLogout = () => {
    console.log('onLogout');
  }

  private onUpdate = () => {
    console.log('onUpdate');
  }

  private onTextChanged = (type, text) => {
    switch (type) {
      case 'NAME':
        this.setState({ name: text });
        return;
      case 'STATUS_MSG':
        this.setState({ statusMsg: text });
        return;
    }
  }

  private goBack = () => {
    this.props.navigation.goBack();
  }

  private onPressImg = () => {
    console.log('onPressImg');
  }
}

export default Screen;
