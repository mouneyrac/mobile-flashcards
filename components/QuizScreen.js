import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import Reactotron from "reactotron-react-native";
import FlipCard from "react-native-flip-card";

class QuizScreen extends Component {
  state = {
    currentCardIndex: 0,
    currentCard: {},
    cardSide: "question",
    score: 0,
    scorePercent: 0,
    completed: 0,
    totalCards: 0
  };

  componentWillMount() {
    this.restart();
  }

  flipCard() {
    this.state.cardSide === "question"
      ? this.setState({ cardSide: "answer" })
      : this.setState({ cardSide: "question" });
  }

  answer(points) {
    const newScore = this.state.score + points;
    const newScorePercent = parseInt(
      newScore / this.state.totalCards * 100,
      10
    );

    if (this.state.currentCardIndex + 1 < this.state.totalCards) {
      this.setState({
        currentCardIndex: this.state.currentCardIndex + 1,
        currentCard: this.props.navigation.state.params.deck.questions[
          this.state.currentCardIndex + 1
        ],
        cardSide: "question",
        score: newScore,
        scorePercent: newScorePercent
      });
    } else {
      this.setState({
        score: newScore,
        scorePercent: newScorePercent,
        completed: 1
      });
    }
  }

  restart() {
    this.setState({
      currentCardIndex: 0,
      currentCard: this.props.navigation.state.params.deck.questions[0],
      cardSide: "question",
      score: 0,
      scorePercent: 0,
      completed: 0,
      totalCards: this.props.navigation.state.params.deck.questions.length
    });
  }

  render() {
    const answerButtons = this.state.completed ? (
      <View
        style={{
          marginTop: 50
        }}
      >
        <Button
          title="Restart"
          onPress={() => {
            this.restart();
          }}
        />
      </View>
    ) : (
      <View>
        <Text
          style={{
            padding: 10,
            alignSelf: "flex-start",
            fontSize: 20
          }}
        >
          {this.state.currentCardIndex + 1}/{this.state.totalCards}
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
              {this.state.currentCard.question}
            </Text>
          </View>
          {/* Back Side */}
          <View>
            <Text style={{ fontSize: 20 }}>
              {" "}
              {this.state.currentCard.answer}
            </Text>
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

    const finalScore = !this.state.completed ? (
      <View />
    ) : (
      <Text
        style={{
          padding: 50,
          alignSelf: "center",
          fontSize: 20
        }}
      >
        Final score of {this.state.scorePercent}%
      </Text>
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
