import { config } from "dotenv";
import connectToMongoDB from "./config/database.js";
import app from "./app.js";
import "./config/coinbase.js";

config();

const PORT = process.env.PORT || 5000;

// Starting http && webSocket
async function startServer() {
	await connectToMongoDB();

	const server = app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

export default startServer;
