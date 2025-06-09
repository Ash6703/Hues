import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { getHighScore } from "../utils/gameLogic.jsx";

export default function Home() {
  const [highScore, setHighScore] = useState(0);
  const [randomColor, setRandomColor] = useState();
  const [mode, setMode] = useState("endless");

  useEffect(() => {
    loadHighScore();
    changeColor();
  }, []);

  const loadHighScore = async () => {
    const score = await getHighScore();
    setHighScore(score);
  };
  const changeColor = () => {
    const newColor = Math.floor(Math.random() * 16777215);
    const randomColorHex = `#${newColor.toString(16).padStart(6, "0")}`;
    setRandomColor(randomColorHex);
  };

  const startGame = () => {
    router.push({ pathname: "/game", params: { mode } });
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.titlebox,
          { backgroundColor: randomColor, borderRadius: 10 },
        ]}
      >
        <TouchableOpacity onPress={() => changeColor()} activeOpacity={1}>
          <Text style={styles.titletxt}>HUES</Text>
          <Text style={styles.subtxt}>TAP THE ODD ONE OUT</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: randomColor }]}
        onPress={() => startGame()}
      >
        <Text style={styles.startButtonText}>START GAME</Text>
      </TouchableOpacity>
      <View style={styles.highScoreBox}>
        <Text style={styles.highScoreText}>High Score: {highScore}</Text>
      </View>
      <Text style={styles.credittxt}>-ASHLIN CHIRAKKAL</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  titlebox: {
    marginBottom: 50,
    padding: 15,
    width: "300",
    borderRadius: 10,
  },
  titletxt: {
    textAlign: "center",
    color: "white",
    fontSize: 80,
    fontFamily: "Tiny5-Regular",
  },
  subtxt: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    paddingBottom: 40,
    fontFamily: "Tiny5-Regular",
  },
  startButton: {
    padding: 15,
    borderRadius: 10,
  },
  startButtonText: {
    fontFamily: "Tiny5-Regular",
    color: "white",
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: 30,
  },
  credittxt: {
    color: "white",
    fontFamily: "Tiny5-Regular",
    position: "absolute",
    bottom: 20,
    right: 10,
    fontSize: 15,
  },
  highScoreBox: {
    marginTop: 30,
  },
  gameContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  box: {
    margin: 2,
  },
  levelText: {
    fontFamily: "Tiny5-Regular",
    fontSize: 40,
    marginBottom: 20,
    color: "white",
  },
  gameOverBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  gameOverText: {
    fontFamily: "Tiny5-Regular",
    fontSize: 30,
    marginBottom: 10,
    color: "white",
  },
  scoreText: {
    fontFamily: "Tiny5-Regular",
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  resetButton: {
    backgroundColor: "purple",
    borderRadius: 5,
    margin: 10,
  },
  resetButtonText: {
    fontFamily: "Tiny5-Regular",
    color: "white",
    fontSize: 18,
    paddingHorizontal: 10,
    paddingBottom: 8,
    textAlign: "center",
  },
  timeText: {
    fontFamily: "Tiny5-Regular",
    fontSize: 40,
    marginBottom: 10,
    color: "white",
  },
  highScoreText: {
    fontFamily: "Tiny5-Regular",
    fontSize: 30,
    marginBottom: 10,
    color: "white",
  },
});
