import Comapany from './Company';
import Employee from './Employee';
import BatchRecord from './BatchRecord';
import LogisticRecord from './LogisticRecord';
import Constituent from './Constituent';

const models = {
  Comapany,
  Employee,
  BatchRecord,
  LogisticRecord,
  Constituent,
};

export default async function addModelsToContext(context, {applyValidatorsAndIndexes} = {}) {
  const newContext = Object.assign({}, context);
  const modelNames = Object.keys(models);

  for (const modelName of modelNames) {
    newContext[modelName] = new models[modelName](newContext);

    if (applyValidatorsAndIndexes) {
      // Update the validator
      if (newContext[modelName].updateValidator) {
        await newContext[modelName].updateValidator();
      }

      // Update indexes
      if (newContext[modelName].updateIndexes) {
        await newContext[modelName].updateIndexes();
      }
    }
  }

  return newContext;

}
