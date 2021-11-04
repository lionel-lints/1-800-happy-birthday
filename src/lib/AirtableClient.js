import "regenerator-runtime/runtime";
import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.BASE_ID);

const AirtableClient = {
  base,
  fetchData: async () => {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.BASE_ID}/${process.env.TABLE_ID}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
        }
      }
    )
      .then(res => res.json())
      .then(res => {
        return res.records;
      })
      .catch(error => console.error(error));

    return response;
  }
};

export default AirtableClient;
