import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { LinkOrAnchor } from "@/modules/_common";

const StyledName = styled.span`
  font-family: BradleyMicro;
  color: ${p => (p.isEven ? "gray" : "white")};
  font-size: 2rem;
  line-height: 3rem;
`;

const RowDisplay = ({ rows }) => {
  return (
    <>
      {rows.map((row, index) => {
        const name = row.fields.find(field => field.name === "Name").value;

        return (
          <LinkOrAnchor key={name} to={`/${row.id}`}>
            <StyledName isEven={index % 2 === 0}>{name}</StyledName>
          </LinkOrAnchor>
        );
      })}
    </>
  );
};

RowDisplay.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string
        })
      ),
      name: PropTypes.string
    })
  )
};

RowDisplay.defaultProps = {
  rows: []
};

export default RowDisplay;
