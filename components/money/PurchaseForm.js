import React, { Component } from "react";
import { TextInput, Button, View, StyleSheet } from "react-native";
import { Form, Item, Input, Label } from "native-base";

export default class PurchaseForm extends Component {
  static defaultProps = {
    purchase: {}
  };

  state = {
    item: this.props.purchase.item || "",
    price: this.props.purchase.price || 0
  };

  submitForm = () => {
    this.props.onSubmit({
      item: this.state.item,
      price: parseInt(this.state.price)
    });
  };
  render() {
    return (
      <Form>
        <Item floatingLabel>
          <Label>What did you buy? </Label>
          <Input
            onChangeText={item => this.setState({ item })}
            value={this.state.title}
          />
        </Item>
        <Item floatingLabel>
          <Label>How Much was it?</Label>
          <Input
            style={styles.body}
            onChangeText={price => this.setState({ price })}
            value={this.state.price}
          />
        </Item>
        <Button title="Save Purchase" onPress={this.submitForm} />
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: 400,

    textAlignVertical: "top"
  }
});
