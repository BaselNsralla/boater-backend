const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean
} = require ('graphql');
const _PROFILE = require('./query-entities/profile.js')
const _CHAT = require('./query-entities/chat.js')
const { _INPUT_STORE_ITEM, _STORE_ITEM } = require('./query-entities/store.js')
const { promisify } = require('util');
const firebase = require('../db/api')
const storeCtrl = require('../controllers/storeCtrl.js')

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'root',
		args: {
          id: { type: GraphQLString }
        },
		fields: {
		   profile: {
				type: _PROFILE,
				resolve: (context, args) => {
					return firebase.getData(`/users/${args.deviceId}`)
				},
				args: {
					deviceId: { type: GraphQLString }
				}
		   },
		   chats: {
			   type:  _CHAT,
			   resolve: (context, args) => firebase.getData(`/chats/${args.chatId}`),
			   args: { chatId: { type: GraphQLString } }
		   },
		   store: {
			   type: new GraphQLList(_STORE_ITEM),
			   resolve: (context, args) => firebase.getData(`/stores/${args.deviceId}`)
			   							   .then(data => Object.values(data)),
			   args: {
				   deviceId: { type: GraphQLString }
			   } 
		   }
		}
	}),
	mutation: new GraphQLObjectType ({
		name: 'mutationRoot',
		description: 'The root of all mutation functions',
		fields: {
			buyItem: {
				type: GraphQLBoolean,
				args: {
					item_id:   { type: new GraphQLNonNull(GraphQLString) },
					store_id:  { type: new GraphQLNonNull(GraphQLString) },
					buyer_id:  { type: new GraphQLNonNull(GraphQLString) },
					seller_id: { type: new GraphQLNonNull(GraphQLString) }
				},
				resolve: (ctx, {store_id, item_id, buyer_id, seller_id}) => {
					return storeCtrl.buyItem(store_id, item_id, buyer_id, seller_id)
				}
			},
			addItemToStore: {
				type : GraphQLBoolean,
				resolve : (ctx, { user_id, store_item }) => {
					return storeCtrl.addItem()
				},
				args: {
					user_id:    { type: new GraphQLNonNull(GraphQLString) },
					store_item: { type: _INPUT_STORE_ITEM }
				}
			},
			addUser: {
				type: GraphQLBoolean,
				resolve: () => {
					return false
				}
			}
		}
	})
})

module.exports = schema