const readJson = require('./utils');
const operators = ['===', '!==', '!=', '<=', '>=', '<', '>', '=='];
const SPECIAL_CASE_KEY = 'key';
const PATH_TO_JSON = './assets/spans.json';


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

        if (!Object.hasOwnProperty.call(span, key)) continue;

        const element = span[key];

        if (key === SPECIAL_CASE_KEY) { // special case where object is build in { key:'key' and value:'value' } structure
            if (getResultInDynamicObject(term, key, span)) {
                return true;
            }
        }
        else if (Array.isArray(element)) { // check if value is array
            if (element.some(item => searchRecursivly(term, item))) { // at least one object matches the search term is engouh
                return true;
            }
        }
        else { // value is primitive type
            if (!(key === term.leftOperand)) continue;

            if (evaluate(element, term.operator, term.rightOperand)) {
                return true;
            }
        }
    }
}


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

const searchSpan = (searchTermsArray, data) => {
    const spansFound = data.filter(span => {
        const result = searchTermsArray.every(term => searchRecursivly(term, span));
        return result;
    });

    return spansFound;
}

const getSpansBySearchTerms = (query) => {
    const data = await readJson(PATH_TO_JSON);

    if (!query) {
        res.json(data);
        return;
    }
    // search terms ready without spaces
    const searchTerms = query.toLowerCase().replace(/\s/g, '').replace(/['"]+/g, '').split('and');

    try {
        const searchTermsArray = getSearchTerms(searchTerms);
        const results = searchSpan(searchTermsArray, data);
        res.json(results);

    } catch (error) {
        console.error(error.stack);
        res.status(500).send('Something broke!')
    }
}

const getSpanById = (id) => {
    const data = await readJson(PATH_TO_JSON);
    const [first] = data.filter(x => x.spanId.toString() === id);

    return {
        ...first,
        logs: JSON.stringify(first.logs),
        tags: JSON.stringify(first.tags),
        refrences: JSON.stringify(first.refrences)
    }
}

const getAllSpans = () => {
    const parsedSpans = await readJson(PATH_TO_JSON);
    if (!parsedSpans || parsedSpans.lenght === 0) {
        return res.end([]);
    }
    return parsedSpans.map((span => {
        return {
            spanId: span.spanId.toString(),
            parentSpanId: span.parentSpanId.toString(),
            operationName: span.operationName,
            startTime: (new Date(span.startTime / 1000)),
            duration: span.duration,
        }
    }));
}

module.export = {
    getSpanById,
    getSpansBySearchTerms,
    getAllSpans
}