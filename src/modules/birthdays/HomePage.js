import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";

import { PageHeader, Footer, Blurb, Marquee } from "@/modules/_common";
import ActiveNames from "@/modules/birthdays/ActiveNames.js";
import AllNamesList from "@/modules/birthdays/AllNamesList.js";
import AllNamesLoader from "@/modules/birthdays/AllNamesLoader.js";

import useLocalStorage from "@/utils/hooks/useLocalStorage";

import AirtableClient from "@/lib/AirtableClient";

const StyledHomePage = styled.div`
  color: white;
  position: relative;
`;

const HomePage = () => {
  const [data, setData] = useLocalStorage("hbd-data", "");

  useLayoutEffect(() => {
    // scroll to top of page on link transition
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    localStorage.clear();

    const getData = async () => {
      const response = await AirtableClient.fetchData();
      setData(response); // store as serialized data {id: Person} to access on Birthday Page
    };

    getData();
  }, []);

  return (
    <StyledHomePage>
      <PageHeader />
      <Blurb />
      {data ? (
        <>
          <AllNamesLoader data={data} />
          <ActiveNames data={data} />
          <AllNamesList data={data} />
        </>
      ) : null}
      <Marquee />
      <Footer />
    </StyledHomePage>
  );
};

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
