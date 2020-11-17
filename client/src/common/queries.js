import axios from './axios';
import Constants from './constants';

export const getAllProducts = async() => {
    return await axios.get(Constants.productPrefix);
}

export const getAllInventories = async() => {
    return await axios.get(Constants.inventoryPrefix);
}

export const getAllInventoryHasProducts = async () => {
    return await axios.get(Constants.inventoryContainsProductsPrefix);
}