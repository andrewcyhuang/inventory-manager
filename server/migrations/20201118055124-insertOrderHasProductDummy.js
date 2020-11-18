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
  INSERT INTO order_has_product VALUES (1, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (1, '7a2b3c4d5e', 1) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (1, '9a2b3c4d5e', 1) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (2, '9a2b3c4d5e', 1) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (2, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (3, '1a2b7c4d5e', 20) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (3, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (4, '1a2b3c5d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (4, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (5, '8a2b3c4d5e', 1) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (5, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (5, '1a8b3c4d5e', 7) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (5, '1a6b3c4d5e', 1) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (6, '1a7b3c4d5e', 1) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (6, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (7, '6a2b3c4d5e', 2) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (8, '1a6b3c4d5e', 1) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (8, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (8, '1a8b3c4d5e', 1) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (8, '1a2b7c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (9, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (9, '1a6b3c4d5e', 1) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (9, '8a2b3c4d5e', 1) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (10, '1a8b3c4d5e', 2) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (10, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (11, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (12, '9a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (12, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (13, '1a6b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (13, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (13, '9a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (14, '9a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (14, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (14, '1a2b8c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (15, '9a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (15, '6a2b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;
  INSERT INTO order_has_product VALUES (15, '1a6b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;`);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
