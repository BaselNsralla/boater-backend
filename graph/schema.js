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
					return {
						tools: {potatos: '123$', mangos: '100$'},
						user: {name: fakeUsers[args.id], lastname: 'LALAL'}
					}
				},
				args: {
					id: { type: GraphQLString }
				}
		   }
		}
	})
})

module.exports = schema