const axios = require("axios");

// async function getData() {
//   console.log("GetData");
//   try {
//     const { data } = await axios.post("/graphql", { query: "{hello}" });
//     return data;
//   } catch (error) {
//     return error;
//   }
// }

// -----------------Client for Schema & Root 3
const fetch = require("node-fetch");

var dice = 10;
var sides = 6;
var query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`;

// fetch("http://localhost:4000/graphql", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   body: JSON.stringify({
//     query,
//     variables: { dice, sides },
//   }),
// })
//   .then((r) => r.json())
//   .then((data) => console.log("Data returned with Fetch:", data));

axios
  .post("http://localhost:4000/graphql", {
    query: query,
    variables: { dice, sides },
  })
  .then(({ data }) => {
    console.log("Data returned with Axios: ", data);
  });
