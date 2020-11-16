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
  return db.runSql(`CREATE TABLE IF NOT EXISTS inventory (
    id integer PRIMARY KEY,
    unit integer,
    street varchar(50),
    postal_code char(6) NOT NULL,
    FOREIGN KEY (postal_code) REFERENCES location (postal_code) ON DELETE NO ACTION);`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS inventory CASCADE;`);
};

exports._meta = {
  "version": 1
};
