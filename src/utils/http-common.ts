import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const parsingOpts = {
    ignoreAttributes: true
};

export default axios.create({
    baseURL: 'https://cors-anywhere-ryhd.onrender.com/http://api.irishrail.ie/realtime/realtime.asmx',
    transformResponse: (data: any, header: any, status?: number) => {
        if (status !== 200) {
            return;
        }

        const parser = new XMLParser(parsingOpts);
        return parser.parse(data);
    }
});