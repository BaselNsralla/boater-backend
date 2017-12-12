const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require ('graphql')

const _TOOLS = new GraphQLObjectType({
	name: 'tools',
	fields: {
		mangos: {
			type: GraphQLString ,
			resolve: (fullparentreturnedobject) => {
				return fullparentreturnedobject.mangos
			}
		},
		potatos: {
			type: GraphQLString,
			resolve: (fullparentreturnedobject) => {
				return fullparentreturnedobject.potatos
			}
		}
	}
})

const _USER = new GraphQLObjectType({
	name: 'user',
	fields: {
		name: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: (context) => context.name 
		},
		lastname: {
			type: GraphQLString,
			resolve: (context) => context.lastname
		}
	}
})

const _PROFILE = new GraphQLObjectType({
	name : 'profile',
	fields: {
		tools: {
			type: _TOOLS,
			resolve: (context) => (context.tools)
		},
		user: {
			type: _USER,
			resolve: (context) => context.user
		}
	}
})

module.exports = _PROFILE