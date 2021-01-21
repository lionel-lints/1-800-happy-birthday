import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Row from "./Row";
import LinkOrAnchor from "./LinkOrAnchor";
import Header from "./Header.js";
import NavBar from "./NavBar.js";
import getFieldsToDisplay from "../utils/getFieldsToDisplay";

const StyledRowPage = styled.div`
  background-color: black;
  color: white;
`;
const RowPage = ({ rowData }) => (
  <>
    <NavBar />
    <StyledRowPage className="row-page">
      {process.env.HEADER_TITLE && process.env.HEADER_TITLE && (
        <Header title={process.env.HEADER_TITLE} />
      )}
      <Row
        fieldsToDisplay={getFieldsToDisplay(process.env.FIELD_ORDER)}
        rowData={rowData}
      />
      <LinkOrAnchor className="nav-button" to="/">
        Back
      </LinkOrAnchor>
    </StyledRowPage>
  </>
);

RowPage.propTypes = {
  rowData: PropTypes.shape({
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

export default RowPage;
