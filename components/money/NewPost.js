import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import PostForm from "./PostForm";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import navigationStyles from "../../styles/navigationStyles";

class NewPost extends Component {
  state = {
    loading: false
  };

  static navigationOptions = {
    title: "New Post",
    ...navigationStyles
  };

  newPost = ({ title, body }) => {
    const { newPost, navigation, screenProps } = this.props;
    this.setState({ loading: true });
    newPost({
      variables: {
        title,
        body,
        userId: screenProps.user.id
      }
    })
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        console.log("err", err);
      });
  };
  render() {
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator
            style={{ marginTop: 400 }}
            size="large"
            color="#BADA55"
          />
        ) : (
          <PostForm onSubmit={this.newPost} />
        )}
      </View>
    );
  }
}

const newPost = gql`
  mutation newPost($title: String!, $body: String!, $userId: ID!) {
    createPost(title: $title, body: $body, userId: $userId) {
      id
    }
  }
`;

export default graphql(newPost, {
  name: "newPost",
  options: {
    refetchQueries: ["userQuery"]
  }
})(NewPost);
