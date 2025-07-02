import express from 'express';
const app = express();
app.use(express.json());
app.post('/track-event', async (req, res) => {
  const { userId, flagKey, variant, eventType } = req.body;
  await db.query(
    `INSERT INTO experiment_events(user_id, flag_key, variant, event_type, ts)
     VALUES($1,$2,$3,$4,NOW())`,
    [userId, flagKey, variant, eventType]
  );
  res.status(204).send();
});
