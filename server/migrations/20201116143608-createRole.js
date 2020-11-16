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
  return db.runSql(`CREATE TABLE IF NOT EXISTS role (
    id integer PRIMARY KEY,
    name varchar(50) NOT NULL,
    permission_id integer NOT NULL,
    FOREIGN KEY (permission_id) REFERENCES permission(id) ON DELETE CASCADE
    );`
  );
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS role CASCADE;`);
};

exports._meta = {
  "version": 1
};
