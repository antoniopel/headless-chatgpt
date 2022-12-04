"use strict";
const { sendRequest } = require('./chatgpt');
(async () => {
    try {
        const message = "Ciao OpenAi, come stai?";
        const response = await sendRequest(message);
        console.log(response);
    }
    catch (err) {
        // Handle any errors that occurred in the main function
        console.error(err);
    }
})();
//# sourceMappingURL=index.js.map