import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";

import ReactHowler from "react-howler";

import { PageHeader, Footer, Marquee } from "@/modules/_common";
import { ActiveNames, AllNamesList, Loader } from "@/modules/home";
import { VoicemailPlayer } from "@/modules/player";

import useSessionStorage from "@/utils/hooks/useSessionStorage";

import AirtableClient from "@/lib/AirtableClient";

const StyledHomePage = styled.div`
  color: white;
  position: relative;
`;

const serializeData = res => {
  const result = {};

  res.forEach(item => {
    result[item.id] = item.fields;
  });

  return result;
};

const HomePage = () => {
  const [data, setData] = useSessionStorage("hbd-data", {});
  const [voicemailID, setVoicemailID] = useState("");

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
    const getData = async () => {
      const response = await AirtableClient.fetchData();
      setData(serializeData(response));
    };

    getData();
  }, []);

  useEffect(() => {
    if (data && data[voicemailID]) {
      setVoicemailSources(
        data[voicemailID].Voicemails.map(voicemail => voicemail.url)
      );
    }
  }, [voicemailID]);

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
          <ActiveNames
            data={data}
            setActiveVoicemail={setActiveVoicemail}
            setVoicemailID={setVoicemailID}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            togglePlay={togglePlay}
            playPrevious={playPrevious}
            playNext={playNext}
          />
          <AllNamesList data={data} />
        </>
      ) : null}

      <Marquee />
      <Footer />
      <VoicemailPlayer
        data={data}
        isPlaying={isPlaying}
        isVisible={!!activeVoicemail}
        voicemailID={voicemailID}
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
