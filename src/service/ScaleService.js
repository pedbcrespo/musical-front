import axios from "axios";

export default class ScaleService {
    constructor() {
        this.url = 'https://pbcrespo.pythonanywhere.com';
    } 

    getNotes() {
        return axios.get(this.url);
    }

    getScale(notes) {
        return axios.post(`${this.url}/find`, {notes});
    }
}