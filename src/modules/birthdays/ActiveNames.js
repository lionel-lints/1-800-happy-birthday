import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Birthday from "@/modules/birthday/Birthday.js";

import breakpoints from "@/utils/breakpoints";

const StyledActiveNames = styled.div`
  position: relative;
  text-align: center;
  margin: 5rem 0 10rem 0;
`;

const StyledWrapper = styled.div`
  position: relative;
  transition: all 0.25s ease-in-out;

  &:hover {
    cursor: pointer;

    @media ${breakpoints.tablet} {
      div.date,
      img {
        opacity: 1;
      }
    }
  }
`;

const StyledName = styled.div`
  position: relative;
  font-family: BradleyMicro;
  color: red;
  transition: all 0.25s ease-in-out;
  padding-top: 3rem;
  padding-bottom: 2rem;
  font-size: 4rem;
  line-height: 4rem;
  letter-spacing: -0.2rem;

  @media ${breakpoints.tablet} {
    font-size: 8rem;
    line-height: 8rem;
    letter-spacing: -0.5rem;

    &:hover {
      color: white;
      opacity: 1;
    }
  }

  @media ${breakpoints.laptop} {
    font-size: 15rem;
    letter-spacing: -1rem;
    line-height: 14rem;
  }
`;

const StyledDate = styled.div`
  z-index: 1;
  color: red;
  opacity: 0;
  font-family: PinyonScript;
  font-size: 6rem;
  transition: opacity 0.25s ease-in-out;
  width: 100%;
  height: 60px;
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
  const [navName, setNavName] = useState("");

  const showBirthday = id => {
    setActiveID(id);
    setIsOpen(true);
  };

  useEffect(() => {
    if (activeID) {
      setNavName(data[activeID].Name);
    }
  }, [activeID]);

  return (
    <StyledActiveNamesWrapper>
      <StyledActiveNames>
        {Object.keys(data).map((id, index) => {
          const isLive = !!data[id]["Live Voicemail Number"];
          const name = data[id].Name;
          const dobField = data[id].dob;

          // TODO: image rotate + left/right: random number between range

          let dob;
          if (dobField) {
            dob = new Date(Date.parse(dobField));
            dob = dob.toDateString().split(" ");
            dob.shift();
            dob.pop();
          }

          let photoUrl;
          if (data[id]["Hero Photo"]) {
            photoUrl = data[id]["Hero Photo"][0].url;
          }

          return (
            <StyledWrapper onClick={() => showBirthday(id)} key={name}>
              {isLive ? (
                <>
                  {!!navName && id === activeID && (
                    <StyledNameNavigation>{navName}</StyledNameNavigation>
                  )}
                  <StyledDate className="date">{dob.join(" ")}</StyledDate>
                  <StyledName isActive={id === activeID}>{name}</StyledName>
                  {photoUrl && (
                    <StyledImg src={photoUrl} isEven={index % 2 === 0} />
                  )}
                  <StyledBirthdayWrapper isOpen={isOpen}>
                    {id === activeID ? (
                      <Birthday
                        data={data}
                        activeID={activeID}
                        isOpen={isOpen}
                      />
                    ) : null}
                  </StyledBirthdayWrapper>
                </>
              ) : null}
            </StyledWrapper>
          );
        })}
      </StyledActiveNames>
    </StyledActiveNamesWrapper>
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
