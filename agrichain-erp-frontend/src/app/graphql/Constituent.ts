import gql from 'graphql-tag';

const ConstituentQuery = {
  constituents: gql`
    query {
      batchRecords {
        id
      }
    }
  `,
  getConstituents: gql`
    query getConst($input: [String!]!) {
      getConstituents(input: $input) {
        id
        createdAt
        updatedAt
        type
        company
        time
        location
      }
    }
  `,
};

const ConstituentMutation = {
  addConstituents: gql`
  mutation addConstituents($input: newConstituentsInput!){
    addConstituents(input: $input) {
      id
    }
  }
  `,
};

export {ConstituentQuery, ConstituentMutation};
