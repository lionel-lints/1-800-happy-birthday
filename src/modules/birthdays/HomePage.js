import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import _ from "underscore";

import Airtable from "airtable";
import tableHasPublishedColumn from "@/utils/tableHasPublishedColumn";

import { PageHeader, Footer, Blurb, Marquee } from "@/modules/_common";
import ActiveNames from "@/modules/birthdays/ActiveNames.js";
import AllNamesList from "@/modules/birthdays/AllNamesList.js";

const StyledHomePage = styled.div`
  color: white;
  position: relative;
`;

const HomePage = () => {
  const [data, setData] = useState(null);

  // useLayoutEffect(() => {
  //   // scroll to top of page on link transition
  //   window.scrollTo(0, 0);
  // });

  useEffect(() => {
    const allRows = [];

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
            });

            // calls page function again while there are still pages left
            fetchNextPage();
          },
          err => {
            if (err) {
              // eslint-disable-next-line no-console
              console.error(err);
            }

            setData(allRows);
          }
        )
    );
  });

  return (
    <StyledHomePage>
      <PageHeader />
      <Blurb />
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
