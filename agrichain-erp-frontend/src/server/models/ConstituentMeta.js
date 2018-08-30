import regex from './../regex';

const constituentMeta = {
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
    id: {$type: 'string'},
    createdAt: {$type: 'date'},
    updatedAt: {$type: 'date'},

    // Optional fields
    $and: [
      {$or: [{type: {$exists: false}}, {type: {$type: 'string'}}]},
      {$or: [{company: {$exists: false}}, {company: {$type: 'string', $regex: regex.documentId, $options: ''}}]},
      {$or: [{time: {$exists: false}}, {time: {$type: 'date'}}]},
      {$or: [{location: {$exists: false}}, {location: {$type: 'string'}}]},
    ],
  },
};

export default constituentMeta;
