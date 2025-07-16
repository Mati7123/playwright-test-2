const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.text({ type: '*/*' }));

app.post('/run', async (req, res) => {
  const testCode = req.body;

  if (!testCode || !testCode.includes('@playwright/test')) {
    return res.status(400).send('Invalid test content');
  }

  // Zapisz test do pliku
  fs.writeFileSync('./test.spec.ts', testCode);

  console.log('[SERVER] Otrzymano test, uruchamiam...');

  // Uruchom test i zwróć wynik
  exec('npx playwright test test.spec.ts --reporter=line', (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return res.status(500).send(`Błąd: ${stderr}`);
    }
    res.send(stdout);
  });
});

app.get('/', (req, res) => {
  res.send('Playwright Test Server is running.');
});

app.listen(8080, () => {
  console.log('[SERVER] Nasłuchuję na porcie 8080...');
});
