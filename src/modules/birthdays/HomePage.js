import React, { useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";

import { PageHeader, Footer, Blurb, Marquee } from "@/modules/_common";
import ActiveNames from "@/modules/birthdays/ActiveNames.js";
import AllNamesList from "@/modules/birthdays/AllNamesList.js";
import AllNamesLoader from "@/modules/birthdays/AllNamesLoader.js";

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

  useLayoutEffect(() => {
    // scroll to top of page on link transition
    window.scrollTo(0, 0);
  });

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
