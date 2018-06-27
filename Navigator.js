import React from "react";
import { createStackNavigator } from "react-navigation";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";

// style stuff
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Fab, Icon, Button, Container } from "native-base";
import navigationStyles from "./styles/navigationStyles";

// Components
import Post from "./components/money/Post";
import Posts from "./components/money/Posts";
import NewPost from "./components/money/NewPost";
import Login from "./components/user/Login";
import UpdatePost from "./components/money/EditPost";
import NewPurchase from "./components/money/NewPurchase";
import HeaderRight from "./components/header/HeaderRight";
import { signOut } from "./loginUtils";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.routeName
    };
  };

  // navigation once logged in. either create new post or view old money
  goToPost = () => {
    this.props.navigation.navigate("Post");
  };
  addNewPost = () => {
    this.props.navigation.navigate("NewPost");
  };
  addNewPurchase = () => {
    this.props.navigation.navigate("NewPurchase");
  };
  render() {
    return (
      <Container style={styles.container}>
        <Posts {...this.props} />
        <Button
          title="LogOut"
          onPress={() => {
            signOut();
            this.props.client.resetStore;
          }}
        />
        <Fab
          position="bottomRight"
          style={styles.newPost}
          onPress={this.addNewPost}
        >
          <Icon type='FontAwesome' name="plus" />
        </Fab>
        <Fab
          position="bottomLeft"
          style={styles.newPost}
          onPress={this.addNewPurchase}
        >
          <Icon  type='FontAwesome' name="dollar" />
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  newPost: {
    backgroundColor: "#82D8D8",

  },
  newPostText: {
    fontSize: 20,
    textAlign: "center"
  }
});

// creates navigator stack that I can then use the navigate prop to get to the proper screen
const Navigator = createStackNavigator(
  {
    Home: {
      screen: withApollo(Home)
    },
    Post: {
      screen: Post
    },
    NewPost: {
      screen: NewPost
    },
    UpdatePost: {
      screen: UpdatePost
    },
    NewPurchase: {
      screen: NewPurchase
    },
  },
  {
    initialRouteName: "Home",
    // options that extend through application without having to apply to each component
    navigationOptions: {
      headerRight: <HeaderRight />,
      ...navigationStyles
    }
  }
);

// wrapper that is exported basically as the root of the app. if not logged in, user must login or register
const NavWrapper = ({ loading, user }) => {
  if (loading) return <ActivityIndicator size="large" />;
  if (!user) return <Login />;
  return <Navigator screenProps={{ user }} />;
};

// graphql to get all posts by a user
const userQuery = gql`
  query userQuery {
    user {
      id
      email
      posts(orderBy: createdAt_DESC) {
        id
        title
      }
    }
  }
`;

export default graphql(userQuery, {
  props: ({ data }) => ({ ...data })
})(NavWrapper);
