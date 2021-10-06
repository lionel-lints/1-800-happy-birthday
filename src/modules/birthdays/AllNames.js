import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import _ from "underscore";
import styled from "styled-components";

import RowDisplay from "@/modules/birthdays/RowDisplay.js";
import tableHasPublishedColumn from "@/utils/tableHasPublishedColumn";

const StyledAllNames = styled.div`
  color: white;
`;

const AllNames = () => {
  const [rows, setRows] = useState(null);

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

            setRows(allRows);
          }
        )
    );
  });

  return (
    <StyledAllNames>{rows ? <RowDisplay rows={rows} /> : null}</StyledAllNames>
  );
};

AllNames.propTypes = {};

AllNames.defaultProps = {};

export default AllNames;
