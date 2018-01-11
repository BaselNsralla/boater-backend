const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require ('graphql')

const _CHAT = new GraphQLObjectType({
    name: 'chat',
    fields: {
        users: {
            type: new GraphQLList(GraphQLString),
            resolve: context => Object.values(context.users)
        }
    }

})
module.exports = _CHAT