import * as dotenv from "dotenv";

import { CohereClient } from "cohere-ai";

dotenv.config();

class KeywordExtractor {
  private COHERE_API_KEY = process.env["COHERE_API_KEY"] as string;
  private cohere: CohereClient;
  private constructor() {
    this.cohere = new CohereClient({
      token: this.COHERE_API_KEY,
    });
  }
  public async extractKeywordFromMessage(message: string) {
    const prompt = `I am looking into my database to answer this question: '''${message}'''. Extract the keywords that can be used to query. Only ANSWER with KEYWORDS ONLY.`;
    const response = await this.cohere.generate({
      model: "command",
      prompt: prompt,
      maxTokens: 160,
      temperature: 0,
      k: 0,
      stopSequences: [],
      returnLikelihoods: "NONE",
    });
    return response.generations[0].text;
  }
}
