import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import BirthdaySection from "@/modules/birthday/BirthdaySection.js";
import AllNamesList from "@/modules/birthdays/AllNamesList.js";
import { PageHeader, Marquee, Blurb, Footer } from "@/modules/_common";

import AirtableClient from "@/lib/AirtableClient";
import useLocalStorage from "@/utils/hooks/useLocalStorage";

const StyledBirthdayPage = styled.div`
  color: white;
  position: relative;
`;

const BirthdayPage = props => {
  const [fields, setFields] = useState(null);
  const [data, setData] = useLocalStorage("hbd-data", "");

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
      setData(response);

      const currentPerson = response.find(person => person.id === slugOrId);
      if (currentPerson) {
        setFields(currentPerson.fields);
      }
    };

    getData();
  }, []);

  return (
    <StyledBirthdayPage>
      <PageHeader />
      {data ? (
        <>
          <AllNamesList data={data} />
        </>
      ) : null}
      {fields ? (
        <BirthdaySection
          name={fields.Name}
          DOB={fields.dob}
          DOD={fields.dod}
          photo={fields.Photo}
          voicemails={fields.Voicemails}
          voicemailNumber={fields["Voicemail Number"]}
          quote={fields.Quote}
        />
      ) : null}
      <Marquee />
      <Blurb />
      <Footer />
    </StyledBirthdayPage>
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
