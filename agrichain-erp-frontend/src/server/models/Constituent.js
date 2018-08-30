import BaseModel from './BaseModel';
import ConstituentMeta from './ConstituentMeta';

export default class ConstituentRecord extends BaseModel {
  validator = ConstituentMeta.validator;
  indexes = ConstituentMeta.indexes;

  constructor(context, collectionName) {
    super(context, 'constituent');
    this.context = context;
    this.collection = context.db.collection('constituent');
  }
}
