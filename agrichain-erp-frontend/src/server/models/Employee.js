import BaseModel from './BaseModel';
import EmployeeMeta from './EmployeeMeta';

export default class Employee extends BaseModel {
  validator = EmployeeMeta.validator;
  indexes = EmployeeMeta.indexes;

  constructor(context, collectionName) {
    super(context, 'employee');
    this.context = context;
    this.collection = context.db.collection('employee');
  }
}
