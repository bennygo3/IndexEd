import usersResolvers from './users.js';
import studyCardsResolvers from './studycards.js';

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