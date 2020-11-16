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
  return db.runSql(`CREATE TABLE IF NOT EXISTS inventory_contains_product (
    inventory_id integer,
    sku varchar(10),
    quantity integer NOT NULL DEFAULT 0,
    PRIMARY KEY (inventory_id, sku),
    FOREIGN KEY (sku) REFERENCES product (sku),
    FOREIGN KEY (inventory_id) REFERENCES inventory (id)
);`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS inventory_contains_product CASCADE`);
};

exports._meta = {
  "version": 1
};
