import React, { createContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "react-native-vector-icons";

import Homescreen from "./screens/Home";
import Aboutscreen from "./screens/About";
import IconWithBadge from "./components/IconWithBadge";
import CharacterScreen from "./screens/Character";

const HomeIconWithBadge = props => {
  return <IconWithBadge {...props} badgeCount={0} />;
};

const ThemeContext = createContext(null);

export default class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={{ fontSize: 25, color: "dimgrey" }}>
        <AppContainer />
      </ThemeContext.Provider>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Homescreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Characters: {
      screen: CharacterScreen
    },
    Comics: {
      screen: Aboutscreen
    },
    About: {
      screen: Aboutscreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge;
        } else if (routeName === "About") {
          iconName = `ios-options`;
        } else if (routeName === "Characters") {
          iconName = `ios-contacts`;
        } else if (routeName === "Comics") {
          iconName = `ios-book`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    })
  }
);

const AppContainer = createAppContainer(TabNavigator);
export { ThemeContext };
