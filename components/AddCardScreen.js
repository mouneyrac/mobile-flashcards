import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { updateDeck } from "../actions";
import Reactotron from "reactotron-react-native";

class AddCardScreen extends Component {
  state = {
    question: "",
    answer: ""
  };

  addCard() {
    const { navigate } = this.props.navigation;

    // add the new card to the questions
    const newquestions = [
      ...this.props.navigation.state.params.deck.questions,
      {
        question: this.state.question,
        answer: this.state.answer
      }
    ];

    const newdeck = {
      ...this.props.navigation.state.params.deck,
      ...{ questions: newquestions }
    };

    this.props.updateDeck({ [newdeck.title]: newdeck });

    navigate("Quiz", newdeck);
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
          placeholder="Question"
          onChangeText={question => this.setState({ question })}
        />
        <TextInput
          style={{ margin: 20, padding: 10, height: 40, borderWidth: 1 }}
          placeholder="Answer"
          onChangeText={answer => this.setState({ answer })}
        />
        <Button
          title="Add"
          onPress={() => {
            this.addCard();
          }}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDeck: data => dispatch(updateDeck(data))
  };
}

export default connect(null, mapDispatchToProps)(AddCardScreen);
