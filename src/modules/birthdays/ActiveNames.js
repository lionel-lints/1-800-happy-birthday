import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Birthday from "@/modules/birthday/Birthday.js";

const StyledActiveNames = styled.div`
  position: relative;
  text-align: center;
  margin: 5rem 0 10rem 0;
`;

const StyledWrapper = styled.div`
  position: relative;
  transition: all 0.25s ease-in-out;
  border-bottom: 5px solid white;

  &:first-child {
    border-top: 5px solid white;
  }

  &:hover {
    cursor: pointer;

    div:first-child {
      opacity: 1;
    }
  }
`;

const StyledName = styled.div`
  position: relative;
  font-family: BradleyMicro;
  font-size: 15rem;
  letter-spacing: -1rem;
  line-height: 14rem;
  color: red;
  transition: all 0.25s ease-in-out;
  padding-top: 3rem;
  padding-bottom: 2rem;
  background: black;

  &:hover {
    color: white;
  }
`;

const StyledDate = styled.div`
  z-index: 1;
  color: red;
  opacity: 0;
  font-family: PinyonScript;
  font-size: 4rem;
  transition: opacity 0.25s ease-in-out;
  width: 100%;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const StyledBirthdayWrapper = styled.div`
  position: relative;
  z-index: 5;
  transition: all 0.5s ease-in-out;
  opacity: ${props => (props.isOpen ? 1 : 0)};
`;

const ActiveNames = ({ data }) => {
  const [activeID, setActiveID] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const showBirthday = id => {
    setActiveID(id);
    setIsOpen(true);
  };

  // const isLive = !!data[id][""];

  return (
    <StyledActiveNames>
      {Object.keys(data).map(id => {
        const isLive = !!data[id].dob;
        const name = data[id].Name;
        const dobField = data[id].dob;

        let dob;
        if (dobField) {
          dob = new Date(Date.parse(dobField));
          dob = dob.toDateString().split(" ");
          dob.shift();
        }

        return (
          <StyledWrapper onClick={() => showBirthday(id)} key={name}>
            {isLive ? (
              <>
                <StyledDate>{dob.join(" ")}</StyledDate>
                <StyledName isActive={id === activeID}>{name}</StyledName>
                <StyledBirthdayWrapper isOpen={isOpen}>
                  {id === activeID ? (
                    <Birthday data={data} activeID={activeID} isOpen={isOpen} />
                  ) : null}
                </StyledBirthdayWrapper>
              </>
            ) : null}
          </StyledWrapper>
        );
      })}
    </StyledActiveNames>
  );
};

ActiveNames.propTypes = {
  data: PropTypes.shape({
    fields: PropTypes.shape({
      dob: PropTypes.string,
      "Voicemail Number": PropTypes.string,
      Name: PropTypes.string
    }),
    id: PropTypes.string
  })
};

ActiveNames.defaultProps = {
  data: {}
};

export default ActiveNames;
