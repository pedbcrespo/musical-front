import axios from "axios";

export default class ScaleService {
    constructor() {
        // this.url = 'https://pbcrespo.pythonanywhere.com';
        this.url = 'http://127.0.0.1:5000';
    } 

    getNotes() {
        return axios.get(this.url);
    }

    getScale(notes) {
        return axios.post(`${this.url}/find`, {notes});
    }
}