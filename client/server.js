const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const app = express();
const validateQuery = require('../server/middlewares/validateSearchQuery');
const {
  getSpanById,
  getSpansBySearchTerms,
  getAllSpans } = require('../server/services/spanSearchService');
const port = 9000;

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


router.get('/spans/search/:term', validateQuery, async (req, res) => {
  const query = req.searchTerms;
  try {
    const result = await getSpansBySearchTerms(query);
    console.log("🚀 ~ file: server.js ~ line 31 ~ router.get ~ result", result);
    res.json(result);

  } catch (error) {
    console.error('error searching spans', error);
    res.status(500).send('Something broke!')
  }
})

router.get('/spans/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).send('invalid id');
  }

  try {
    res.json(await getSpanById(id));
  } catch (error) {
    console.error('error searching span by id', error);
    res.status(500).send('Something broke!')
  }

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})