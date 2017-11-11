import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Deck from "./Deck";
import { connect } from "react-redux";
import Reactotron from "reactotron-react-native";

class DeckListScreen extends Component {
  render() {
    const decks = this.props.decks.map(deck => {
      return (
        <Deck key={deck.title} title={deck.title} cards={deck.questions} />
      );
    });

    const deckList = (
      <ScrollView style={styles.listContainer}>{decks}</ScrollView>
    );

    return <View style={styles.container}>{deckList}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: 30
  },
  listContainer: {
    flex: 1
  }
});

function mapStateToProps({ decks }) {
  return {
    decks: Object.keys(decks).map(key => decks[key])
  };
}

export default connect(mapStateToProps)(DeckListScreen);
