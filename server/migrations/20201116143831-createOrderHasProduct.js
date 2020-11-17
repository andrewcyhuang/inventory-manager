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
  return db.runSql(`CREATE TABLE IF NOT EXISTS order_has_product ( 
    order_id integer,
    sku varchar(10),
    quantity integer NOT NULL DEFAULT 1, PRIMARY KEY (order_id, sku),
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (sku) REFERENCES product (sku) 
    );`
  );
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS order_has_product CASCADE;`);
};

exports._meta = {
  "version": 1
};
