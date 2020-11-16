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
  return db.runSql(`CREATE TABLE IF NOT EXISTS employee (
    id integer PRIMARY KEY,
    sin varchar(9) UNIQUE NOT NULL,
    first_name varchar(30),
    last_name varchar(30),
    email varchar(256),
    phone_number varchar(11),
    role_id integer NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE NO ACTION ON UPDATE CASCADE 
    );`
  );
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS employee CASCADE;`);
};

exports._meta = {
  "version": 1
};
