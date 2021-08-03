const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// ------------------------------Schema & Root 1
// const schema = buildSchema(`
//     type Query {
//         hello: String
//     }
// `);

// const root = {
//   hello: () => {
//     return "Hello world";
//   },
// };

// -----------------------------Schema & Root 2
// const schema = buildSchema(`
//     type Query {
//         quoteOfTheDay: String
//         random: Float!
//         rollThreeDice: [Int]
//     }
// `);

// const root = {
//   quoteOfTheDay: () => {
//     return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
//   },
//   random: () => {
//     return Math.random();
//   },
//   rollThreeDice: () => {
//     return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
//   },
// };

// -----------------------------Schema & Root 3
const schema = buildSchema(`
    type Query {
        rollDice(numDice: Int!, numSides: Int): [Int]
    }
`);

const root = {
  rollDice: ({ numDice, numSides }) => {
    let output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);
console.log("GraphQL server running on 4000");
