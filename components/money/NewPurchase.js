import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import PurchaseForm from "./PurchaseForm";
import navigationStyles from "../../styles/navigationStyles";

class NewPurchase extends Component {
  state = {
    loading: false
  };

  // static navigationOptions = {
  //   title: "New Post",
  //   ...navigationStyles
  // };

  newPurchase = ({ item, price }) => {
    const { newPurchase, navigation, screenProps } = this.props;
    this.setState({ loading: true });
    newPurchase({
      variables: {
        item,
        price,
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
          <PurchaseForm onSubmit={this.newPurchase} />
        )}
      </View>
    );
  }
}

const newPurchase = gql`
  mutation newPurchase($item: String!, $price: Int!, $userId: ID!) {
    createPurchase(item: $item, price: $price, userId: $userId) {
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
