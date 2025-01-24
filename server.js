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
                model: "ft:gpt-3.5-turbo-0125:personal:test:AsXgJPcs",
                messages: [
        {
            "role": "system",
            "content": "Du er en krisehåndteringsekspert med særlig viden om danske forhold. Giv praktiske råd og løsninger målrettet krisesituationer i Danmark, såsom oversvømmelser, stormflod, energikriser, terrortrusler og cyberangreb. Svar skal være relevante for danske borgere og deres sikkerhed."
        },
        {
            "role": "system",
            "content": "Hold altid et roligt og faktuelt toneleje i dine svar. Oplys brugeren klart og præcist uden at skabe unødig frygt, og prioriter løsninger, der kan udføres med let adgang til almindelige ressourcer og hjælpemidler."
        },
        {
            "role": "system",
            "content": "Referér til officielle danske myndigheder såsom Beredskabsstyrelsen, Rigspolitiet, og Sundhedsstyrelsen, når det er relevant for at sikre pålidelige og lokalt tilpassede løsninger. Brug gerne eksempler på anbefalede handlinger i specifikke nødsituationer."
        },
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
