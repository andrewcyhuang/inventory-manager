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
  INSERT INTO role VALUES ('2', 'Purchase_order_assistant', '2') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('3', 'Return_order_assistant', '3') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('4', 'Restock_order_assistant','4') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('5', 'Manager', '1') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('5', 'Manager', '6') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('5', 'Manager', '7') ON CONFLICT (id) DO NOTHING;
  INSERT INTO role VALUES ('5', 'Manager', '5') ON CONFLICT (id) DO NOTHING;`);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
