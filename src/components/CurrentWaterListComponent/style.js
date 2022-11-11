import { StyleSheet, Dimensions } from "react-native";
import theme from "../../config/theme";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
export const styles = StyleSheet.create({
  albumContainer: { flex: 1, justifyContent: "center" },
  divider: {
    height: (SCREEN_HEIGHT * 6) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e6e6e6",
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 8,
    elevation: 1,
    shadowOpacity: 0.29,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  verticalListComponentInner: {
    marginHorizontal: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    //height:(SCREEN_HEIGHT*17)/100,
    height: 110,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 3.65,
    elevation: 5,
  },
  verticalListComponentRow: { flexDirection: "row" },
  verticalListComponentColumn: { flex: 1.2, paddingHorizontal: 10 },
  verticalListComponentColumn1: { flex: 2, paddingHorizontal: 10 },
  verticalListComponentTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
    textAlign: "left",
  },
  verticalListComponentTitleOne: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginTop: 5,
    textAlign: "left",
  },
  verticalListComponentPost: {
    color: theme.DARK_GREY_COLOR,
    fontSize: 15,
    marginTop: 5,
    fontSize: 10,
  },
  statusContainer: { flexDirection: "row", padding: 10 },
});
