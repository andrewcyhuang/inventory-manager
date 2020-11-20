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
  INSERT INTO order_shipment VALUES ('1', 14, 'Fedex') ON CONFLICT (tracking_number) DO NOTHING;
  INSERT INTO order_shipment VALUES ('2', 4, 'UPS') ON CONFLICT (tracking_number) DO NOTHING;
  INSERT INTO order_shipment VALUES ('3', 3, 'DHL') ON CONFLICT (tracking_number) DO NOTHING;
  INSERT INTO order_shipment VALUES ('4', 8, 'DHL') ON CONFLICT (tracking_number) DO NOTHING;`);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
