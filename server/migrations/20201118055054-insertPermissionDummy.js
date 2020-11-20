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
  return db.runSql(`
  INSERT INTO permission VALUES (1, 'SUBMIT_ANY_ORDER') ON CONFLICT (id) DO NOTHING;
  INSERT INTO permission VALUES ('2', 'SUBMIT_PURCHASE_ORDER') ON CONFLICT (id) DO NOTHING;
  INSERT INTO permission VALUES ('3', 'SUBMIT_RETURN_ORDER') ON CONFLICT (id) DO NOTHING;
  INSERT INTO permission VALUES ('4', 'SUBMIT_RESTOCK_ORDER') ON CONFLICT (id) DO NOTHING;
  INSERT INTO permission VALUES ('5', 'VIEW_ANY_ORDER') ON CONFLICT (id) DO NOTHING;
  INSERT INTO permission VALUES ('6', 'VIEW_INVENTORYS') ON CONFLICT (id) DO NOTHING;
  INSERT INTO permission VALUES ('7', 'VIEW_PRODUCT_LIST') ON CONFLICT (id) DO NOTHING;`);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
