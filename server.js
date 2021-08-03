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
// const schema = buildSchema(`
//     type Query {
//         rollDice(numDice: Int!, numSides: Int): [Int]
//     }
// `);

// const root = {
//   rollDice: ({ numDice, numSides }) => {
//     let output = [];
//     for (let i = 0; i < numDice; i++) {
//       output.push(1 + Math.floor(Math.random() * (numSides || 6)));
//     }
//     return output;
//   },
// };

// -----------------------------Schema & Root 4
// var schema = buildSchema(`
//   type RandomDie {
//     numSides: Int!
//     rollOnce: Int!
//     roll(numRolls: Int!): [Int]
//   }

//   type Query {
//     getDie(numSides: Int): RandomDie
//   }
// `);

// // This class implements the RandomDie GraphQL type
// class RandomDie {
//   constructor(numSides) {
//     this.numSides = numSides;
//   }

//   rollOnce() {
//     return 1 + Math.floor(Math.random() * this.numSides);
//   }

//   roll({ numRolls }) {
//     var output = [];
//     for (var i = 0; i < numRolls; i++) {
//       output.push(this.rollOnce());
//     }
//     return output;
//   }
// }

// // The root provides the top-level API endpoints
// var root = {
//   getDie: ({ numSides }) => {
//     return new RandomDie(numSides || 6);
//   },
// };

// -----------------------------Schema & Root 5
var schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

// If Message had any complex fields, we'd put them on this object.
class Message {
  constructor(id, { content, author }) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

// Maps username to content
var fakeDatabase = {};

var root = {
  getMessage: ({ id }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: ({ input }) => {
    // Create a random id for our "database".
    var id = require("crypto").randomBytes(10).toString("hex");

    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: ({ id, input }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
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
