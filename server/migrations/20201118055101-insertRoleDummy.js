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
  INSERT INTO role VALUES (1, 'Order Manager', 1) ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('301', 'Purchase_order_assistant', '3321') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('321', 'Return_order_assistant', '4421') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('303', 'Restock_order_assistant','5521') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('456', 'Manager', '1') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('456', 'Manager', '2134') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('456', 'Manager', '7654') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('456', 'Manager', '5453') ON CONFLICT (id) DO NOTHING;`);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
