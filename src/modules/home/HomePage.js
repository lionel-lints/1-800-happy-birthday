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
  const [activeVoicemail, setActiveVoicemail] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [voicemailID, setVoicemailID] = useState("");
  const [currentVoicemailIndex, setCurrentVoicemailIndex] = useState(0);
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

  const endPlay = () => {
    const voicemails = data[voicemailID].Voicemails;
    const hasMoreVoicemails = currentVoicemailIndex < voicemails.length - 1;

    if (hasMoreVoicemails) {
      setActiveVoicemail(voicemails[currentVoicemailIndex + 1].url);
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
            activeVoicemail={activeVoicemail}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
          <AllNamesList data={data} />
        </>
      ) : null}

      <Marquee />
      <Footer />
      <VoicemailPlayer
        data={data}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isVisible={!!activeVoicemail}
        setActiveVoicemail={setActiveVoicemail}
        activeVoicemail={activeVoicemail}
        voicemailID={voicemailID}
        setVoicemailID={setVoicemailID}
        setCurrentVoicemailIndex={setCurrentVoicemailIndex}
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
