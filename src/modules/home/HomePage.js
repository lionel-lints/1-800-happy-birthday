import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";

import ReactHowler from "react-howler";

import { PageHeader, Footer, Marquee } from "@/modules/_common";
import { FeaturedNames, AllNamesBackground, Loader } from "@/modules/home";
import { VoicemailPlayer } from "@/modules/player";

import useSessionStorage from "@/utils/hooks/useSessionStorage";

import AirtableClient from "@/lib/AirtableClient";

let data = require("@/data.json");

const StyledHomePage = styled.div`
  color: white;
  position: relative;
`;

const serializeData = res => {
  let result = {};

  // if (res && res.length) {
  //   res.forEach(item => {
  //     if (item && item.id && item.fields) {
  //       result[item.id] = item.fields;
  //     }
  //   });
  // } else {
  result = data;
  // }

  return result;
};

const HomePage = () => {
  const [data, setData] = useSessionStorage("hbd-data", {});
  const [activeID, setActiveID] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);

  const [activeVoicemail, setActiveVoicemail] = useState("");
  const [activeVoicemailIndex, setActiveVoicemailIndex] = useState(0);
  const [voicemailSources, setVoicemailSources] = useState([]);

  const player = useRef(null);

  useLayoutEffect(() => {
    // scroll to top of page on link transition
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // airtable keeps changing their API, so we are just hardcoding
    // the data into the site until the rebuild is handled.
    // const getData = async () => {
    //   const response = await AirtableClient.fetchData();
    //   setData(serializeData(response));
    // };

    // getData();
    serializeData();
  }, []);

  useEffect(() => {
    if (data && data[activeID] && data[activeID].Voicemails.length) {
      setVoicemailSources(
        data[activeID].Voicemails.map(voicemail => voicemail.url)
      );
    }
  }, [activeID]);

  const playNext = () => {
    const next =
      activeVoicemailIndex >= voicemailSources.length - 1
        ? 0
        : activeVoicemailIndex + 1;

    setActiveVoicemailIndex(next);
    setActiveVoicemail(voicemailSources[next]);
  };

  const playPrevious = () => {
    const previous =
      activeVoicemailIndex > 0
        ? activeVoicemailIndex - 1
        : voicemailSources.length - 1;

    setActiveVoicemailIndex(previous);
    setActiveVoicemail(voicemailSources[previous]);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setActiveVoicemail(voicemailSources[activeVoicemailIndex]);
  };

  const endPlay = () => {
    const hasMoreVoicemails =
      activeVoicemailIndex < voicemailSources.length - 1;

    if (hasMoreVoicemails) {
      playNext();
    } else {
      setIsPlaying(false);
      setActiveVoicemail("");
    }
  };

  return (
    <StyledHomePage>
      <PageHeader />
      <Loader data={data} />

      {data ? (
        <>
          <FeaturedNames
            data={data}
            setActiveVoicemail={setActiveVoicemail}
            activeID={activeID}
            setActiveID={setActiveID}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            togglePlay={togglePlay}
            playPrevious={playPrevious}
            playNext={playNext}
          />
          <AllNamesBackground data={data} />
        </>
      ) : null}

      <Marquee />
      <Footer />
      <VoicemailPlayer
        data={data}
        isPlaying={isPlaying}
        isVisible={!!activeVoicemail}
        activeID={activeID}
        togglePlay={togglePlay}
        playPrevious={playPrevious}
        playNext={playNext}
      />
      {activeVoicemail ? (
        <ReactHowler
          playing={isPlaying}
          // When the sources are swapped we'll pass a new
          // src prop into ReactHowler which will destroy our
          // currently playing Howler.js and initialize
          // a new Howler.js instance
          src={activeVoicemail}
          ref={player}
          onEnd={endPlay}
        />
      ) : null}
    </StyledHomePage>
  );
};

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
