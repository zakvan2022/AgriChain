import regex from './../regex';

const logisticRecordMeta = {
  indexes: [{
    key: {_id: 1},
  }],
  validator: {
    // Required fields
    _id: {
      $type: 'string',
      $regex: regex.documentId,
      $options: '',
    },
    createdAt: {$type: 'date'},
    updatedAt: {$type: 'date'},

    sender: {
      $type: 'string',
      $regex: regex.documentId,
      $options: '',
    },

    packagedBy: {$type: 'string'},

    receiver: {
      $type: 'string',
      $regex: regex.documentId,
      $options: '',
    },

    receivedBy: {$type: 'string'},

    // Optional fields.
    $and: [
      {$or: [{barcode: {$exists: false}}, {barcode: {$type: 'string'}}]},
      {$or: [{produceType: {$exists: false}}, {produceType: {$type: 'string'}}]},
      {$or: [{produceLocation: {$exists: false}}, {produceLocation: {$type: 'string'}}]},
      {$or: [{producedBy: {$exists: false}}, {producedBy: {$type: 'string'}}]},
      {$or: [{productionTimestamp: {$exists: false}}, {productionTimestamp: {$type: 'date'}}]},
      {$or: [{bestBeforeTimestamp: {$exists: false}}, {bestBeforeTimestamp: {$type: 'date'}}]},
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

export default logisticRecordMeta;
