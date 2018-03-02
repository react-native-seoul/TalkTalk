import 'react-native';
import * as React from 'react';
import message from '../Screen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { shallow, render } from 'enzyme';

describe('rendering test', () => {
  const wrapper = shallow(
    <message />,
  );

  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
