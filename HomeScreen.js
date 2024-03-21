import { View, Button, Text, Image, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "531C68",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
       style={styles.avatar}
        source={require("./assets/bg-rick-morty.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginLeft: 12,
    width: 300,
    height: 300,
  },
});
