import Head from "next/head";
import React from "react";
import Header from "../components/layout/Header";
// import Row from "../components/home/Row";
import requests from "../utils/requests";
import { Movie } from "../typings";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtoms";
import Modal from "../components/Modal";
import Kids from "../components/home/Kids";
import Watch from "../components/home/Watch";
import { GetStaticProps, NextPage } from "next";
import Footer from "../components/layout/Footer";
import HomeBanner from "../components/HomeBanner";
import Row from "../components/Row";

type Props = {
  netflixOriginals: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  documentaries: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  topRated: Movie[];
  trendingNow: Movie[];
};

const Home: NextPage<Props> = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}) => {
  const showModal = useRecoilValue(modalState);

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Header />
      <main className="relative lg:space-y-24 lg:pt-52 xl:pt-40">
        <HomeBanner netflixOriginals={netflixOriginals} />
        <section className="px-4">
          <div id="Netflix">
            <Row
              type="movie"
              title="Netflix Original"
              movies={netflixOriginals}
            />
          </div>
          <div id="Trending">
            <Row type="movie" title="Trending Now" movies={trendingNow} />
          </div>
          <div id="Top">
            <Row type="movie" title="Top Rated" movies={topRated} />
          </div>
          <div id="Action">
            <Row type="movie" title="Action Thrillers" movies={actionMovies} />
          </div>
          <div id="Comedies">
            <Row type="movie" title="Comedies" movies={comedyMovies} />
          </div>
          <div id="Scary">
            <Row type="movie" title="Scary Movies" movies={horrorMovies} />
          </div>
          <div id="Romance">
            <Row type="movie" title="Romance Movies" movies={romanceMovies} />
          </div>
          <div id="Documentaries">
            <Row type="movie" title="Documentaries" movies={documentaries} />
          </div>
        </section>
        <div id="kids">
          <Kids />
        </div>
        <div id="watch">
          <Watch />
        </div>
        <footer>
          <Footer />
        </footer>
      </main>
      {showModal && <Modal />}
    </div>
  );
};
export default Home;

// with getServerSideProps it passes 5sec(amount vercel wait) & reach to timeout.
export const getStaticProps: GetStaticProps = async () => {
  let [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ]: any = [];
  try {
    [
      netflixOriginals,
      trendingNow,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
    ] = await Promise.all([
      fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
      fetch(requests.fetchTrending).then((res) => res.json()),
      fetch(requests.fetchTopRated).then((res) => res.json()),
      fetch(requests.fetchActionMovies).then((res) => res.json()),
      fetch(requests.fetchComedyMovies).then((res) => res.json()),
      fetch(requests.fetchHorrorMovies).then((res) => res.json()),
      fetch(requests.fetchRomanceMovies).then((res) => res.json()),
      fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ]);
  } catch (err) {
    if (err instanceof Error) console.error("Error! ", err.message);
  }

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
    revalidate: 100,
  };
};
