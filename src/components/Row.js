import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import styled from "styled-components";

import TextField from "./TextField";
import Attachments from "./Attachments";
import { default as customRenderers } from "../../custom/renderers";

const getRenderer = (field, ind = 0) => {
  const { value, name } = field;
  const customRendererName = name.replace(/\s/g, "");
  if (customRenderers[customRendererName]) {
    const Component = customRenderers[customRendererName];
    return <Component key={name} name={name} value={value} />;
  }

  if (typeof value === "string" || typeof value === "number") {
    return <TextField ind={ind} key={name} fieldName={name} data={value} />;
  }

  if (Array.isArray(value)) {
    // is attachment
    if (value.length && value[0].size) {
      return <Attachments key={name} fieldName={name} attachments={value} />;
    }

    return (
      <div key={name}>
        {value.map((string, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <TextField key={idx} ind={ind} fieldName={name} data={string} />
        ))}
      </div>
    );
  }

  return <div />;
};

const StyledRow = styled.span`
  font-family: MontserratExtraBold, sans-serif;
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;
const Row = ({ rowData, fieldsToDisplay, ind }) => {
  const mapFields = name => {
    const field = rowData.fields.find(field => field.name === name);
    if (field) return getRenderer(field, ind);

    return field;
  };
  return (
    <StyledRow isEven={ind % 2 === 0}>
      {_.chain(fieldsToDisplay)
        .map(mapFields)
        .filter(renderer => !!renderer)
        .value()}
    </StyledRow>
  );
};

Row.defaultProps = {
  rowData: {},
  fieldsToDisplay: []
};

Row.propTypes = {
  rowData: PropTypes.shape({
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    )
  }),
  fieldsToDisplay: PropTypes.arrayOf(PropTypes.string)
};

export default Row;
