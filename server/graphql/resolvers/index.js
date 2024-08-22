import usersResolvers from './users';

export default { 
    Mutation: {
        ...usersResolvers.Mutation,
    },
}; 