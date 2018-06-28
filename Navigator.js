import React from "react";
import { createStackNavigator } from "react-navigation";
import { graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";

// style stuff
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Fab, Icon, Button, Container, Text } from "native-base";
import navigationStyles from "./styles/navigationStyles";

// Components
import Login from "./components/user/Login";
import NewPurchase from "./components/money/NewPurchase";
import Purchases from "./components/money/Purchases";
import Purchase from "./components/money/Purchase";
import HeaderRight from "./components/header/HeaderRight";
import { signOut } from "./loginUtils";

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.routeName
    };
  };

  // navigation once logged in. either create new post or view old money

  addNewPurchase = () => {
    this.props.navigation.navigate("NewPurchase");
  };
  goToPurchases = () => {
    this.props.navigation.navigate("Purchases");
  };
  render() {
    return (
      <Container style={styles.container}>
        <Purchases {...this.props} />

        <Button
          title="LogOut"
          onPress={() => {
            signOut();
            this.props.client.resetStore;
          }}
        />
        <Fab
          position="bottomLeft"
          style={styles.newPost}
          onPress={this.addNewPurchase}
        >
          <Icon type="FontAwesome" name="dollar" />
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
const Navigator = createStackNavigator(
  {
    Home: {
      screen: withApollo(Home)
    },
    NewPurchase: {
      screen: NewPurchase
    },
    Purchases: {
      screen: Purchases
    },
    Purchase: {
      screen: Purchase
    }
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
      purchases(orderBy: createdAt_DESC) {
        id
        item
        price
        category
      }
    }
  }
`;

export default graphql(userQuery, {
  props: ({ data }) => ({ ...data })
})(NavWrapper);
