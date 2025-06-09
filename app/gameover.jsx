import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { getHighScore, generateColors } from "../utils/gameLogic.jsx";

const { width } = Dimensions.get("window");

function invertColor(hex) {
  // Remove the # if present
  hex = hex.replace("#", "");

  // Convert hex to RGB
  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);

  // Invert the colors
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  // Convert back to hex
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

export default function GameOver() {
  const params = useLocalSearchParams();
  const [highScore, setHighScore] = useState(0);
  const [showAns, setShowAns] = useState(false);
  const [colors, setColors] = useState([]);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const tempLevel = parseInt(params.level) || 0;
    const colors = JSON.parse(params.lastColors);
    setLevel(tempLevel);
    setColors(colors);
    console.log(colors);
  }, [params.lastColors]);

  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    const score = await getHighScore();
    setHighScore(score);
  };

  const handleStart = () => {
    router.replace("/game");
  };

  const handleReveal = () => {
    setShowAns(!showAns);
  };

  const handleHome = () => {
    router.replace("/");
  };

  const renderAnswer = () => {
    if (colors.length === 0) return null;
    const gridSize = Math.min(9, Math.floor((level + 1) / 2) + 1);
    const boxSize = (width - 40) / gridSize;
    const uniqueColor = colors.find(
      (color, i, arr) => arr.indexOf(color) === arr.lastIndexOf(color)
    );
    const negativeHue = invertColor(uniqueColor);

    return (
      <View style={styles.gameContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.box,
              {
                backgroundColor: color,
                width: boxSize,
                height: boxSize,
              },
              color === uniqueColor && showAns
                ? {
                    borderWidth: 1,
                    borderColor: negativeHue,
                  }
                : {},
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameOverBox}>
        <Text style={styles.gameOverText}>GAME OVER!</Text>
        <Text style={styles.scoreText}>YOU REACHED LEVEL {level}</Text>
        <Text style={styles.highScoreText}>High Score: {highScore}</Text>
        <TouchableOpacity style={styles.resetButton} onPress={handleStart}>
          <Text style={styles.resetButtonText}>PLAY AGAIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReveal}>
          <Text style={styles.resetButtonText}>SHOW ANSWER</Text>
        </TouchableOpacity>
        {renderAnswer()}
        <TouchableOpacity style={styles.resetButton} onPress={handleHome}>
          <Text style={styles.resetButtonText}>BACK TO HOME</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#800080",
    borderRadius: 10,
  },
  titletxt: {
    textAlign: "center",
    color: "white",
    fontSize: 100,
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
    backgroundColor: "purple",
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
