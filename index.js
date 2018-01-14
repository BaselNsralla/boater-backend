var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const schema = require('./graph/schema')
// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
/*profile(deviceId: "thisisahash") {
  user {
   name,
 }   
 resources {
     water
 },
 chats
},
store(deviceId: "thisisahash") {
 item,
 costItem,
 costAmount,
 amount
},
chats(chatId: "chatIdX"){
 users,
 messages {
   author,
   message
 }
}
*/