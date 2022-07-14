import axios from "axios";

const fetchSpan = async (id: string) => {
    try {
        const { data } = await axios.get(`http://localhost:9000/api/spans/${id}`);
        //check if response is error/notfound
        return data;
    } catch (error) {
        console.log('error occured while fetching spans', error);
        return null;
    }
}

const fetchSpans = async () => {
    try {
        const { data } = await axios.get(`http://localhost:9000/api/spans`);
        //check if response is error/notfound
        return data;
    } catch (error) {
        console.log('error occured while fetching spans', error);
        return [];
    }
}

export { fetchSpan, fetchSpans }