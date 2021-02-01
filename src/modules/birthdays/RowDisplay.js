import React from "react";
import _ from "underscore";
import PropTypes from "prop-types";

import { Header, Hero, LinkOrAnchor } from "@/modules/_common";
import Row from "@/modules/birthday/Row.js";
import getFieldsToDisplay from "@/utils/getFieldsToDisplay";
import { default as customRenderers } from "@/modules/renderers";

const RowDisplay = ({ rows, pagination }) => {
  return (
    <div>
      {rows.map((row, ind) => {
        const slugField = _.find(row.fields, field => field.name === "Slug");
        const slug =
          (typeof window === "undefined" && slugField && slugField.value) ||
          row.id;

        return (
          <LinkOrAnchor key={row.id} to={`/${slug}.html`}>
            <Row
              fieldsToDisplay={getFieldsToDisplay(
                process.env.HOMEPAGE_FIELD_ORDER
              )}
              rowData={row}
              ind={ind}
            />
          </LinkOrAnchor>
        );
      })}
    </div>
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
  ),
  pagination: PropTypes.shape({
    back: PropTypes.string,
    next: PropTypes.string
  })
};

RowDisplay.defaultProps = {
  rows: [],
  pagination: null
};

export default RowDisplay;
