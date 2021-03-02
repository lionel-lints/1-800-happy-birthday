import React, { Component } from "react";
import Airtable from "airtable";
import PropTypes from "prop-types";
import styled from "styled-components";

import Row from "@/modules/birthday/Row.js";
import { NavBar, Hero } from "@/modules/_common";
import formatAirtableRowData from "@/utils/formatAirtableRowData";

const StyledRowPage = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;

class BirthdayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: null
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { slugOrId }
      }
    } = this.props;

    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.BASE_ID);

    const that = this;

    base(process.env.TABLE_ID).find(slugOrId, (err, record) => {
      that.setState({
        fields: record.fields
      });
    });
  }

  render() {
    const { fields } = this.state;
    console.log(fields);
    return (
      <StyledRowPage>
        <NavBar />
        <Hero />
        {!!fields ? (
          <Row
            name={fields.Name}
            DOB={fields.Birthday}
            DOD={fields["Date of passing"]}
            age={fields.Age}
            photoArr={fields.Photo}
          />
        ) : null}
      </StyledRowPage>
    );
  }
}

BirthdayPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slugOrId: PropTypes.string
    })
  }).isRequired
};

export default BirthdayPage;
