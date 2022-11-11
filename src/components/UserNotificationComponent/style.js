import { StyleSheet, Dimensions } from "react-native";
import theme from "../../config/theme";
const SCREEN_WIDTH = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  albumContainer: { marginHorizontal: 5, backgroundColor: "#fff" },
  approve: { color: "green" },
  deny: { color: "red" },
  pending: { color: "#e8bd2e" },
});
