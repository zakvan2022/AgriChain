export default {
  Company: {
    id(company, args, context, info) {
      return company._id;
    },
  },
  Query: {
    companies(obj, args, context, info) {
      console.log('getting all employees');
    },
  },
  Mutation: {
    createCompany(obj, args, context, info) {
      console.log('creating new company');
    },
  },
};
