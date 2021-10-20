import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Layout from "@/modules/birthday/Layout.js";
import { PageHeader } from "@/modules/_common";

import AirtableClient from "@/lib/AirtableClient";

const StyledRowPage = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;

const BirthdayPage = props => {
  const [fields, setFields] = useState(null);

  useLayoutEffect(() => {
    // scroll to top of page on link transition
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const {
      match: {
        params: { slugOrId }
      }
    } = props;

    const getData = async () => {
      const response = await AirtableClient.fetchData();
      const currentPerson = response.find(person => person.id === slugOrId);

      if (currentPerson) {
        setFields(currentPerson.fields);
      }
    };

    getData();
  }, []);

  return (
    <StyledRowPage>
      <PageHeader />
      {!!fields && (
        <Layout
          name={fields.Name}
          DOB={fields.dob}
          DOD={fields.dod}
          photoArr={fields.Photo}
          voicemails={fields.Voicemails}
          voicemailNumber={fields["Voicemail Number"]}
          quote={fields.Quote}
        />
      )}
    </StyledRowPage>
  );
};

BirthdayPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slugOrId: PropTypes.string
    })
  }).isRequired
};

export default BirthdayPage;
