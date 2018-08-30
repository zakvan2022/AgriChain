import {generateId} from '../db';

export default {
  LogisticRecord: {
    id(logisticRecord, args, context, info) {
      return logisticRecord._id;
    },
  },
  Query: {
    async logisticRecords(obj, args, context, info) {
      return await context.LogisticRecord.all();
    },
  },
  Mutation: {
    async createLogisticRecord(obj, args, context, info) {
      const newId = generateId();
      const newRecord = {
        ...args.input,
        _id: newId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await context.LogisticRecord.insertOne(newRecord);

      const res = await context.LogisticRecord.findOneById(newId);
      return res;
    },
  },
};
