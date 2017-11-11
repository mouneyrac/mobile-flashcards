import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Deck from "./Deck";
import { connect } from "react-redux";
import Reactotron from "reactotron-react-native";

class DeckListScreen extends Component {
  onDeckPress(deck) {
    this.props.navigation.navigate("Quiz", deck);
  }

  render() {
    const decks = this.props.decks.map(deck => {
      return (
        <TouchableOpacity
          key={deck.title}
          onPress={() => this.onDeckPress(deck)}
        >
          <Deck title={deck.title} cards={deck.questions} />
        </TouchableOpacity>
      );
    });

    const deckList = (
      <ScrollView style={styles.listContainer}>
        {decks.length != 0 ? (
          decks
        ) : (
          <View style={styles.nodecks}>
            <Text>Please add a deck</Text>
          </View>
        )}
      </ScrollView>
    );

    return <View style={styles.container}>{deckList}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center"
  },
  listContainer: {
    flex: 1
  },
  nodecks: {
    alignSelf: "center",
    marginTop: 50
  }
});

function mapStateToProps({ decks }) {
  return {
    decks: Object.keys(decks).map(key => decks[key])
  };
}

export default connect(mapStateToProps)(DeckListScreen);
