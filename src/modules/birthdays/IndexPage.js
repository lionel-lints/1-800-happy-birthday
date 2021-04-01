import React from "react";
import Airtable from "airtable";
import PropTypes from "prop-types";
import _ from "underscore";
import styled from "styled-components";

import { NavBar, Hero, Footer } from "@/modules/_common";
import RowDisplay from "@/modules/birthdays/RowDisplay.js";
import tableHasPublishedColumn from "@/utils/tableHasPublishedColumn";

const StyledIndexPage = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: null };
  }

  componentDidMount() {
    // scroll to top of page on link transistion
    window.scrollTo(0, 0);

    const that = this;
    const allRows = [];
    let currentRow = 1;

    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.BASE_ID);

    tableHasPublishedColumn(base, includePublished =>
      base(process.env.TABLE_ID)
        .select({
          view: process.env.VIEW,
          ...(includePublished ? { filterByFormula: "{Published}" } : {})
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach(row => {
              const fieldsArray = _.map(row.fields, (value, name) => ({
                name,
                value
              }));

              const fieldOrderMapped = process.env.FIELD_ORDER
                ? _.object(
                    process.env.FIELD_ORDER.split(",").map((field, idx) => [
                      field,
                      idx
                    ])
                  )
                : null;
              const fields = fieldOrderMapped
                ? _.sortBy(fieldsArray, field => fieldOrderMapped[field.name])
                : fieldsArray;

              allRows.push({
                ...row,
                fields
              });
              currentRow += 1;
            });

            // calls page function again while there are still pages left
            fetchNextPage();
          },
          err => {
            if (err) {
              // eslint-disable-next-line no-console
              console.error(err);
            }

            that.setState({
              rows: allRows
            });
          }
        )
    );
  }

  render() {
    const { rows } = this.state;

    return (
      <StyledIndexPage>
        <NavBar />
        <Hero />
        {rows ? <RowDisplay rows={rows} /> : null}
        <Footer />
      </StyledIndexPage>
    );
  }
}

IndexPage.propTypes = {
  currentPage: PropTypes.number
};

IndexPage.defaultProps = {
  currentPage: 1
};
