import merge from 'lodash/merge';
import Employee from './Employee';
import Company from './Company';
import LogisticRecord from './LogisticRecord';
import BatchRecord from './BatchRecord';
import Constituent from './Constituent';

const resolvers = {};

merge(resolvers, Employee);
merge(resolvers, Company);
merge(resolvers, BatchRecord);
merge(resolvers, LogisticRecord);
merge(resolvers, Constituent);


export default resolvers;
