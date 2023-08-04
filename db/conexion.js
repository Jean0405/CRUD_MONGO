import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const DB = JSON.parse(process.env.ATLAS_CONNECTION);

export async function connectDB() {
  try {
    // const URI = `mongodb+srv://${DB.user}:${DB.password}@practica.4b4nkjj.mongodb.net/${DB.database}`;}
    const URI = `mongodb+srv://${DB.user}:${DB.password}@practica.4b4nkjj.mongodb.net/${DB.database}`;
    const OPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const client = await MongoClient.connect(URI, OPTIONS);
    console.log("DB CONNECTED");
    return client.db();
  } catch (error) {
    return { status: 500, message: error };
  }
}
