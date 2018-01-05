const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require ('graphql')



const _RESOURCES = new GraphQLObjectType({
	name: 'resources',
	fields: {
		fire: {
			type: GraphQLString ,
			resolve: (fullparentreturnedobject) => {
				return fullparentreturnedobject.fire
			}
		},
		water: {
			type: GraphQLString,
			resolve: (fullparentreturnedobject) => {
				return fullparentreturnedobject.water
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
		resources: {
			type: _RESOURCES,
			resolve: (context) => context.resources
		},
		user: {
			type: _USER,
			resolve: (context) => context.user
		}
	}
})

module.exports = _PROFILE