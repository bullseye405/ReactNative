import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Card = props => {
  const { name, description, thumbnail } = props.charData;
  const { path, extension } = thumbnail;
  let img = {
    uri: path + "." + extension
  };
  return (
    <View style={styles.characters}>
      <View style={styles.char}>
        <View style={styles.thumbnail}>
          <Image source={img} style={styles.imgStyle} />
        </View>
        <View style={styles.charDescription}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text} numberOfLines={3}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

let styles = StyleSheet.create({
  characters: {
    display: "flex",
    flexDirection: "row",
    height: 300
    // width: 400,
    // padding: 5
  },
  char: {
    flex: 2,
    // display: "flex",
    // width: 175,
    width: 250,

    padding: 5
  },
  thumbnail: {
    flex: 2,
    borderBottomColor: "#e62429",
    borderBottomWidth: 5
  },
  imgStyle: {
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 20
  },
  charDescription: {
    flex: 1,
    backgroundColor: "#151515",
    // justifyContent: "space-around",
    alignItems: "center",
    borderBottomRightRadius: 20
    // borderBottomLeftRadius: 20
  },
  text: {
    color: "white",
    // flex: 1
    padding: 5
  }
});
