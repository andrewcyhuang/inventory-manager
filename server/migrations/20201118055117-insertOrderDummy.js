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
  INSERT INTO orders
    VALUES (1, 1, 'purchase', 1, DEFAULT, 'Carson', 'carson@gmail.com', 'visa', '16723 100ave Vancouver, BC')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (2, 1, 'return', 1, DEFAULT, 'Carson', 'carson@gmail.com', 'visa', '16723 100ave Vancouver, BC')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (3, 1, 'restock', 1, DEFAULT)
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (4, 1, 'restock', 1, DEFAULT)
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (5, 1, 'purchase', 1, DEFAULT, 'Danny', 'danny@gmail.com', 'debit', '26346 44ave Richmond, BC')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (6, 1, 'purchase', 1, DEFAULT, 'Danny', 'danny@gmail.com', 'debit', '26346 44ave Richmond, BC')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (7, 1, 'return', 3, DEFAULT, 'Danny', 'danny@gmail.com', 'debit', '16723 100ave Vancouver, BC', 'not what I expected.')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (8, 2, 'purchase', 2, DEFAULT, 'Tyler', 'tyler@gmail.com', 'visa', '33123 1ave Langley, BC')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (9, 2, 'purchase', 2, DEFAULT, 'Bryan', 'bryan@gmail.com', 'visa', '54312 23ave Abbotsford, BC')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (10, 2, 'restock', 2, DEFAULT)
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (11, 2, 'restock', 2, DEFAULT)
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (12, 3, 'purchase', 3, DEFAULT, 'Andy', 'andy@gmail.com', 'paypal')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (13, 3, 'purchase', 3, DEFAULT, 'Dylan', 'dylan@gmail.com', 'visa', '6523 101ave Hope, BC')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (14, 3, 'purchase', 3, DEFAULT, 'Fred', 'fred@gmail.com', 'debit', '24635 36ave Calgary, AB')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO orders
    VALUES (15, 3, 'purchase', 3, DEFAULT, 'Betty', 'betty@gmail.com', 'visa', '45673 87ave Kamloops, BC')
    ON CONFLICT (id) DO NOTHING;`);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
