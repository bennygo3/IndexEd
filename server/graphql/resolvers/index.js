import usersResolvers from './users';
import studyCardsResolvers from './studycards';

export default { 
    Query: {
        ...usersResolvers.Query, 
        ...studyCardsResolvers.Query, 
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...studyCardsResolvers.Mutation,
    },
}; 