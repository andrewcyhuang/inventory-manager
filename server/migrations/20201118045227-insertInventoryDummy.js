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
    INSERT INTO inventory
        VALUES (1, '977', 'St Catherins St W', 'H3B4W3')
        ON CONFLICT (id)
        DO NOTHING;
    INSERT INTO inventory
        VALUES (2, '4700', 'Kingsway', 'V5H4N2')
        ON CONFLICT (id)
        DO NOTHING;
    INSERT INTO inventory
        VALUES (3, '220', 'Yonge St', 'M5B2H1')
        ON CONFLICT (id)
        DO NOTHING;
    INSERT INTO inventory
        VALUES (4, '100', 'Spadina Ave', 'M5T3A8')
        ON CONFLICT (id)
        DO NOTHING;
    INSERT INTO inventory
        VALUES (5, '799', 'Robson St', 'V7Y0A2')
        ON CONFLICT (id)
        DO NOTHING;
  `);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
