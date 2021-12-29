import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import BirthdaySection from "@/modules/birthday/BirthdaySection.js";

const StyledBirthday = styled.div`
  color: white;
  z-index: 5;
  top: 1rem;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  overflow-y: auto;
  transition: all 0.5s ease-in-out;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  cursor: auto;
`;

const Birthday = ({ data, activeID, isOpen }) => {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const currentPerson = data[activeID];
    if (currentPerson) {
      setPerson(currentPerson);
    }
  }, [activeID]);

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
        actions={person["Call to Action"]}
        donation={person["Organization for Donation"]}
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
  activeID: PropTypes.string,
  isOpen: PropTypes.bool
};

Birthday.defaultProps = {
  data: {},
  activeID: null,
  isOpen: false
};

export default Birthday;
