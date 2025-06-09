import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { generateColors, saveHighScore } from "../utils/gameLogic.jsx";

const { width } = Dimensions.get("window");

export default function Game() {
  const [level, setLevel] = useState(1);
  const [colors, setColors] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [cheat, setCheat] = useState(false);
  const [cheatCount, setCheatCount] = useState(1);

  const { mode } = useLocalSearchParams();

  useEffect(() => {
    if (mode == "normal") {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        handleGameOver();
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    const newColors = generateColors(level);
    setColors(newColors);
  }, [level]);

  const handleBoxPress = (index) => {
    const uniqueColor = colors.find(
      (color, i, arr) => arr.indexOf(color) === arr.lastIndexOf(color)
    );
    if (colors[index] === uniqueColor) {
      setLevel((prevLevel) => prevLevel + 1);
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = async () => {
    if(mode=="normal") await saveHighScore(level);
    router.replace({
      pathname: "/gameover",
      params: {
        level: level.toString(),
        lastColors: JSON.stringify(colors),
        mode: mode,
      },
    });
  };

  const handleCheat = () => {
    setCheatCount((prevCheat) => prevCheat + 1);
    if (cheatCount === 10) setCheat(true);
  };

  const renderGame = () => {
    const gridSize = Math.min(9, Math.floor((level + 1) / 2) + 1);
    const boxSize = (width - 40) / gridSize;
    const uniqueColor = colors.find(
      (color, i, arr) => arr.indexOf(color) === arr.lastIndexOf(color)
    );
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
              color === uniqueColor && cheat
                ? {
                    borderWidth: 1,
                    borderColor: "red",
                  }
                : {},
            ]}
            onPress={() => handleBoxPress(index)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={handleCheat}>
        {mode == "normal" ? (
          <Text style={styles.timeText}>{timeLeft}</Text>
        ) : (
          <Text style={styles.timeText}>infinite</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.levelText}>LEVEL: {level}</Text>
      {renderGame()}
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
