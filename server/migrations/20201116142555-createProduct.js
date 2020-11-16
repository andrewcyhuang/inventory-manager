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
  return db.runSql(`CREATE TYPE product_type AS ENUM('physical', 'digital');
  CREATE TABLE IF NOT EXISTS product (
    sku varchar(10) PRIMARY KEY,
    name varchar(50),
    price bigint,
    type product_type NOT NULL,
    weight decimal(10,2),
    width decimal(10,2),
    length decimal(10,2),
    height decimal(10,2),
    url varchar(2048)
  );`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS product CASCADE; 
    DROP TYPE product_type CASCADE`);
};

exports._meta = {
  "version": 1
};
