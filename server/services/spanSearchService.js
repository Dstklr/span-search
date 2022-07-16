const { readJson, getJsonString } = require('./jsonUtilsService');
const mapSpan = require('./spanMapperService');

const operators = ['===', '!==', '!=', '<=', '>=', '<', '>', '=='];
const SPECIAL_CASE_KEY = 'key';
const PATH_TO_JSON = './assets/spans.json';


const evaluate = (lefttOperand, operator, rightOperand) => {
    return eval(`${Number(lefttOperand) || `'${lefttOperand}'`} ${operator} ${Number(rightOperand) || `'${rightOperand}'`}`);
};

const getResultInDynamicObject = (term, key, span) => {
    const valueToSearchOn = Object.values(span).pop(); // get last value in the dynamic object

    const parsedJsonString = getJsonString(valueToSearchOn);

    if (typeof parsedJsonString === 'object' && searchRecursivly(term, parsedJsonString)) {
        return true;
    }
    else if (span[key].toLowerCase() === term.leftOperand) { // compare key name to the search term key
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
        else if (Array.isArray(element)) {
            if (element.some(item => searchRecursivly(term, item))) { // at least one object matches the search term is engouh
                return true;
            }
        }
        else { // value is primitive type
            if (!(key.toLowerCase() === term.leftOperand)) continue;

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
                leftOperand: leftOperand.replace(/["]/g, ''),
                operator: operators[index],
                rightOperand: rightOperand.replace(/["]/g, ''),
            }
        }
        return null;
    });
}

const searchSpan = (searchTermsArray, data) => {
    const spansFound = data.filter(span => {
        const result = searchTermsArray.every(term => searchRecursivly(term, span));
        return result;
    });

    return spansFound;
}

const getSpansBySearchTerms = async (query) => {
    const data = await readJson(PATH_TO_JSON);

    if (!query) {
        return data;
    }

    try {
        const searchTermsArray = getSearchTerms(query);
        if (!searchTermsArray || !searchTermsArray[0]) {
            return [];
        }
        return searchSpan(searchTermsArray, data);

    } catch (error) {
        console.error(error.stack);
        return [];
    }
}

const getSpanById = async (id) => {
    const data = await readJson(PATH_TO_JSON);
    const [first] = data.filter(x => x.spanId.toString() === id);

    return {
        ...mapSpan(first),
        logs: JSON.stringify(first.logs),
        tags: JSON.stringify(first.tags),
        refrences: JSON.stringify(first.refrences)
    }
}

const getAllSpans = async () => {
    const parsedSpans = await readJson(PATH_TO_JSON);
    if (!parsedSpans || parsedSpans.lenght === 0) {
        return [];
    }
    return parsedSpans.map(mapSpan);
}

module.exports = {
    getSpanById,
    getSpansBySearchTerms,
    getAllSpans
}