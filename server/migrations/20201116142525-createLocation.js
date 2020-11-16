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
  return db.runSql(`CREATE TABLE IF NOT EXISTS location ( 
    postal_code char(6) PRIMARY KEY,
    city varchar(30),
    province varchar(30));`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS location CASCADE;`);
};

exports._meta = {
  "version": 1
};
