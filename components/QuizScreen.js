import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import Reactotron from "reactotron-react-native";

class QuizScreen extends Component {
  state = {
    currentCard: 0,
    cardSide: "question",
    score: 0
  };

  flipCard() {
    this.state.cardSide === "question"
      ? this.setState({ cardSide: "answer" })
      : this.setState({ cardSide: "question" });
  }

  answer(points) {
    if (
      this.state.currentCard <=
      this.props.navigation.state.params.deck.questions.length
    ) {
      this.setState({
        currentCard: this.state.currentCard + 1,
        score: this.state.score + points
      });
    } else {
      this.setState({ score: this.state.score + points });
    }
  }

  render() {
    Reactotron.log(this.state.currentCard);
    Reactotron.log(this.props.navigation.state.params.deck.questions.length);

    const currentCard = this.props.navigation.state.params.deck.questions[
      this.state.currentCard
    ];

    let maintext = "";
    if (
      this.props.navigation.state.params.deck.questions.length >
      this.state.currentCard
    ) {
      maintext =
        this.state.cardSide === "question"
          ? currentCard.question
          : currentCard.answer;
    }

    const currentScore =
      this.state.score /
      this.props.navigation.state.params.deck.questions.length *
      100;

    const finalScore =
      this.props.navigation.state.params.deck.questions.length >
      this.state.currentCard ? (
        <View />
      ) : (
        <Text
          style={{
            padding: 50,
            alignSelf: "center",
            fontSize: 20
          }}
        >
          Final score of {parseInt(currentScore, 10)}%
        </Text>
      );

    const answerButtons =
      this.props.navigation.state.params.deck.questions.length <=
      this.state.currentCard ? (
        <View />
      ) : (
        <View>
          <Text
            style={{
              padding: 10,
              alignSelf: "flex-start",
              fontSize: 20
            }}
          >
            {this.state.currentCard + 1}/{
              this.props.navigation.state.params.deck.questions.length
            }
          </Text>
          <Text
            style={{
              marginTop: 50,
              margin: 20,
              padding: 0,
              alignSelf: "center",
              fontSize: 20
            }}
          >
            {maintext}
          </Text>
          <View
            style={{
              marginBottom: 50
            }}
          >
            <Button
              title={this.state.cardSide === "question" ? "Answer" : "Question"}
              onPress={() => {
                this.flipCard();
              }}
            />
          </View>
          <Button
            title="Correct"
            onPress={() => {
              this.answer(1);
            }}
          />
          <Button
            title="Incorrect"
            onPress={() => {
              this.answer(0);
            }}
          />
        </View>
      );

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "stretch"
        }}
      >
        {answerButtons}
        {finalScore}
      </View>
    );
  }
}

function mapStateToProps({ decks }) {
  return {
    decks: Object.keys(decks).map(key => decks[key])
  };
}

export default connect(mapStateToProps)(QuizScreen);
