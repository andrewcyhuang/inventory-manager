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
    INSERT INTO inventory_contains_product VALUES (1,'6a2b3c4d5e', 34) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'7a2b3c4d5e', 4) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'8a2b3c4d5e', 12) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'9a2b3c4d5e', 45) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'1a6b3c4d5e', 3) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'1a7b3c4d5e', 43) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'1a8b3c4d5e', 12) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'1a2b3c4d5e', 76) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'1a2b9c4d5e', 324) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'1a2b8c4d5e', 41) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'1a2b7c4d5e', 54) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'1a2b3c5d5e', 98) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'1a2b3c6d5e', 55) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (1,'1a2b3c3d5e', 3) ON CONFLICT (inventory_id, sku) DO NOTHING;

    INSERT INTO inventory_contains_product VALUES (2,'6a2b3c4d5e', 234) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'7a2b3c4d5e', 65) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'8a2b3c4d5e', 3) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'9a2b3c4d5e', 66) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'1a6b3c4d5e', 13) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'1a7b3c4d5e', 5) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'1a8b3c4d5e', 32) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'1a2b3c4d5e', 76) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'1a2b9c4d5e', 43) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'1a2b8c4d5e', 43) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'1a2b7c4d5e', 2) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'1a2b3c5d5e', 56) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'1a2b3c6d5e', 3) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (2,'1a2b3c3d5e', 12) ON CONFLICT (inventory_id, sku) DO NOTHING;

    INSERT INTO inventory_contains_product VALUES (3,'6a2b3c4d5e', 32) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'7a2b3c4d5e', 431) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'8a2b3c4d5e', 33) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'9a2b3c4d5e', 34) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'1a6b3c4d5e', 87) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'1a7b3c4d5e', 5) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'1a8b3c4d5e', 8) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'1a2b3c4d5e', 56) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'1a2b9c4d5e', 16) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'1a2b8c4d5e', 4) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'1a2b7c4d5e', 14) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'1a2b3c5d5e', 32) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'1a2b3c6d5e', 76) ON CONFLICT (inventory_id, sku) DO NOTHING;
    INSERT INTO inventory_contains_product VALUES (3,'1a2b3c3d5e', 34) ON CONFLICT (inventory_id, sku) DO NOTHING;`);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
