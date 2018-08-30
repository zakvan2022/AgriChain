import {generateId} from '../db';

export default {
  BatchRecord: {
    id(batchRecord, args, context, info) {
      return batchRecord._id;
    },
  },
  Query: {
    async batchRecords(obj, args, context, info) {
      const records = await context.BatchRecord.all();
      return records;
    },
  },
  Mutation: {
    async createBatchRecord(obj, args, context, info) {

      const newId = generateId();
      const newRecord = {
        _id: newId,
        createdAt: new Date(),
        updatedAt: new Date(),
        batchId: args.input.batchId,
        barcode: args.input.barcode,
        produceType: args.input.produceType,
        producedBy: args.input.producedBy,
        productionLocation: args.input.productionLocation,
        productionTimestamp: new Date(args.input.productionTimestamp),
        batchBestTimestamp: new Date(args.input.batchBestTimestamp),
        metadata: args.input.metadata,
        constituents: args.input.constituents.filter((id) => id !== ''),
        properties: args.input.properties,
      };

      await context.BatchRecord.insertOne(newRecord);

      const res = await context.BatchRecord.findOneById(newId);
      return res;
    },
  },
};
