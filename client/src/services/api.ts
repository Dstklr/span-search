import axios from "axios";

const FETCH_SPANS_BY_SEARCH_TERMS_URL = '/api/spans/search/';
const FETCH_SPANS = '/api/spans/';

const fetchSpan = async (id: string) => {
    try {
        const { data } = await axios.get(`${FETCH_SPANS}${id}`);
        //check if response is error/notfound
        return data;
    } catch (error) {
        console.log('error occured while fetching spans', error);
        return null;
    }
}

const fetchSpans = async (query?: string) => {
    try {
        const url = query
            ? `${FETCH_SPANS_BY_SEARCH_TERMS_URL}${query}`
            : `${FETCH_SPANS}`;

        const { data } = await axios.get(url);
        //check if response is error/notfound
        return data;
    } catch (error) {
        console.log('error occured while fetching spans', error);
        return [];
    }
}

export { fetchSpan, fetchSpans }