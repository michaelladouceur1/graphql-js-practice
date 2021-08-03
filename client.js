const axios = require("axios");

async function getData() {
  console.log("GetData");
  try {
    const { data } = await axios.post("/graphql", { query: "{hello}" });
    return data;
  } catch (error) {
    return error;
  }
}
