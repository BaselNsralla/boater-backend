const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require ('graphql');
const _PROFILE = require('./query-entities/profile.js')
const _CHAT = require('./query-entities/chat.js')
const _STORE_ITEM = require('./query-entities/store.js')
const { promisify } = require('util');
const firebase = require('../db/api')

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
			   resolve: (context, args) => { return firebase.getData(`/chats/${args.chatId}`) },
			   args: {
				   chatId: { type: GraphQLString }
			   }
		   },
		   store: {
			   type: new GraphQLList(_STORE_ITEM),
			   resolve: (context, args) => { return firebase.getData(`/stores/${args.deviceId}`).then(data => Object.values(data)) },
			   args: {
				   deviceId: { type: GraphQLString }
			   } 
		   }
		}
	})
})

module.exports = schema