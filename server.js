require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/api/translate', async (req, res) => {
    const { text, to } = req.body;
    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.cognitive.microsofttranslator.com/translate',
            params: {
                'api-version': '3.0',
                'to': to || 'zh-CN'
            },
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.MICROSOFT_TRANSLATOR_KEY,
                'Ocp-Apim-Subscription-Region': process.env.MICROSOFT_TRANSLATOR_REGION,
                'Content-Type': 'application/json'
            },
            data: [{ text }]
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message, details: error.response?.data });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
