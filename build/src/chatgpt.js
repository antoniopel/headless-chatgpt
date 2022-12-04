"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequest = void 0;
require('dotenv').config();
const fetch = require('node-fetch');
const { Request } = fetch;
const performance = require('performance');
function generateUUID() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' &&
        typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}
const bearerToken = process.env.BEARER_TOKEN;
const apiUrl = process.env.API_URL;
const model = process.env.MODEL;
function prepareRequest(message) {
    const defaultBody = {
        action: 'next',
        model: model,
        parent_message_id: '',
        messages: [
            {
                id: '',
                role: 'user',
                content: {
                    content_type: 'text',
                    parts: [''],
                },
            },
        ],
    };
    let body = defaultBody;
    body.messages[0].id = generateUUID();
    body.messages[0].content.parts[0] = message;
    return JSON.stringify(body);
}
const sendRequest = async (message) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`,
            },
            body: prepareRequest(message),
        });
        let textResponse = await response.text();
        // Split the response text into an array of messages
        let messages = textResponse.split('\n');
        // remove empty strings from messages
        messages = messages.filter((message) => message !== '');
        // Find the index of the "data: [DONE]" message
        const doneIndex = messages.indexOf('data: [DONE]');
        // Get the last message received by accessing the element at the index before "data: [DONE]"
        let lastMessage = messages[doneIndex - 1];
        // lastMessage actually starts after "data: " so we need to remove that
        lastMessage = lastMessage.substring(6);
        // Parse the last message as JSON
        const lastMessageJson = JSON.parse(lastMessage);
        // Access the "parts" array from the "content" object in the last message
        const lastMessageParts = lastMessageJson.message.content.parts;
        // merge the parts into a single string
        const lastMessageString = lastMessageParts.join(' ');
        return lastMessageString;
    }
    catch (err) {
        // Handle any errors that occurred when sending the request and processing the response
        console.error(err);
        throw err;
    }
};
exports.sendRequest = sendRequest;
//# sourceMappingURL=chatgpt.js.map