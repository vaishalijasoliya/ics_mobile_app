import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import bgMessaging from "./bgMessaging";

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
console.disableYellowBox = true;
