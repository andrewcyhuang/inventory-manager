import pgdb from '../api/pgdb';
import Constants from '../constants/constants';
export const createRole = roleConfig => {
    return async dispatch => {
        pgdb.post(Constants.createRole, roleConfig);
    };
}