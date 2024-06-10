import usersResolvers from './users';

export { 
    Mutation: {
        ...usersResolvers.Mutation
    }
}; 