import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";

class AddDeckScreen extends Component {
  state = {
    title: ""
  };

  addDeck() {
    const { navigate } = this.props.navigation;

    this.props.addDeck({
      [this.state.title]: { title: this.state.title, questions: [] }
    });
    navigate("Decks");
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center"
        }}
      >
        <TextInput
          style={{ margin: 20, padding: 10, height: 40, borderWidth: 1 }}
          placeholder="Title"
          onChangeText={title => this.setState({ title })}
        />
        <Button
          title="Add"
          onPress={() => {
            this.addDeck();
          }}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: data => dispatch(addDeck(data))
  };
}

export default connect(null, mapDispatchToProps)(AddDeckScreen);
