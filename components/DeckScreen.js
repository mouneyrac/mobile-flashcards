import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import Reactotron from "reactotron-react-native";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class DeckScreen extends Component {
  addCard() {
    const { navigate } = this.props.navigation;
    const theDeck = this.props.decks.filter(
      deck => deck.title === this.props.navigation.state.params.title
    );

    navigate("AddCard", {
      deck: {
        title: this.props.navigation.state.params.title,
        questions: theDeck[0].questions
      }
    });
  }

  startQuiz() {
    clearLocalNotification().then(setLocalNotification);

    const { navigate } = this.props.navigation;
    const theDeck = this.props.decks.filter(
      deck => deck.title === this.props.navigation.state.params.title
    );
    navigate("StartedQuiz", {
      deck: {
        title: this.props.navigation.state.params.title,
        questions: theDeck[0].questions
      }
    });
  }

  render() {
    const theDeck = this.props.decks.filter(
      deck => deck.title === this.props.navigation.state.params.title
    );

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "stretch"
        }}
      >
        <Text
          style={{
            marginTop: 40,
            padding: 10,
            alignSelf: "center",
            fontSize: 40
          }}
        >
          {theDeck[0].title}
        </Text>
        <Text
          style={{
            margin: 20,
            padding: 0,
            alignSelf: "center",
            fontSize: 20
          }}
        >
          {theDeck[0].questions.length} Cards
        </Text>
        <Button
          title="Add card"
          onPress={() => {
            this.addCard();
          }}
        />
        {theDeck[0].questions.length !== 0 ? (
          <Button
            title="Start quiz"
            onPress={() => {
              this.startQuiz();
            }}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks: Object.keys(decks).map(key => decks[key])
  };
}

export default connect(mapStateToProps)(DeckScreen);
