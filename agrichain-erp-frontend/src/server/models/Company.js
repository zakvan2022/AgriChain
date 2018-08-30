import BaseModel from './BaseModel';
import CompanyMeta from './CompanyMeta';

export default class Company extends BaseModel {
  validator = CompanyMeta.validator;
  indexes = CompanyMeta.indexes;

  constructor(context, collectionName) {
    super(context, 'company');
    this.context = context;
    this.collection = context.db.collection('company');
  }
}
