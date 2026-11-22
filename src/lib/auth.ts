import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

const client =
  globalForMongo.mongoClient ?? new MongoClient(process.env.BETTER_AUTH_DB!);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

const db = client.db(process.env.MONGODB_DB ?? "salonbook");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
      // Temporary: public signup can pick a role. Replace with the Better Auth
      // admin plugin before this app is deployed anywhere real.
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
