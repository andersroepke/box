const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Importér CORS

const app = express();
const PORT = 5001;  // Definer portnummeret

app.use(cors());  // Tillad CORS
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4",
                messages: [
                    {"role": "system", "content": "Du er en kriseberedskabsekspert. Besvar alle spørgsmål med fokus på nødsituationer og beredskab."},
                    {"role": "user", "content": userMessage}
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer sk-svcacct-V5x0IPPt2sRK3rKEdEISNWd8Iaow4JLQzhMIuCv9joXdLp6O56M56pY0icbeT3BlbkFJyb3zve4ZMoBI8LNDeB8nS2BnE4JWyHlofuD2qoa51KYG7PL86W1ktNewlEcA`, // Erstat med din egen API-nøgle
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Der opstod en fejl. Prøv venligst igen senere." });
    }
});

app.listen(PORT, () => console.log("Server kører på http://localhost:" + PORT));
