import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Icon} from 'native-base'
import {withNavigation} from 'react-navigation'


class HeaderRight extends Component {
  
  static navigationOptions = ({navigation}) => {
    console.log('navigation', navigation);
    
    return{
      title: navigation.state.routeName,
    }
  };
  render() {
    return (

        <Button large style={styles.button} transparent onPress={() =>this.props.navigation.navigate('Home')}><Icon name='menu'></Icon></Button>

    )
  }
}

const styles = StyleSheet.create({
  button: {
    
  }
})
export default withNavigation(HeaderRight)