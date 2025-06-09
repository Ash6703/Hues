import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveHighScore = async (score) => {
  try {
    const currentHighScore = await AsyncStorage.getItem("highScore");
    if (currentHighScore === null || score > parseInt(currentHighScore)) {
      await AsyncStorage.setItem("highScore", score.toString());
    }
  } catch (error) {
    console.error("Error saving high score:", error);
  }
};

export const getHighScore = async () => {
  try {
    const highScore = await AsyncStorage.getItem("highScore");
    return highScore !== null ? parseInt(highScore) : 0;
  } catch (error) {
    console.error("Error retrieving high score:", error);
    return 0;
  }
};

export const generateColors = (level) => {
  const baseColor = Math.floor(Math.random() * 16777215);
  let differentColor = baseColor;

  const adjustment = Math.max(5, 30 - level);
  const direction = Math.random() < 0.5 ? 1 : -1;

  for (let i = 0; i < 3; i++) {
    let component = (baseColor >> (8 * i)) & 255;
    component = Math.max(0, Math.min(255, component + adjustment * direction));
    differentColor =
      (differentColor & ~(255 << (8 * i))) | (component << (8 * i));
  }

  const baseColorHex = `#${baseColor.toString(16).padStart(6, "0")}`;
  const differentColorHex = `#${differentColor.toString(16).padStart(6, "0")}`;

  const gridSize = Math.min(9, Math.floor((level + 1) / 2) + 1);
  const totalBoxes = gridSize * gridSize;
  const differentIndex = Math.floor(Math.random() * totalBoxes);

  return Array(totalBoxes)
    .fill()
    .map((_, index) =>
      index === differentIndex ? differentColorHex : baseColorHex
    );
};
