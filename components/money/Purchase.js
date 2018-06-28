import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Icon, Fab } from "native-base";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import navigationStyles from "../../styles/navigationStyles";

class Purchase extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      ...navigationStyles
    };
  };

  updatePurchase = () => {
    const { Purchase } = this.props;
    this.props.navigation.navigate("UpdatePost", {
      id: Purchase.id,
      title: Purchase.item
    });
  };
  render() {
    const { Purchase, loading } = this.props;

    if (loading) return <ActivityIndicator size="large" color="#BADA55" />;
    return (
      <View style={styles.container}>
        <Text style={styles.bodyText}>{Purchase.price}</Text>
        <Text style={styles.bodyText}>{Purchase.category}</Text>
        <Fab style={styles.edit} onPress={this.updatePurchase}>
          <Icon type="FontAwesome" name="edit" />
        </Fab>
      </View>
    );
  }
}

const purchaseQuery = gql`
  query Purchase($id: ID!) {
    Purchase(id: $id) {
      id
      item
      price
      category
    }
  }
`;

export default graphql(purchaseQuery, {
  props: ({ data }) => ({ ...data }),
  options: ({ navigation }) => ({
    variables: {
      id: navigation.state.params.id
    }
  })
})(Purchase);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
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
