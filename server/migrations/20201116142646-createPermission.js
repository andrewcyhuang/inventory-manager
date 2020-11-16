'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`CREATE TYPE permission_type AS ENUM (
    'VIEW_INVENTORYS', 'VIEW_PRODUCT_LIST', 'VIEW_ANY_ORDER', 'VIEW_EMPLOYEES', 'VIEW_ROLES',
    'VIEW_PERMISSIONS', 'VIEW_ORDER_SHIPMENTS','SUBMIT_PURCHASE_ORDER', 'SUBMIT_RETURN_ORDER',
    'SUBMIT_RESTOCK_ORDER', 'SUBMIT_ANY_ORDER', 'VIEW_INVENTORY_STOCK', 'ADD_EMPLOYEE',
    'REMOVE_EMPLOYEE','UPDATE_EMPLOYEE_ROLE','ADD_PERMISSION_TO_ROLE'
);

CREATE TABLE IF NOT EXISTS permission (
    id integer PRIMARY KEY,
    type permission_type UNIQUE NOT NULL
);`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS permission CASCADE; DROP TYPE permission_type CASCADE;`);
};

exports._meta = {
  "version": 1
};
