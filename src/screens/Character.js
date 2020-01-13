import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Card from "../components/Card";
import md5 from "md5";
const privateKey = "70947e901e1ad3661d19832777a47ca45fb4e1e0";
const publicKey = "992df3cdcf631b99e6e085119f441d0e";

const CharacterScreen = () => {
  let [characters, setChars] = useState({ results: [] });
  let getCharacters = async () => {
    let timeStamp = new Date().getTime();
    let hash = md5(timeStamp + privateKey + publicKey);
    let api =
      "http://gateway.marvel.com/v1/public/characters?ts=" +
      timeStamp +
      "&apikey=" +
      publicKey +
      "&hash=" +
      hash +
      "&orderBy=-modified&limit=100";

    let data = await fetch(api)
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log("error", err);
        return err;
      });

    console.log("data", data);
    setChars(data.data);
  };

  useEffect(() => {
    getCharacters();
  }, []);
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <ScrollView horizontal style={{ maxHeight: 310 }}>
        {characters.results.length > 0 &&
          characters.results.map((char, key) => {
            return <Card key={key} charData={char} />;
          })}
      </ScrollView>
    </View>
  );
};

export default CharacterScreen;
