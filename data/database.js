import { MongoClient } from 'mongodb';

const connectionProtocol = process.env.MONGODB_CONNECTION_PROTOCOL ?? "mongodb+srv" ;
const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS ??   "cluster0.itjqx.mongodb.net";
const dbUser = process.env.MONGODB_USERNAME ?? "test";
const dbPassword = process.env.MONGODB_PASSWORD ?? "Bfo37jAkWKSdTBdw";
const dbName = process.env.MONGODB_DB_NAME;

const uri = `${connectionProtocol}://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

console.log('Trying to connect to db');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected successfully to server');
} catch (error) {
  console.log('Connection failed.');
  await client.close();
  console.log('Connection closed.');
  process.exit(1);
}

const database = client.db(dbName);

export default database;
