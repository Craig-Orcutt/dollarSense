import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import PurchaseForm from "./PurchaseForm";

class NewPurchase extends Component {
  state = {
    loading: false
  };

  // static navigationOptions = {
  //   title: "New Post",
  //   ...navigationStyles
  // };

  newPurchase = ({ item, price, category }) => {
    const { newPurchase, navigation, screenProps } = this.props;
    this.setState({ loading: true });
    newPurchase({
      variables: {
        item,
        price,
        category,
        userId: screenProps.user.id
      }
    })
      .then(() => {
        navigation.navigate("Purchases");
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
          <PurchaseForm onSubmit={this.newPurchase} />
        )}
      </View>
    );
  }
}

const newPurchase = gql`
  mutation newPurchase(
    $item: String!
    $price: Int!
    $userId: ID!
    $category: String!
  ) {
    createPurchase(
      item: $item
      price: $price
      userId: $userId
      category: $category
    ) {
      id
    }
  }
`;

export default graphql(newPurchase, {
  name: "newPurchase",
  options: {
    refetchQueries: ["userQuery"]
  }
})(NewPurchase);
