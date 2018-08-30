import gql from 'graphql-tag';

const BatchRecordQuery = {
  getBatchRecords: gql`
    query {
      batchRecords {
        id
        createdAt
        updatedAt
        barcode
        produceType
        producedBy
        productionTimestamp
        batchBestTimestamp
        metadata
        constituents
        properties {
          name
          value
        }
      }
    }
  `,
};

const BatchRecordMutation = {
  createBatchRecord: gql`
    mutation createBatchRecord($input: newBatchRecordInput!){
      createBatchRecord(input: $input) {
        id
      }
    }
  `,
};

export {BatchRecordQuery, BatchRecordMutation};
