
// Operations on Employee Table

export const createEmployee = async (poolClient, employee) => {
    const id = await getNextId(poolClient);

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(`INSERT INTO employee (id, sin, first_name, last_name, email, phone_number, role_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [parseInt(id), employee.sin, employee.first_name, employee.last_name, employee.email,employee.phone_number,employee.role_id]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

export const deleteEmployee = async (poolClient, employeeID) => {
    const queryString = "DELETE FROM employee WHERE id = $1";

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, [parseInt(employeeID)]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

export const updateEmployee = async (poolClient, employee) => {

    const queryString = `UPDATE employee SET sin=$2, first_name=$3, last_name=$4, email=$5, phone_number=$6, role_id=$7 where id = $1`;
    const values = [employee.id, parseInt(employee.sin), employee.first_name, employee.last_name, employee.email, employee.phone_number, employee.role_id];

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, values);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

// Pass only poolClient to getAll, otherwise, pass a specific id to get a specific employee
export const getEmployee = async (poolClient, employeeID = null) => {
    let queryString = `SELECT * FROM employee`;
    let values = [];

    if (employeeID) {
        queryString =  `SELECT * FROM employee WHERE id = $1`;
        values.push(parseInt(employeeID));
    }

    const result = await poolClient.query(queryString, values);

    return result.rows;
}

// Operations on Role Table

export const createRole = async (poolClient, role) => {
    const id = await getNextId(poolClient);
    try {
        await poolClient.query('BEGIN');

        await poolClient.query(`INSERT INTO role (id, name, permission_id)) 
            VALUES ($1,$2,$3)`, 
            [parseInt(id), name, parseInt(role.permission_id)]);
        
        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
};

export const deleteRole = async (poolClient, roleID) => {
    const queryString = "DELETE FROM role WHERE id = $1";

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, [parseInt(roleID)]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

export const updateRole = async (poolClient, role) => {

    const queryString = `UPDATE role SET name=$2, permission_id=$3 WHERE id = $1`;
    const values = [parseInt(role.id), name, parseInt(role.permission_id)];

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, values);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

// Pass only poolClient to getAll, otherwise, pass a specific id to get a specific role
export const getRole = async (poolClient, roleID = null) => {
    let queryString = `SELECT * FROM role`;
    let values = [];

    if (roleID) {
        queryString =  `SELECT * FROM role WHERE id = $1`;
        values.push(parseInt(roleID));
    }

    const result = await poolClient.query(queryString, values);

    return result.rows;
}

// Operations on Permission Table

export const createPermission = async (poolClient, permission) => {
    const id = await getNextId(poolClient);
    try {
        await poolClient.query('BEGIN');

        await poolClient.query(`INSERT INTO permission (id, type)) 
            VALUES ($1,$2)`, 
            [parseInt(id), permission.type]);
        
        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
};

export const deletePermission= async (poolClient, permissionID) => {
    const queryString = "DELETE FROM permission WHERE id = $1";

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, [parseInt(permissionID)]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}


// Pass only poolClient to getAll, otherwise, pass a specific id to get a specific role
export const getPermission = async (poolClient, permissionID = null) => {
    let queryString = `SELECT * FROM permission`;
    let values = [];

    if (permissionID) {
        queryString =  `SELECT * FROM permission WHERE id = $1`;
        values.push(parseInt(permissionID));
    }

    const result = await poolClient.query(queryString, values);

    return result.rows;
}


const getNextId = async (poolClient) => {
    const result = await poolClient.query(`SELECT NEXTVAL('seqId')`);

    if (result && result.rows && result.rows[0]) {
        return result.rows[0].nextval;
    } else {
        throw new Error(`Error getting next Id.`);
    }
};