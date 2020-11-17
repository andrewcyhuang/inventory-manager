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
  return db.runSql(`CREATE TYPE order_type AS ENUM ('restock', 'purchase', 'return');

  CREATE TABLE IF NOT EXISTS orders ( 
      id integer PRIMARY KEY,
      inventory_id integer,
      type order_type NOT NULL,
      employee_id integer NOT NULL,
      datetime timestamp DEFAULT NOW(),
      customer_name varchar(30),
      customer_email varchar(30),
      customer_payment_type varchar(30),
      customer_address varchar(95),
      reason varchar(300),
      FOREIGN KEY (inventory_id) REFERENCES inventory(id),
      FOREIGN KEY (employee_id) REFERENCES employee(id)
      );`
    );
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS order CASCADE; DROP TYPE order_type CASCADE;`);
};

exports._meta = {
  "version": 1
};
