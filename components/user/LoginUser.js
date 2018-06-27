import React, { Component } from "react";
import { View, Text } from "react-native";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import { signIn } from "../../loginUtils";
import UserForm from "./UserForm";

class LoginUser extends Component {
  loginUser = async ({ email, password }) => {
    try {
      const signin = await this.props.signinUser({
        variables: { email, password }
      });
      signIn(signin.data.signinUser.token);
      this.props.client.resetStore();
    } catch (e) {
      console.log("error", e);
    }
  };
  render() {
    return (
      <View>
        <Text>Login</Text>
        <UserForm onSubmit={this.loginUser} type="Login" />
      </View>
    );
  }
}

const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

export default graphql(signinUser, { name: "signinUser" })(LoginUser);
