import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button, Icon} from 'native-base'
import {withNavigation} from 'react-navigation'


class HeaderRight extends Component {

  render() {
    return (

        <Button onPress={() =>this.props.navigation.navigate('Home')}><Icon name='menu'></Icon></Button>

    )
  }
}

export default withNavigation(HeaderRight)