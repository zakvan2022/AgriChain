import regex from './../regex';

const batchRecordMeta = {
  indexes: [{
    key: {_id: 1},
  }],
  validator: {
    _id: {
      $type: 'string',
      $regex: regex.documentId,
      $options: '',
    },
    createdAt: {$type: 'date'},
    updatedAt: {$type: 'date'},

    $and: [
      {$or: [{batchId: {$exists: false}}, {batchId: {$type: 'string'}}]},
      {$or: [{barcode: {$exists: false}}, {barcode: {$type: 'string'}}]},
      {$or: [{hash: {$exists: false}}, {hash: {$type: 'string'}}]},
      {$or: [{produceType: {$exists: false}}, {produceType: {$type: 'string'}}]},
      {$or: [{producedBy: {$exists: false}}, {producedBy: {$type: 'string'}}]},
      {$or: [{productionLocation: {$exists: false}}, {productionLocation: {$type: 'string'}}]},
      {$or: [{productionTimestamp: {$exists: false}}, {productionTimestamp: {$type: 'date'}}]},
      {$or: [{batchBestTimestamp: {$exists: false}}, {batchBestTimestamp: {$type: 'date'}}]},
      {$or: [{metadata: {$exists: false}}, {metadata: {$type: 'string'}}]},

      {$or: [
        {constituents: {$exists: false}},
        {constituents: {$size: 0}},
        {constituents: {
          $elemMatch: {$exists: true},
          $not: {$elemMatch: {$not: regex.documentId}},
        }},
      ]},

      {$or: [
        {properties: {$exists: false}},
        {properties: {$size: 0}},
        {properties: {
          $elemMatch: {$exists: true},
          $type: 'object',
          // TODO: Define what a property looks like or create a model for it.
        }},
      ]},
    ],
  },
};

export default batchRecordMeta;
