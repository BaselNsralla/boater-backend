const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} = require ('graphql')

const _MESSAGE = new GraphQLObjectType({
    name: 'message',
    fields: {
        author: {
            type: GraphQLString,
            resolve: context => context.author
        },
        contentType: {
            type: GraphQLString,
            resolve: context => context.contentType
        },
        message: {
            type: GraphQLString,
            resolve: context => context.message
        },
        time_stamp: {
            type: GraphQLInt,
            resolve: context => context.time_stamp
        }
    }
})

const _CHAT = new GraphQLObjectType({
    name: 'chat',
    fields: {
        users: {
            type: new GraphQLList(GraphQLString),
            resolve: context => Object.values(context.users)
        },
        messages: {
            type: new GraphQLList(_MESSAGE),
            resolve: context => Object.values(context.messages)
        }
    }
})



module.exports = _CHAT