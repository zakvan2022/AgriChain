import regex from './../regex';

const companyMeta = {
  indexes: [{
    key: {_id: 1},
  }],
  validator: {
    _id: {
      $type: 'string',
      $regex: regex.documentId,
      $options: '',
    },
    firstName: {$type: 'string', $ne: ''},
    lastName: {$type: 'string', $ne: ''},
    companyName: {$type: 'string', $ne: ''},
    companyLocation: {$type: 'string', $ne: ''},
    email: {
      $type: 'string',
      $regex: regex.email,
      $options: '',
    },
    password: {$type: 'string', $ne: ''},
    createdAt: {$type: 'date'},
    updatedAt: {$type: 'date'},
    $and: [{
      $or: [
        {verified: {exists: false}},
        {verified: true},
      ],
    }],
  },
};

export default companyMeta;
