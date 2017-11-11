import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Reactotron from "reactotron-react-native";

class Deck extends Component {
  render() {
    const { title, cards } = this.props;
    const cardsTotal = cards.length;

    return (
      <View style={[styles.container, styles.card]}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardContent}>{cardsTotal} cards</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    margin: 5,
    height: 100
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
  },
  cardTitle: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 16,
    fontWeight: "bold"
  },
  cardContent: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16
  }
});

export default Deck;
