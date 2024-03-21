import { ScrollView, ScrollViewBase, Text, StyleSheet } from "react-native";
import CharacterCard from "./src/components/CharacterCard";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Header from "./src/components/Header";
import Navigation from "./src/components/Navigation";
import EpisodesCard from "./src/components/EpisodesCard";

export default function CharactersScreen() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState();
  const [episodes, setEpisodes] = useState([]);
  const [firstPage, setFirstPage] = useState();
  const [totalEpisodes, setTotalEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const onPressPrev = () => {
    setPage(page - 1);
  };

  const onPressNext = () => {
    setPage(page + 1);
  };

  const getEpisodes = () => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/episode?page=${page} `)
      .then((response) => response.json())
      .then((response) => {
        setEpisodes(response.results);
        setPages(response.info.pages);
        setFirstPage(response.info.prev);
        setTotalEpisodes(response.info.count);
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

  const renderEpisodes = () => {
    return episodes.map((episode) => (
      <EpisodesCard key={episode.id} data={episode} />
    ));
  };

  useEffect(() => {
    getEpisodes();
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
        totalCharacters={totalEpisodes}
        texto={"Episodios"}
      />

      {loading ? loaderIndicator() : renderEpisodes()}
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
