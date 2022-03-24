const { MongoClient, ObjectId } = require('mongodb');

const connectionUrl =
  'mongodb+srv://sachin-new:sachin007@cluster0.7h3cv.mongodb.net/healthapp-backend-new?authSource=admin&replicaSet=atlas-cyj5rm-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';
const client = new MongoClient(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const dbName = 'guessit';

let db;

const getDb = () => db;

function isConnected(client) {
  if (client && client.topology && client.topology.isConnected()) {
    return true;
  }
  return false;
}

const connectDb = async (_req, res, next) => {
  if (!isConnected(client)) {
    await init();
  }
  next();
};

const init = async () =>
  // const client =
  await client.connect().then(client => {
    db = client.db(dbName);
    console.log('db connected');
  });

const insertQuestion = async item => {
  const collection = await db.collection('questions');
  return await collection.insertOne(item);
};

const getQuestions = async () => {
  const collection = await db.collection('questions');
  const questionsData = await collection.find({}).toArray();
  return questionsData;
};

const updateQuestion = (id, quantity) => {
  const collection = db.collection('items');
  return collection.updateOne({ _id: ObjectId(id) }, { $inc: { quantity } });
};

const findUser = async email => {
  const authCollection = await db.collection('auth');
  return await authCollection.findOne({ email: email });
  // return collection.updateOne({ _id: ObjectId(id) }, { $inc: { quantity } });
};

module.exports = {
  init,
  insertQuestion,
  getQuestions,
  updateQuestion,
  findUser,
  getDb,
  connectDb
};
