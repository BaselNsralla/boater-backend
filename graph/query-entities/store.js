const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLInputObjectType
  } = require ('graphql')
const uuid = require('uuid/v1')

const _STORE_ITEM = new GraphQLObjectType({
    name: 'store_item',
    fields: {
        id: {
            type: GraphQLString,
            resolve: (context) => context.id   
        },
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

const _INPUT_STORE_ITEM = new GraphQLInputObjectType({
    name: 'StoreItem',
    fields: {
      item:       { type: new GraphQLNonNull(GraphQLString) },
      amount:     { type: new GraphQLNonNull(GraphQLInt) },
      costItem:   { type: new GraphQLNonNull(GraphQLString) },
      costAmount: { type: new GraphQLNonNull(GraphQLInt) }
    }
  });
module.exports = { _STORE_ITEM, _INPUT_STORE_ITEM}