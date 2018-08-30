import BaseModel from './BaseModel';
import LogisticRecordMeta from './LogisticRecordMeta';

export default class LogisticRecord extends BaseModel {
  validator = LogisticRecordMeta.validator;
  indexes = LogisticRecordMeta.indexes;

  constructor(context, collectionName) {
    super(context, 'logisticRecord');
    this.context = context;
    this.collection = context.db.collection('logisticRecord');
  }
}
