import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { BirthdaySection } from "@/modules/birthday";

const StyledBirthday = styled.div`
  color: white;
  z-index: 5;
  top: 1rem;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  transition: all 0.5s ease-in-out;
  opacity: ${p => (p.isOpen ? 1 : 0)};
  cursor: auto;
`;

const Birthday = ({ data, id, isOpen, animatedHeight }) => {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const currentPerson = data[id];
    if (currentPerson) {
      setPerson(currentPerson);
    }
  }, [id]);

  if (!person) return null;

  return (
    <StyledBirthday isOpen={isOpen}>
      <BirthdaySection
        name={person.Name}
        DOB={person.dob}
        DOD={person.dod}
        photo={person["Hero Photo"]}
        voicemails={person.Voicemails}
        voicemailNumber={person["Voicemail Number"]}
        quote={person.Quote}
        quoteAttribution={person["Quote Attribution"]}
        animatedHeight={animatedHeight}
        callToActionText1={person["Call to Action 1 Text"]}
        callToActionText2={person["Call to Action 2 Text"]}
        callToActionText3={person["Call to Action 3 Text"]}
        callToActionLink1={person["Call to Action 1 Link"]}
        callToActionLink2={person["Call to Action 2 Link"]}
        callToActionLink3={person["Call to Action 3 Link"]}
      />
    </StyledBirthday>
  );
};

Birthday.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.shape({
      dob: PropTypes.string,
      "Voicemail Number": PropTypes.string,
      Name: PropTypes.string
    }),
    id: PropTypes.string
  }),
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  animatedHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Birthday.defaultProps = {
  data: {},
  id: null,
  isOpen: false,
  animatedHeight: 0
};

export default Birthday;
