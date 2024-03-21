import { ScrollView, ScrollViewBase, Text, StyleSheet } from "react-native";
import CharacterCard from "./src/components/CharacterCard";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Header from "./src/components/Header";
import Navigation from "./src/components/Navigation";

export default function CharactersScreen() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState();
  const [characters, setCharacters] = useState([]);
  const [firstPage, setFirstPage] = useState();
  const [totalCharacters, setTotalCharacters] = useState();
  const [loading, setLoading] = useState(true);

  const onPressPrev = () => {
    setPage(page - 1);
  };

  const onPressNext = () => {
    setPage(page + 1);
  };

  const getCharacters = () => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character?page=${page} `)
      .then((response) => response.json())
      .then((response) => {
        setCharacters(response.results);
        setPages(response.info.pages);
        setFirstPage(response.info.prev);
        setTotalCharacters(response.info.count);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const loaderIndicator = () => {
    <View style={styles.loader}>
      <ActivityIndicator size="large" />
    </View>;
  };

  const renderCharacters = () => {
    return characters.map((character) => (
      <CharacterCard key={character.id} data={character} />
    ));
  };

  useEffect(() => {
    getCharacters();
  }, [page]);

  return (
    <ScrollView>
      <Header />
      <Navigation
        next={onPressNext}
        prev={onPressPrev}
        page={page}
        pages={pages}
        firstPage={firstPage}
        totalCharacters={totalCharacters}
        texto={"Personajes"}
      />

      {loading ? loaderIndicator() : renderCharacters()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    minHeight: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
