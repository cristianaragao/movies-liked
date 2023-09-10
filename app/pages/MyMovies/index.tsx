import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function MyMovies() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#ffffff" }}>
        Meus Filmes
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
