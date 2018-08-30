import regex from './../regex';

const employeeMeta = {
  indexes: [{
    key: {name: 1},
  }],
  validator: {
    _id: {
      $type: 'string',
      $regex: regex.documentId,
      $options: '',
    },
    firstName: {$type: 'string', $ne: ''},
    lastName: {$type: 'string', $ne: ''},
    companyId: {$type: 'string', $ne: ''},
    permissions: {$in: ['admin', 'user']},
    email: {
      $type: 'string',
      $regex: regex.email,
      $options: '',
    },
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

export default employeeMeta;
