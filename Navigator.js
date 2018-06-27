import React from "react";
import { createStackNavigator } from "react-navigation";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Post from "./components/money/Post";
import Posts from "./components/money/Posts";
import NewPost from "./components/money/NewPost";
import Login from "./components/user/Login";
import UpdatePost from "./components/money/EditPost";
import HeaderRight from './components/header/HeaderRight'
import { Fab, Icon, Button,Container, } from "native-base";
import navigationStyles from "./styles/navigationStyles";
import { signOut } from "./loginUtils";

class Home extends React.Component {
  static navigationOptions = ({navigation}) => {    
    return{
      title: navigation.state.routeName,
    }
  };


  // navigation once logged in. either create new post or view old money
  goHome = () => {
    console.log('testing', );
    
  }
  goToPost = () => {
    this.props.navigation.navigate("Post");
  };
  addNewPost = () => {
    this.props.navigation.navigate("NewPost");
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
        <Fab style={styles.newPost} onPress={this.addNewPost}>
          <Icon name="add" />
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
    backgroundColor: "#82D8D8"
  },
  newPostText: {
    fontSize: 20,
    textAlign: "center"
  }
});

// creates navigator stack that I can then use the navigate prop to get to the proper screen
const Navigator = createStackNavigator({
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
  }
},{
  initialRouteName: 'Home',
  navigationOptions :  {
    headerRight: <HeaderRight  />,
    ...navigationStyles
  }
});


// wrapper that is exported basically as the root of the app. if not logged in, user must login or register
const NavWrapper = ({ loading, user }) => {
  if (loading) return <ActivityIndicator size="large" />;
  if (!user) return <Login />;
  return <Navigator  screenProps={{ user }} />;
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
