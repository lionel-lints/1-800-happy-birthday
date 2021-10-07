import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { LinkOrAnchor } from "@/modules/_common";

const StyledActiveNames = styled.div`
  position: relative;
  text-align: center;
  margin: 5rem 0 10rem 0;

  div {
    display: inline-block;
  }
`;

const StyledWrapper = styled.div`
  position: relative;

  a:hover {
    > div:first-child {
      opacity: 0.3;
      color: white;
    }
  }
`;

const StyledName = styled.div`
  font-family: BradleyMicro;
  font-size: 15rem;
  letter-spacing: -1rem;
  line-height: 14rem;
  color: red;
  transition: all 0.25s ease-out;

  &:hover {
    color: white;
  }
`;

const StyledDate = styled.div`
  color: white;
  opacity: 0;
  position: absolute;
  transform: rotate(270deg);
  left: -8rem;
  bottom: 46%;
  font-family: BradleyMicro;
  font-size: 2.5rem;
  transition: opacity 0.25s ease-out;
`;

const ActiveNames = ({ data }) => {
  return (
    <StyledActiveNames>
      {data.map(row => {
        const isLive = row.fields.find(
          field => field.name === "Voicemail Number"
        );

        const name = row.fields.find(field => field.name === "Name").value;
        const dobField = row.fields.find(field => field.name === "dob");

        let dob;
        if (dobField) {
          dob = new Date(Date.parse(dobField.value));
          dob = dob.toDateString().split(" ");
          dob.shift();
        }

        return (
          <StyledWrapper key={name}>
            {isLive ? (
              <LinkOrAnchor to={`/${row.id}.html`}>
                <StyledDate>{dob.join(" ")}</StyledDate>
                <StyledName>{name}</StyledName>
              </LinkOrAnchor>
            ) : null}
          </StyledWrapper>
        );
      })}
    </StyledActiveNames>
  );
};

ActiveNames.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string
        })
      ),
      name: PropTypes.string
    })
  )
};

ActiveNames.defaultProps = {
  data: []
};

export default ActiveNames;
