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
  return db.runSql(`CREATE TABLE IF NOT EXISTS order_shipment ( 
    tracking_number varchar(30) PRIMARY KEY,
    order_id integer NOT NULL,
    shipping_company varchar(30),
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
    );`
  );
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS order_shipment CASCADE;`);
};

exports._meta = {
  "version": 1
};
