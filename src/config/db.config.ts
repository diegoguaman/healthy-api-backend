import mongoose from "mongoose";
const DB_NAME = process.env.DB_NAME || "healthyappDB";
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const conectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`${MONGO_URI}/${DB_NAME}` as string);
    console.log(`Connected to db: ${DB_NAME}`);
  } catch (error) {
    console.error(`Error connecting to Mongo: ${error}`);
  }
};
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  } catch (err) {
    console.error(`Mongoose default connection disconnection error: ${err}`);
    process.exit(1);
  }
});
export default conectDB;