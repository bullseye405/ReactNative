import React, { Component } from "react";
import { Button, View, Text, Image, ImageBackground } from "react-native";
import { ThemeContext } from "../../App";

export default class Homescreen extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => (
          <ImageBackground
            source={require("../public/images/marvel2.jpeg")}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
              <Text style={value}>Marvel Cinematic Universe</Text>
              <Button
                title="Enter Marvel Universe"
                onPress={() => this.props.navigation.navigate("About")}
              />
            </View>
          </ImageBackground>
        )}
      </ThemeContext.Consumer>
    );
  }
}
