const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require ('graphql')

const _CHAT = new GraphQLObjectType({
    name: 'chat'


})