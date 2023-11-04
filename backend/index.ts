import * as dotenv from 'dotenv';
import { weaviateRoute } from './weaviateRoute'; 

dotenv.config;

const weaviate_key = process.env.WEAVIATE_API_KEY ?? ''

if (!weaviate_key) {
    console.log("API KEY WAS NOT PROVIDED");
}

const weaviateClient = new weaviateRoute(weaviate_key);
weaviateClient.connect();

console.log("Hello via Bun!");