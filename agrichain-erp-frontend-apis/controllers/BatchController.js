var express = require('express'),
router = express.Router();

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var dbConnect = require('../db');
var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;
var db;
MongoClient.connect(dbConnect.url, (err, database) => {
    if (err)
        return console.log(err)
    db = database
});
var ObjectID = Mongo.ObjectID;

var schema = buildSchema(`
    input BatchProperties {
        properties: String!
        values: String!
    }
    input AddConstituents {
        id: String!
        type: String!
        company: String!
        time: String!
        barcode_id: String!
    }
    input UnAvailableConstituents {
        id: String!
        type: String!
        company: String!
        time: String!
        location: String!
    }
    input Metadata {
        comment: String!
    }
    input Batch {
        batchId: String!
        barcode: String!
        produce_type: String!
        production_location: String!
        produced_by: String!
        production_timestamp: String!
        batch_best_timestamp: String!
        batch_properties: [ BatchProperties ]!
        add_constituents: [ AddConstituents ]!
        unavailable_constituents: [ UnAvailableConstituents ]!
        metadata: Metadata!
    }

    type BatchPropertiesOutput {
        properties: String!
        values: String!
    }
    type AddConstituentsOutput {
        id: String!
        type: String!
        company: String!
        time: String!
        barcode_id: String!
    }
    type UnAvailableConstituentsOutput {
        id: String!
        type: String!
        company: String!
        time: String!
        location: String!
    }
    type MetadataOutput {
        comment: String!
    }
    type BatchOutput {
        batchId: String!
        barcode: String!
        produce_type: String!
        production_location: String!
        produced_by: String!
        production_timestamp: String!
        batch_best_timestamp: String!
        batch_properties: [ BatchPropertiesOutput ]!
        add_constituents: [ AddConstituentsOutput ]!
        unavailable_constituents: [ UnAvailableConstituentsOutput ]!
        metadata: MetadataOutput!
    }

    type BatchGet {
        batch: BatchOutput
        err: String
    }

    type BatchClass {
        create(input: Batch): Int
        update(input: Batch, obj_id: String): Int
        get_batch(obj_id: String): BatchGet
        delete_batch(obj_id: String): Int
        list_batch(page_size: Int, page_number: Int): [BatchOutput]
    }

    type Query {
        batch: BatchClass
    }
`);

class BatchGet {
    set_batch(batch) {
        this.batch = batch;
    }
    set_err(err) {
        this.err = err;
    }
}

class BatchClass {
    async create({input}) {
        var newBatch = await db.collection('batch').insert(input);
        if(newBatch) {
            return 1;
        }
        return 0;
    }

    async update({input, obj_id}) {
        var batch_update = await db.collection('batch').update({
            '_id': ObjectID(obj_id)
        }, {
            $set: input
        });
        if(batch_update) {
            return 1;
        }
        return 0;
    }

    async get_batch({obj_id}) {
        var batch = await db.collection('batch').findOne({
            '_id': ObjectID(obj_id)
        });
        var batch_get_obj = new BatchGet();
        if( batch ) {
            batch_get_obj.set_batch(batch);
            return batch_get_obj;
        }
        batch_get_obj.set_err('Not found');
        return batch_get_obj;
    }

    async list_batch({ page_size, page_number }) {
        var skip_num = page_size*(page_number-1);
        var batch = await db.collection('batch').find().skip(skip_num).limit(page_size).toArray();
        return batch;
    }

    async delete_batch({obj_id}) {
        var batch = await db.collection('batch').deleteOne({
            '_id': ObjectID(obj_id)
        });
        if( batch ) {
            return 1;
        }
        return 0;
    }
}

var root = {
    batch() {
        return new BatchClass();
    }
};

router.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

module.exports = router;
