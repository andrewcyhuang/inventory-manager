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
    INSERT INTO product (sku, name, price, type, url)
        VALUES ('6a2b3c4d5e', 'dItem0', '1899', 'digital', 'www.dummyData.com/a/0')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product (sku, name, price, type, url)
        VALUES ('7a2b3c4d5e', 'dItem1', '3450', 'digital', 'www.dummyData.com/a/1')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product (sku, name, price, type, url)
        VALUES ('8a2b3c4d5e', 'dItem2', '10999', 'digital', 'www.dummyData.com/a/2')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product (sku, name, price, type, url)
        VALUES ('9a2b3c4d5e', 'dItem3', '13500', 'digital', 'www.dummyData.com/a/3')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product (sku, name, price, type, url)
        VALUES ('1a6b3c4d5e', 'dItem4', '94999', 'digital', 'www.dummyData.com/a/4')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product (sku, name, price, type, url)
        VALUES ('1a7b3c4d5e', 'dItem5', '2199', 'digital', 'www.dummyData.com/a/5')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product (sku, name, price, type, url)
        VALUES ('1a8b3c4d5e', 'dItem6', '1299', 'digital', 'www.dummyData.com/a/6')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product
        VALUES ('1a2b3c4d5e', 'pItem0', '1299', 'physical', '2.48','3.45','2','3')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product
        VALUES ('1a2b9c4d5e', 'pItem1', '1799', 'physical', '1.48','4.45','1.2','3.4')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product
        VALUES ('1a2b8c4d5e', 'pItem2', '7299', 'physical', '6.48','4.45','6.2','9')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product
        VALUES ('1a2b7c4d5e', 'pItem3', '9149', 'physical', '12.48','5.45','9.45','4.3')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product
        VALUES ('1a2b3c5d5e', 'pItem4', '5799', 'physical', '9.48','2.45','5','4')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product
        VALUES ('1a2b3c6d5e', 'pItem5', '2750', 'physical', '7.48','4.45','12.12','5')
        ON CONFLICT (sku) DO NOTHING;
    INSERT INTO product
        VALUES ('1a2b3c3d5e', 'pItem6', '18899', 'physical', '5.71','4.20','16.91','8')
        ON CONFLICT (sku) DO NOTHING;`);
    };

    exports.down = function(db) {
      return null;
    };

    exports._meta = {
      "version": 1
    };
