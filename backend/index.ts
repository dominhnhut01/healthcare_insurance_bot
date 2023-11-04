import * as dotenv from 'dotenv';
import { weaviateRoute } from './weaviateRoute'; 

dotenv.config;

const weaviate_key = process.env.WEAVIATE_API_KEY ?? '';
const cohere_key = process.env.COHERE_API_KEY ?? '';

if (!weaviate_key) {
    console.log("API KEY WAS NOT PROVIDED");
}

const weaviateClient = new weaviateRoute(weaviate_key, cohere_key);
const testStr1 = "These provisions apply when We pay benefits as a result of injuries or illness You sustained and You have a right to a recovery or have received a recovery as a result of actions or omissions of a third party. We will automatically have a lien upon any recovery. Our lien will equal the amount of benefits We pay on Your behalf for injuries, disease, condition or loss You sustained as a result of any act or omission for which a third party is liable. Our lien will not exceed the amount We actually paid for those services. If We paid the Provider on a capitated basis, Our lien will not exceed 80% of the usual and customary charges for those services in the geographic area in which they were rendered. In this section, “recovery” means money You (or Your estate, parent, trustee or legal guardian) receive, are entitled to receive, or have a right to receive, whether by judgment, award, settlement or otherwise as a result of injury or illness caused by the third party, regardless of whether liability is contested. In this section “third party” refers to any person or entity who is legally responsible in relation to the injuries or illnesses sustained by You for which We paid benefits, including but not limited to the party(ies) who caused the injury or illness (“tortfeasor”), the tortfeasor’s insurer, the tortfeasor’s indemnifier, the tortfeasor’s guarantor, the tortfeasor’s principal or any other person or entity responsible or liable for the tortfeasor’s acts or omissions, Your own insurer (underinsured or uninsured motorist benefits, medical payments, no fault benefits, personal injury protection, etc.), or any other person, entity, policy or plan that may be liable or responsible in relation to the injuries or illness, to the extent permitted by law."
const testStr2 = "Often an urgent rather than an Emergency health problem exists. An urgent health problem is an unexpected illness or injury that calls for care that cannot wait until a regularly scheduled office visit. Urgent health problems are not life threatening and do not call for the use of an Emergency room. Urgent health problems include earache, sore throat and fever (not above one-hundred and four (104) degrees). Benefits for Urgent Care may include: · X-ray services · Care for broken bones · Tests such as flu, urinalysis, pregnancy test, rapid strep"
//await weaviateClient.initSchema();
//await weaviateClient.deleteSchema('EOC');
//await weaviateClient.addClassObj(testStr1);
//await weaviateClient.addClassObj(testStr2);
//console.log(JSON.stringify(await weaviateClient.getSchema(), null, 2));
const res = await weaviateClient.generativeQuery('Urgent care');
//console.log(res);

console.log("Hello via Bun!");