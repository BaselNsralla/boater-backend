const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
  } = require ('graphql')


const _STORE_ITEM = new GraphQLObjectType({
    name: 'store_item',
    fields: {
        item: {
            type: GraphQLString,
            resolve: (context) => context.item
        },
        amount: {
            type: GraphQLString,
            resolve: (context) => context.amount
        },
        costItem: {
            type: GraphQLString,
            resolve: (context) => context.costItem
        },
        costAmount: {
            type: GraphQLString,
            resolve: (context) => context.costAmount
        },

    }

})

module.exports = _STORE_ITEM