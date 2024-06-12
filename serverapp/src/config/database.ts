import { config } from "dotenv";
import { MongoClient } from "mongodb";

config();
const mongoClient = new MongoClient(
	process.env.MONGO_URL,
	{ forceServerObjectId: true },
);
async function connectToMongoDB() {
	await mongoClient.connect();
	console.log("Connected To MongoDB");
}
export default connectToMongoDB;

export {
	mongoClient,
};
