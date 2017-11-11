import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import Reactotron from "reactotron-react-native";
import FlipCard from "react-native-flip-card";

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
        cardSide: "question",
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
          <FlipCard
            style={{
              marginTop: 0,
              paddingBottom: 50,
              margin: 0,
              padding: 0,
              alignSelf: "center"
            }}
            friction={6}
            alignHeight={true}
            perspective={500}
            flipHorizontal={true}
            flipVertical={false}
            flip={this.state.cardSide === "question" ? false : true}
            clickable={false}
            onFlipEnd={isFlipEnd => {
              console.log("isFlipEnd", isFlipEnd);
            }}
          >
            {/* Face Side */}
            <View style={{ flex: 1, marginBottom: 50 }}>
              <Text style={{ fontSize: 20, marginBottom: 50 }}>
                {currentCard.question}
              </Text>
            </View>
            {/* Back Side */}
            <View>
              <Text style={{ fontSize: 20 }}> {currentCard.answer}</Text>
            </View>
          </FlipCard>

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
