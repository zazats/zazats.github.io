

// Define the phrase and prompt
//const phrase = "The cat sat on the mat.";
//const prompt = `Generate questions related to the following phrase: '${phrase}'`;

async function fetchModels() {
    try {

        // Make a request to the OpenAI API to fetch available models
        const response = await fetch('https://api.openai.com/v1/engines', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CHATGPT_API_KEY}`
            }
        });

        // Check if the request was successful
        if (response.ok) {
            // Parse response
            const data = await response.json();

            // Extract and print available models
            const models = data.data.filter(model => !model.deprecated).map(model => model.id);
            console.log("Available Models:", models);
        } else {
            // Handle error if request was not successful
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to generate questions

window.generateQuestions = async function generateQuestions(phrase, prompt) {
    try {
       
        // Call the function to fetch available models
   //     fetchModels();
        // Make a request to the OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CHATGPT1}${CHATGPT2}`
            },
            body: JSON.stringify({
                    "model": "gpt-3.5-turbo-0125",
                    "messages": [
                      {
                        "role": "system",
                        "content": "Your name is John. You should ask question in the context of the text from user. Say Hi before asking question. Always ask question base on the publications in the relevant area"
                      },
                      {
                        "role": "user",
                        "content": prompt
                      }
                    ],
                    "temperature": 1,
                    "max_tokens": 256,
                    "top_p": 1,
                    "frequency_penalty": 0,
                    "presence_penalty": 0
                  
            })
        });

        // Parse response
        const data = await response.json();
        
        // Extract generated questions from the response
       // const generatedQuestions = data.choices.map(choice => choice.text.trim());
        const generatedQuestions = data.choices[0].message.content;
        
        return data.choices[0].message.content;
        // Print generated questions
       //console.log("Generated Questions:");
       // generatedQuestions.forEach((question, index) => {
       //     console.log(`${index + 1}. ${question}`);
       // });
    } catch (error) {
        console.error('Error:', error);
    }
}



