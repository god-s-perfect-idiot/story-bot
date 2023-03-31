const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();



const ask = async (prompt) => {
    try {

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 2000,
            temperature: 0.7,
        });
        return response.data.choices[0].text
    } catch (e) {
        console.log(e.response)
    }
}

exports.ask = ask;