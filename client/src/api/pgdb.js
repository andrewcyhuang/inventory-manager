import axios from 'axios';
import Constants from "../constants";

export default axios.create({
    baseUrl: Constants.baseUrl + Constants.port_server + Constants.apiPrefix
});