# InsurAI
## Inspiration
The inspiration for our chat bot is to make healthcare Evidence of Coverage (EOC) documents more accessible and understandable for policy-holders. Using AI technology and advanced language models, we aim to empower users to navigate the complexities of their insurance plans with ease and confidence.

## What it does
The AI-driven healthcare EOC Customer Care Solution takes EOC documents, leverages Smart Document Understanding to extract key information, and utilizes Cohere AI for a user-friendly conversational interface. It allows users to interact with their documents, ask questions, and receive simplified explanations, enhancing their understanding of healthcare coverage terms and details. The integration of Vector Database and Large Language Models further enhances the user experience by providing clear and concise explanations of complex insurance concepts.

## How we built it
We developed the interface using React Material UI, establishing communication with APIs and Web Sockets built on Bun. To create a fully functional chat bot, we harnessed CohereAI as our Large Language Model and Weaviate as the vector database. This dynamic combination enables us to generate matching and satisfactory responses to our users' questions.

## Challenges we ran into
It's the first time for many of us working with a Large Language Model as well as the Vector Database, so it took us a considerable amount of time to make each service function and to set up the chat pipeline.

## Accomplishments that we're proud of
Despite the numerous challenges we encountered, we successfully developed a functional chatbot capable of scanning the user's EOC documents and delivering accurate responses to user queries.

## What we learned
Besides learning the technologies, it is the first time that we employ SCRUM methodologies to develop our hackathon project. Thanks to this, we learn a lot about software engineering techniques, Git, and how to make a productive software team.

## What's next for InsurAI
There are many more features that we could not implement during the hackathon, such as User Authentication for privacy, parse more complex PDF documents that includes table and diagram, etc.
