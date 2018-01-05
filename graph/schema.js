const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require ('graphql');
const _PROFILE = require('./query-entities/profile.js')
const fakeUsers = {
	'a': 'fakefake'
}
const {promisify} = require('util');
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
					//console.log(firebase.getData(`users/${args.deviceId}`))
					return firebase.getData(`/users/${args.deviceId}`)
				},
				args: {
					deviceId: { type: GraphQLString }
				}
		   }
		}
	})
})

module.exports = schema