import * as dotenv from 'dotenv';
import { weaviateRoute } from './weaviateRoute'; 
import { ClientRequest } from 'http';

dotenv.config;

const weaviate_key = process.env.WEAVIATE_API_KEY ?? ''

if (!weaviate_key) {
    console.log("API KEY WAS NOT PROVIDED");
}

const weaviateClient = new weaviateRoute(weaviate_key);
await weaviateClient.initSchema();
console.log(JSON.stringify(await weaviateClient.getSchema(), null, 2));

console.log("Hello via Bun!");