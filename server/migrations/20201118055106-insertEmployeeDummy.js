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
    INSERT INTO employee
      VALUES (1, '238501352', 'Justin', 'Mann', 'mann@gmail.com', '6047762991', 1)
      ON CONFLICT (id) DO NOTHING;
    INSERT INTO employee
      VALUES (2, '154346352', 'Homer', 'Smith', 'smith@gmail.com', '7782136991', 1)
      ON CONFLICT (id) DO NOTHING;
    INSERT INTO employee
      VALUES (3, '321457352', 'Karen', 'Holmes', 'holmes@gmail.com', '7783996991', 1)
      ON CONFLICT (id) DO NOTHING;
    INSERT INTO employee 
      VALUES ('4','900788678','maji','wu','mwu123@company.com', '4169873322', '2')
      ON CONFLICT (id) DO NOTHING;
    INSERT INTO employee
      VALUES ('5','900788700','candy','zhou','czhou124@company.com', '6043218796', '3')
      ON CONFLICT (id) DO NOTHING;
    INSERT INTO employee
      VALUES ('6','900790876','alan','wang','awang125@company.com', '6043984400', '4')
      ON CONFLICT (id) DO NOTHING;
    INSERT INTO employee
      VALUES ('7','900673009','cindy','sun','csun126@company.com', '7789563377', '3')
      ON CONFLICT (id) DO NOTHING;
    INSERT INTO employee
      VALUES ('8','900123788','tina','liu','tliu127@company.com', '7789563388', '5')
      ON CONFLICT (id) DO NOTHING;`);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
