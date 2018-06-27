import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { withApollo } from "react-apollo";
import CreaterUser from "./CreateUser";
import LoginUser from "./LoginUser";

class Login extends Component {
  state = {
    register: true
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.register ? (
          <CreaterUser {...this.props} />
        ) : (
          <LoginUser {...this.props} />
        )}
        <Button
          onPress={() =>
            this.setState({
              register: !this.state.register
            })
          }
          title={this.state.register ? "Login" : "Register"}
        />
      </View>
    );
  }
}

export default withApollo(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});
