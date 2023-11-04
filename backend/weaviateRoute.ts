import weaviate, { WeaviateClient, ApiKey, WeaviateClass} from "weaviate-ts-client";
import classDefinition from "./classDefinition"

export class weaviateRoute {

    private client: WeaviateClient;

    constructor(apiKey: string) {
        this.client = weaviate.client({
            scheme: 'https',
            host: 'eoc-cluster-nl8w5r28.weaviate.network',
            apiKey: new ApiKey(apiKey),
        })
    }

    async getSchema() : Promise<WeaviateClass> {
        var res = await this.client.schema.getter().do() as WeaviateClass;
        return res;
    }

    async initSchema() {
        var curSchema = await this.client.schema.getter().do();
        if (curSchema.classes?.some((existingClass) => existingClass.class === classDefinition.class)) {
            console.log("Class schema already exists");
        } else {
            await this.client.schema.classCreator().withClass(classDefinition).do();
            console.log("Schema added successfully");
        }
    }

}