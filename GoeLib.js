import React from "react";
import { Text, View, Alert, StyleSheet, TouchableOpacity } from "react-native";
import * as geolib from "geolib";

export default class App extends React.Component {
  state = {
    locations: [],
    area: null,
    distance: null
  };

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({
          locations: [...this.state.locations, pos]
        });
      },
      error => Alert.alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000
      }
    );
  };

  getDistace = () => {
    if (this.state.locations.length == 2) {
      let cood1 = this.state.locations[0].coords;
      let cood2 = this.state.locations[1].coords;

      let point1 = {
        longitude: cood1.longitude,
        latitude: cood1.latitude
      };
      let point2 = {
        longitude: cood2.longitude,
        latitude: cood2.latitude
      };

      let distance = geolib.getDistance(point1, point2, 0.01);
      let preciseDistance = geolib.getPreciseDistance(point2, point1, 0.001);
      console.table({
        point1,
        point2,
        distance,
        preciseDistance
      });
      this.setState({ distance });
    } else {
      Alert.alert("Two coordinates points required");
    }
  };

  getArea = () => {
    let myArr = [];
    this.state.locations.length > 3 &&
      this.state.locations.map(loc => {
        myArr.push([loc.coords.latitude, loc.coords.longitude]);
      });
    console.log("my aary", myArr);
    if (myArr.length > 3) {
      let data = geolib.getAreaOfPolygon(myArr);
      // console.log("data", data);
      this.setState({ area: data });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Find My Coords?</Text>
        </TouchableOpacity>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {this.state.locations.length > 0 &&
            this.state.locations.map((loc, key) => {
              return (
                <View style={{ padding: 10 }} key={key}>
                  <Text>{loc.coords.latitude}</Text>
                  <Text>{loc.coords.longitude}</Text>
                </View>
              );
            })}
        </View>
        <TouchableOpacity onPress={this.getDistace}>
          <Text style={styles.welcome}>Get Distance</Text>
          {this.state.distance && <Text>{this.state.distance} : meter</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getArea}>
          <Text style={styles.welcome}>Get area</Text>
          {this.state.area && <Text>{this.state.area} meter square</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.setState({ locations: [] });
          }}
        >
          <Text style={styles.welcome}>Clear all</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
