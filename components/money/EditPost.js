import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import PostForm from "./PostForm";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import navigationStyles from "../../styles/navigationStyles";

class UpdatePost extends Component {
  state = {
    loading: false
  };

  static navigationOptions = {
    title: "Edit Post",
    ...navigationStyles,
    
  };

  updatePost = ({ title, body }) => {
    const { updatePost, navigation, screenProps, Post } = this.props;
    this.setState({ loading: true });
    updatePost({
      variables: {
        id: Post.id,
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
          <PostForm onSubmit={this.updatePost} post={this.props.Post}  />
        )}
      </View>
    );
  }
}

const updatePost = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!, $userId: ID!) {
    updatePost(id: $id, title: $title, body: $body, userId: $userId, ) {
      id
    }
  }
`;

const postQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      body
      title
    }
  }
`;

export default compose(
  graphql(updatePost, {
    name: "updatePost",
    options: {
      refetchQueries: ["Post"]
    }
  }),
  graphql(postQuery, {
    props: ({ data }) => ({ ...data }),
    options: ({ navigation }) => ({
      variables: {
        id: navigation.state.params.id
      }
    })
  })
)(UpdatePost);
