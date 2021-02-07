import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Row from "@/modules/birthday/Row.js";
import { NavBar, Header, LinkOrAnchor } from "@/modules/_common";
import getFieldsToDisplay from "@/utils/getFieldsToDisplay";

const StyledRowPage = styled.div`
  background-color: black;
  color: white;
`;
const RowPage = ({ rowData }) => {
  console.log("rowData", rowData);
  return (
    <StyledRowPage>
      <Row
        fieldsToDisplay={getFieldsToDisplay(process.env.FIELD_ORDER)}
        rowData={rowData}
      />
      <LinkOrAnchor to="/">Back</LinkOrAnchor>
    </StyledRowPage>
  );
};

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
