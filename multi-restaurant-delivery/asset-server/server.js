import express from 'express';
import path from 'path';
const app = express();
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.listen(4000, () => console.log('Asset-Server läuft auf 4000'));
