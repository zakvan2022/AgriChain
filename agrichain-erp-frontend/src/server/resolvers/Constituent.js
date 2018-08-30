import {generateId} from '../db';

export default {
  Constituent: {
    id(constituent, args, context, info) {
      return constituent._id;
    },
  },
  Query: {
    async constituents(obj, args, context, info) {
      return await context.Constituent.all();
    },

    async getConstituents(obj, args, context, info) {
      console.log('getting');
      return await context.Constituent.findManyByIds(args.input);
    },
  },
  Mutation: {
    async createConstituent(obj, args, context, info) {
      const newId = generateId();
      const newConstituent = {
        ...args.input,
        _id: newId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await context.Constituent.insertOne(newConstituent);

      return await context.Constituent.findOneById(newId);
    },

    async addConstituents(obj, args, context, info) {
      const newIds = [];
      const newConstituents = args.input.constituents.map((constituent) => {
        const newId = generateId();
        newIds.push(newId);
        return {
          _id: newId,
          createdAt: new Date(),
          updatedAt: new Date(),
          time: new Date(),
          id: constituent.id,
          type: constituent.type,
          company: generateId(),
          location: constituent.location,
        };
      });

      await context.Constituent.insertMany(newConstituents);

      const selector = {
        _id: {$in: newIds},
      };

      return await context.Constituent.findByQuery(selector);
    },
  },
};
