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
const fakeUsers = {
	'a': 'fakefake'
}
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
			   type:  new GraphQLList(GraphQLString),
			   resolve: (context, args) => { return firebase.getData(`/chats/${args.deviceId}`).then(data => Object.keys(data)) },
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