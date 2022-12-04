`chatgpt.ts` contains the implementation of the sendRequest function. It uses the node-fetch module to make a POST request to the OpenAI API with the provided message. 
It then processes the response to extract the last message received from the API and returns that message as a string.

In order to use the code, you will need to provide a `.env` file with the necessary environment variables.
An example of what this file should look like is provided in `.env.example`. 
You will need to provide the URL for the OpenAI API, your OpenAI API bearer token, and the ID of the model to use for the conversation.

## Getting started

To get started with this project, you will need to do the following:

1. Install the necessary dependencies
2. Set up your environment variables
3. Run the application

## Usage

```shell
npm install
npm start
```