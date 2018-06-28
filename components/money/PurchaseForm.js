import React, { Component } from "react";
import { TextInput, View, StyleSheet, Picker, Dimensions } from "react-native";
import { Form, Item, Input, Label, Button, Text } from "native-base";

export default class PurchaseForm extends Component {
  static defaultProps = {
    purchase: {}
  };

  state = {
    item: this.props.purchase.item || "",
    price: this.props.purchase.price || "",
    category: this.props.purchase.category || ""
  };

  submitForm = () => {
    console.log("this.state", this.state);

    this.props.onSubmit({
      item: this.state.item,
      price: parseInt(this.state.price),
      category: this.state.category
    });
  };
  render() {
    return (
      <Form style={styles.form}>
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
            onChangeText={price => this.setState({ price })}
            value={this.state.price}
            keyboardType="numeric"
          />
        </Item>
        <Picker
          selectedValue={this.state.category}
          onValueChange={category => this.setState({ category })}
          triggerType="onClick"
          style={{ height: 50, width: 100 }}
        >
          <Picker.Item label="Dining" value={"dining"} />
          <Picker.Item label="Fuel" value={"fuel"} />
          <Picker.Item label="Clothes" value={"clothes"} />
          <Picker.Item label="Groceries" value={"groceries"} />
          <Picker.Item label="Gifts" value={"gifts"} />
          <Picker.Item label="Recreation" value={"recreation"} />
        </Picker>
        <Button full success style={styles.button} onPress={this.submitForm}>
          <Text> "Save Purchase"</Text>
        </Button>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 100
  },
  form: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    borderColor: "#BADA55",
    borderWidth: 2
  }
});
