import axios from 'axios';
import Constants from "./constants";

export default axios.create({
  baseURL: Constants.baseUrl + Constants.portServer + Constants.apiPrefix
});

export const isPgConnected = async () => {
  try {
    await axios.get(Constants.statusPrefix)
    return true;
  } catch (e) {
    return false;
  }
}