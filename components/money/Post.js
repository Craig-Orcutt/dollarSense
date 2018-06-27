import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Icon, Fab } from "native-base";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import navigationStyles from "../../styles/navigationStyles";

class Post extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      ...navigationStyles,
      headerRight: <Icon name='menu' onPress={this.goHome} />
    };
  };


  updatePost = () => {
    const { Post } = this.props;
    this.props.navigation.navigate("UpdatePost", {
      id: Post.id,
      title: Post.title
    })
  }
  render() {
    
    const { Post, loading  } = this.props;

    if (loading) return <ActivityIndicator size="large" color="#BADA55" />;
    return (
      <View style={styles.container}>
        <Text style={styles.bodyText}>{Post.body}</Text>
        <Fab style={styles.edit} onPress={this.updatePost}>
          <Icon type="FontAwesome" name="edit" />
        </Fab>
      </View>
    );
  }
}

const postQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      body
      title
    }
  }
`;

export default graphql(postQuery, {
  props: ({ data }) => ({ ...data }),
  options: ({ navigation }) => ({
    variables: {
      id: navigation.state.params.id
    }
  })
})(Post);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    // justifyContent: "space-between"
  },
  bodyText: {
    fontSize: 16
  },
  edit: {
    backgroundColor: "#BADA55",
    marginRight: 100
  }
});
