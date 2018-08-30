export default {
  Employee: {
    id(employee, args, context, info) {
      return employee._id;
    },
  },
  Query: {
    employees(obj, args, context, info) {
      console.log('getting all employees');
    },
  },
  Mutation: {
    createEmployee(obj, args, context, info) {
      console.log('creating new company');
    },
  },
};
