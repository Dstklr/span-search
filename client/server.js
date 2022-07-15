const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const app = express();
const readJson = require('../server/utils');
const port = 9000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

var operators = ['===', '!==', '!=', '<=', '>=', '<', '>', '=='];
const SPECIAL_CASE_KEY = 'key';
const PATH_TO_JSON = './assets/spans.json';

const getSearchTerms = (searchTerms) => {
  return searchTerms.map(term => {
    const index = operators.findIndex(x => term.includes(x));
    if (index > -1) {
      const [leftOperand, rightOperand] = term.split(operators[index]);
      return {
        leftOperand,
        operator: operators[index],
        rightOperand
      }
    }
    return {};
  });
}

const evaluate = (lefttOperand, operator, rightOperand) => {
  return eval(`${Number(lefttOperand) || `'${lefttOperand}'`} ${operator} ${Number(rightOperand) || `'${rightOperand}'`}`);
};

const getResultInDynamicObject = (term, key, span) => {
  const valueToSearchOn = Object.values(span).pop(); // get last value in the dynamic object
  if (span[key] === term.leftOperand) { // compare key name to the search term key
    return evaluate(valueToSearchOn, term.operator, term.rightOperand);
  }
  return false;
}

const searchRecursivly = (term, span) => {
  for (const key in span) {
    if (Object.hasOwnProperty.call(span, key)) {
      const element = span[key];
      // special case where object is build like key and value 
      if (key === SPECIAL_CASE_KEY) {
        if (getResultInDynamicObject(term, key, span)) {
          return true;
        }
      }
      else if (Array.isArray(element)) {
        if (element.some(item => searchRecursivly(term, item))) { // at least one object matches the search term is engouh
          return true;
        }
      }
      else {
        //check if property name equals
        if (!(key === term.leftOperand)) continue;

        if (evaluate(element, term.operator, term.rightOperand)) {
          return true;
        }
      }
    }
  }
}

const searchSpan = (searchTermsArray, data) => {
  const spansFound = data.filter(span => {
    const result = searchTermsArray.every(term => searchRecursivly(term, span));
    return result;
  });

  return spansFound;
}

router.get('/spans', async (req, res) => {
  const parsedSpans = await readJson(PATH_TO_JSON);
  if (!parsedSpans || parsedSpans.lenght === 0) {
    return res.end([]);
  }
  const data = parsedSpans.map((span => {
    return {
      spanId: span.spanId.toString(),
      parentSpanId: span.parentSpanId.toString(),
      operationName: span.operationName,
      startTime: (new Date(span.startTime / 1000)),
      duration: span.duration,
    }
  }));
  console.log(data[0]);
  res.json(data);
})

router.get('/spans/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).send('invalid id');
  }

  const data = readJson(PATH_TO_JSON);
  const [first] = data.filter(x => x.spanId === id);
  res.json(first);
})

router.get('/spans/search', (req, res) => {
  const query = req.query.match;
  const data = readJson(PATH_TO_JSON);

  if (!query) {
    res.json(data);
    return;
  }

  // search terms ready without spaces
  const searchTerms = query.toLowerCase().replace(/\s/g, '').replace(/['"]+/g, '').split('and');

  try {
    const searchTermsArray = getSearchTerms(searchTerms);
    console.log("🚀 ~ file: server.js ~ line 82 ~ router.get ~ searchTermsArray", searchTermsArray)

    const results = searchSpan(searchTermsArray, data);
    res.json(results);

  } catch (error) {
    console.error(error.stack);
    res.status(500).send('Something broke!')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})