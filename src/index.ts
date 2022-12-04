const { sendRequest } = require('./chatgpt');

(async () => {
  try {
    const message = "Hello, how are you?";
    const response = await sendRequest(message);
    console.log(response);
  } catch (err) {
    // Handle any errors that occurred in the main function
    console.error(err);
  }
})();
