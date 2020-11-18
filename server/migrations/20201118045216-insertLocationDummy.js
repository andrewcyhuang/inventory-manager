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
    INSERT INTO location VALUES ('H3B4W3', 'Montreal', 'Quebec') ON CONFLICT (postal_code) DO NOTHING;
    INSERT INTO location VALUES ('V5H4N2', 'Burnaby', 'British Columbia') ON CONFLICT (postal_code) DO NOTHING;
    INSERT INTO location VALUES ('M5B2H1', 'Toronto', 'Ontario') ON CONFLICT (postal_code) DO NOTHING;
    INSERT INTO location VALUES ('M5T3A8', 'Toronto', 'Ontario') ON CONFLICT (postal_code) DO NOTHING;
    INSERT INTO location VALUES ('V7Y0A2', 'Vancouver', 'BC') ON CONFLICT (postal_code) DO NOTHING;
  `);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
