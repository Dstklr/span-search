const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const app = express();
const { validateSearchQuery, validateSpanId } = require('./middlewares/validation');
const { verifyCache } = require('./middlewares/cache');
const cacheProvider = require('./services/cacheService');
const {
  getSpanById,
  getSpansBySearchTerms,
  getAllSpans } = require('./services/spanSearchService');
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.get('/spans', async (req, res) => {
  try {
    res.json(await getAllSpans());
  } catch (error) {
    console.log('failed fetching all spans', error);
    res.json([]);
  }
})

router.get('/spans/search/:term', validateSearchQuery, async (req, res) => {
  const query = req.searchTerms;
  try {
    const result = await getSpansBySearchTerms(query);
    res.json(result);

  } catch (error) {
    console.error('error searching spans', error);
    res.status(500).send('Something broke!')
  }
})

router.get('/spans/:id', validateSpanId, verifyCache, async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).send('invalid id');
  }

  try {
    const span = await getSpanById(id);
    if (span) {
      await cacheProvider.set(id, span);
    }
    res.json(span);
  } catch (error) {
    console.error('error searching span by id', error);
    res.status(500).send('Something broke!')
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})