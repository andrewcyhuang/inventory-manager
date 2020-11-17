import axios from 'axios';
import Constants from "./constants";

export default axios.create({
  baseURL: Constants.baseUrl + Constants.portServer + Constants.apiPrefix
});

