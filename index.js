const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const app = express();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (_req, res) => {
  const test = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'What are good foods?',
    temperature: 0,
    max_tokens: 2000,
  });
  res.status(200).json({
    message: test.data.choices[0].text,
  });
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  fs.readFile(filePath, 'utf-8', async (err, data) => {
    if (err) {
      console.log({ err });
      res.status(500).json({ message: 'Error reading file' });
    } else {
      const docs = [];
      const start = data.indexOf('#Start') + '#Start'.length;
      const end = data.indexOf('#End');

      const result = data.substring(start, end).trim();

      const chunks = result.split(/\n\n+/);

      for (let i = 0; i < chunks.length; i += 1) {
        const prompt = `Convert the following into a very simple Swagger Documentation:\n${chunks[i]}`;
        console.log(`Generating Swagger Docs for Chunk: ${i}`);

        try {
          // eslint-disable-next-line no-await-in-loop
          const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            temperature: 0,
            max_tokens: 2000,
          });
          const aiData = completion.data.choices[0].text;
          if (docs.length > 0) {
            const newPath = aiData.split('paths:');
            docs.push(newPath[1]);
          } else {
            docs.push(aiData);
          }
          console.log(`Documentation: ${docs}`);
        } catch (error) {
          console.log({ error });
          res.status(500).json(error);
          return;
        }
      }

      res.status(200).send(docs);
    }
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${port}`);
});
