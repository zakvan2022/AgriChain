import fs from 'fs';

function requireGraphQL(name) {
  const filename = require.resolve(name);
  return fs.readFileSync(filename, 'utf8');
}

export default [
  'type Query',
  'type Mutation',
  requireGraphQL('./Constituent.graphql'),
  requireGraphQL('./shared.graphql'),
  requireGraphQL('./Company.graphql'),
  requireGraphQL('./Employee.graphql'),
  requireGraphQL('./BatchRecord.graphql'),
  requireGraphQL('./LogisticRecord.graphql'),
  requireGraphQL('./Constituent.graphql'),


];
