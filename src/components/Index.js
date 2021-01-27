import React from "react";
import _ from "underscore";
import PropTypes from "prop-types";

import LinkOrAnchor from "./LinkOrAnchor.js";
import { Header } from "@/modules/_common";
import Row from "./Row";
import getFieldsToDisplay from "../utils/getFieldsToDisplay";
import CustomRenderers from "../../custom/renderers";
import Hero from "./Hero";

const Index = ({ rows, pagination }) => {
  return (
    <>
      <div className="index-page">
        {rows.map(row => {
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
              />
            </LinkOrAnchor>
          );
        })}
        {pagination && (
          <div>
            {pagination.back ? (
              <LinkOrAnchor className="nav-button" to={pagination.back}>
                <span>← Previous</span>
              </LinkOrAnchor>
            ) : (
              <div />
            )}
            {pagination.next ? (
              <LinkOrAnchor className="nav-button" to={pagination.next}>
                <span>Next →</span>
              </LinkOrAnchor>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </>
  );
};

Index.propTypes = {
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

Index.defaultProps = {
  rows: [],
  pagination: null
};

export default Index;
