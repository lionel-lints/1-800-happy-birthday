import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";

import { PageHeader, Footer, Marquee } from "@/modules/_common";
import {
  ActiveNames,
  AllNamesList,
  AllNamesLoader,
  VoicemailFooter
} from "@/modules/home";

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
  const [showVoicemailPlayer, setShowVoicemailPlayer] = useState(false);
  const [activeVoicemail, setActiveVoicemail] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <StyledHomePage>
      <PageHeader />
      <AllNamesLoader data={data} />

      {data ? (
        <>
          <ActiveNames
            data={data}
            setActiveVoicemail={setActiveVoicemail}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
          <AllNamesList data={data} />
        </>
      ) : null}

      <Marquee />
      <Footer />
      <VoicemailFooter
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isVisible={true}
      />
    </StyledHomePage>
  );
};

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
