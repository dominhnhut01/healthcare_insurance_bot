import weaviate, { WeaviateClient, ApiKey } from "weaviate-ts-client";

export class weaviateRoute {

    private client: WeaviateClient;

    constructor(apiKey: string) {
        this.client = weaviate.client({
            scheme: 'https',
            host: 'eoc-cluster-nl8w5r28.weaviate.network',
            apiKey: new ApiKey(apiKey),
        })
    }

    async connect() {
        var res = await this.client.schema.getter().do();
        console.log(JSON.stringify(res, null, 2))
    }

}