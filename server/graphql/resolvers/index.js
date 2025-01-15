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

console.log('Users Resolvers:', usersResolvers);
console.log('StudyCards Resolvers:', studyCardsResolvers);