import BaseModel from './BaseModel';
import BatchRecordMeta from './BatchRecordMeta';

export default class BatchRecord extends BaseModel {
  validator = BatchRecordMeta.validator;
  indexes = BatchRecordMeta.indexes;

  constructor(context, collectionName) {
    super(context, 'batchRecord');
    this.context = context;
    this.collection = context.db.collection('batchRecord');
  }
}
