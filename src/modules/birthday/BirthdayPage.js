import React from "react";
import Airtable from "airtable";
import PropTypes from "prop-types";
import styled from "styled-components";

import Row from "@/components/RowPage";
import { NavBar } from "@/modules/_common";
import formatAirtableRowData from "@/utils/formatAirtableRowData";

const StyledRowPage = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;

export default class BirthdayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { row: null };
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
        row: formatAirtableRowData(record)
      });
    });
  }

  render() {
    const { row } = this.state;
    return (
      <StyledRowPage>
        <NavBar />
        {row ? <Row rowData={row} /> : null}
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
