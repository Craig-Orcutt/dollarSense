import React, { Component } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

// style stuff
import { Icon, List, ListItem, Body, Right } from "native-base";

class Purchases extends Component {
  render() {
    const { navigation, screenProps } = this.props;
    return (
      <View>
        <List>
          <FlatList
            data={screenProps.user.purchases}
            renderItem={({ item }) => (
              <ListItem
                onPress={() =>
                  navigation.navigate("Purchase", {
                    id: item.id,
                    title: item.item
                  })
                }
              >
                <Body>
                  <Text>
                    {item.item} {item.price}
                  </Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )}
            keyExtractor={item => item.id}
          />
        </List>
      </View>
    );
  }
}

const userQuery = gql`
  query userQuery {
    user {
      id
      email
      purchases {
        id
        item
        price
        createdAt
      }
    }
  }
`;

const styles = StyleSheet.create({});

export default graphql(userQuery, {
  props: ({ data }) => ({ ...data })
})(Purchases);
