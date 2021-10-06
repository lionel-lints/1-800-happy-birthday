import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { NavBar, Footer } from "@/modules/_common";
import AllNames from "@/modules/birthdays/AllNames.js";

const StyledHomePage = styled.div``;

const HomePage = () => {
  useLayoutEffect(() => {
    // scroll to top of page on link transition
    window.scrollTo(0, 0);
  });

  return (
    <StyledHomePage>
      <NavBar />
      <AllNames />
      <Footer />
    </StyledHomePage>
  );
};

HomePage.propTypes = {
  currentPage: PropTypes.number
};

HomePage.defaultProps = {
  currentPage: 1
};

export default HomePage;
