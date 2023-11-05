import weaviate, {
  WeaviateClient,
  ApiKey,
  WeaviateClass,
  ObjectsBatcher,
  GraphQLGetter,
} from "weaviate-ts-client";
import classDefinition from "./classDefinition";

export class WeaviateRoute {

  private client: WeaviateClient;
  private COHERE_API_KEY = process.env["COHERE_API_KEY"] as string;
  private WEAVIATE_API_KEY = process.env["WEAVIATE_API_KEY"] as string;
  private maxDistance = 0.145;

  // Initialize a weaviate client using the appropriate
  // weaviate api key and cohere api key
  constructor() {
    this.client = weaviate.client({
      scheme: "https",
      host: "eoc-cluster-nl8w5r28.weaviate.network",
      apiKey: new ApiKey(this.WEAVIATE_API_KEY),
      headers: { "X-Cohere-Api-Key": this.COHERE_API_KEY },
    });
  }

  // Return the current class schema as a WeaviateClass
  async getSchema(): Promise<WeaviateClass> {
    const res = (await this.client.schema.getter().do()) as WeaviateClass;
    return res;
  }

  // Initialize a class schema using the provided classDefinition.ts
  // if the schema doesn't already exists.
  async initSchema() {
    const curSchema = await this.client.schema.getter().do();
    if (
      curSchema.classes?.some(
        (existingClass) => existingClass.class === classDefinition.class
      )
    ) {
      console.log("Class schema already exists");
    } else {
      await this.client.schema.classCreator().withClass(classDefinition).do();
      console.log("Schema added successfully");
    }
  }

  // Delete the class schema with the provided className
  async deleteSchema(className: string) {
    try {
      await this.client.schema.classDeleter().withClassName(className).do();
      console.log("Schema deleted successfully");
    } catch (error) {
      throw new Error("Operation could not be completed");
    }
  }

  // Add a class object to the cluster
  async addClassObj(uid: string, info: string) {
    return new Promise<any>(async (resolve, reject) => {
      let batcher: ObjectsBatcher = this.client.batch.objectsBatcher();

      const classObject = {
        class: "EOC",
        properties: {
          UID: uid,
          information: info,
        },
      };

      batcher = batcher.withObject(classObject);
      const res = await batcher.do();
      console.log(res);
    });
  }
  
  // Query objects from the cluster using the provided query string
  async generativeQuery(uid: string, keyword: string, question: string) {
      const res = await this.client.graphql.get()
          .withClassName('EOC')
          .withWhere({
              path: ['uID'],
              operator: 'Equal',
              valueText: uid,
          })
          .withNearText({ 
              concepts: [keyword],
              distance: this.maxDistance,
          })
          .withGenerate({singlePrompt: `Given this information: {information}` +
              `provide a CONCISE answer to this question:${question}\nONLY include the most RELEVANT information`})
          .withLimit(1)
          .withFields('uID information')
          .do();
      console.log(JSON.stringify(res, null, 2));
      return res;
  }

  // This is only for testing purposes
  async getEverything(uid: string) {
    const res = await this.client.graphql
      .get()
      .withClassName("EOC")
      .withWhere({
        path: ["uID"],
        operator: "Equal",
        valueText: uid,
      })
      .withFields("uID information")
      .withNearText({ concepts: ["everything"] })
      .withLimit(20)
      .do();
    console.log(JSON.stringify(res, null, 2));
  }
}
