export default class BaseModel {
  validator = {};
  indexes = [];

  constructor(context, collectionName) {
    this.context = context;
    this.collection = context.db.collection(collectionName);
  }

  async updateValidator() {
    const collectionName = this.collection.collectionName;
    // Ensure the collection exists before trying to update the document validator
    await this.context.db.createCollection(collectionName);
    await this.context.db.command({collMod: collectionName, validator: this.validator});
  }

  async updateIndexes() {
    if (!this.indexes.length) {
      return;
    }
    await this.collection.createIndexes(this.indexes);
  }

  async all() {
    return await this.collection.find().toArray();
  }

  async findOneById(id) {
    return await this.collection.findOne({_id: id});
  }

  async findManyByIds(ids) {
    return await this.collection.find({_id: {$in: ids}}).toArray();
  }

  async findByQuery(query) {
    return await this.collection.find(query).toArray();
  }

  async insertOne(doc) {
    return await this.collection.insertOne(doc);
  }

  async insertMany(docs) {
    return await this.collection.insertMany(docs);
  }

  async updateOneByID(id, mutation) {
    return await this.collection.updateOne({_id: id}, {$set: mutation});
  }
}
