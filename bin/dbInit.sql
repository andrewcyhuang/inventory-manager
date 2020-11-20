/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Table set up queries ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
CREATE TABLE IF NOT EXISTS location ( 
    postal_code char(6) PRIMARY KEY,
    city varchar(30),
    province varchar(30)
);

CREATE TABLE IF NOT EXISTS inventory (
    id integer PRIMARY KEY,
    unit integer,
    street varchar(50),
    postal_code char(6) NOT NULL,
    FOREIGN KEY (postal_code) REFERENCES location (postal_code) ON DELETE NO ACTION
);

CREATE TYPE product_type AS ENUM('physical', 'digital');
  CREATE TABLE IF NOT EXISTS product (
    sku varchar(10) PRIMARY KEY,
    name varchar(50),
    price bigint,
    type product_type NOT NULL,
    weight decimal(10,2),
    width decimal(10,2),
    length decimal(10,2),
    height decimal(10,2),
    url varchar(2048)
);

CREATE TABLE IF NOT EXISTS inventory_contains_product (
    inventory_id integer,
    sku varchar(10),
    quantity integer NOT NULL DEFAULT 0,
    PRIMARY KEY (inventory_id, sku),
    FOREIGN KEY (sku) REFERENCES product (sku),
    FOREIGN KEY (inventory_id) REFERENCES inventory (id)
);

CREATE TYPE permission_type AS ENUM (
    'VIEW_INVENTORYS', 'VIEW_PRODUCT_LIST', 'VIEW_ANY_ORDER', 'VIEW_EMPLOYEES', 'VIEW_ROLES',
    'VIEW_PERMISSIONS', 'VIEW_ORDER_SHIPMENTS','SUBMIT_PURCHASE_ORDER', 'SUBMIT_RETURN_ORDER',
    'SUBMIT_RESTOCK_ORDER', 'SUBMIT_ANY_ORDER', 'VIEW_INVENTORY_STOCK', 'ADD_EMPLOYEE',
    'REMOVE_EMPLOYEE','UPDATE_EMPLOYEE_ROLE','ADD_PERMISSION_TO_ROLE'
);

CREATE TABLE IF NOT EXISTS permission (
    id integer PRIMARY KEY,
    type permission_type UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
    id integer PRIMARY KEY,
    name varchar(50) NOT NULL,
    permission_id integer NOT NULL,
    FOREIGN KEY (permission_id) REFERENCES permission(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employee (
    id integer PRIMARY KEY,
    sin varchar(9) UNIQUE NOT NULL,
    first_name varchar(30),
    last_name varchar(30),
    email varchar(256),
    phone_number varchar(11),
    role_id integer NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE NO ACTION ON UPDATE CASCADE 
);

CREATE TYPE order_type AS ENUM ('restock', 'purchase', 'return');

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
);

CREATE TABLE IF NOT EXISTS order_has_product ( 
    order_id integer,
    sku varchar(10),
    quantity integer NOT NULL DEFAULT 1, PRIMARY KEY (order_id, sku),
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (sku) REFERENCES product (sku) 
);

CREATE TABLE IF NOT EXISTS order_shipment ( 
    tracking_number varchar(30) PRIMARY KEY,
    order_id integer NOT NULL,
    shipping_company varchar(30),
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Dummy data insertion queries ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

INSERT INTO location VALUES ('H3B4W3', 'Montreal', 'Quebec') ON CONFLICT (postal_code) DO NOTHING;
INSERT INTO location VALUES ('V5H4N2', 'Burnaby', 'British Columbia') ON CONFLICT (postal_code) DO NOTHING;
INSERT INTO location VALUES ('M5B2H1', 'Toronto', 'Ontario') ON CONFLICT (postal_code) DO NOTHING;
INSERT INTO location VALUES ('M5T3A8', 'Toronto', 'Ontario') ON CONFLICT (postal_code) DO NOTHING;
INSERT INTO location VALUES ('V7Y0A2', 'Vancouver', 'BC') ON CONFLICT (postal_code) DO NOTHING;

INSERT INTO inventory VALUES (1, '977', 'St Catherins St W', 'H3B4W3') ON CONFLICT (id) DO NOTHING;
INSERT INTO inventory VALUES (2, '4700', 'Kingsway', 'V5H4N2') ON CONFLICT (id) DO NOTHING;
INSERT INTO inventory VALUES (3, '220', 'Yonge St', 'M5B2H1') ON CONFLICT (id) DO NOTHING;
INSERT INTO inventory VALUES (4, '100', 'Spadina Ave', 'M5T3A8') ON CONFLICT (id) DO NOTHING;
INSERT INTO inventory VALUES (5, '799', 'Robson St', 'V7Y0A2') ON CONFLICT (id) DO NOTHING;

INSERT INTO product
    VALUES ('6a2b3c4d5e', 'dItem0', '1899', 'digital', 'www.dummyData.com/a/0')
    ON CONFLICT (sku) DO NOTHING;
INSERT INTO product
    VALUES ('7a2b3c4d5e', 'dItem1', '3450', 'digital', 'www.dummyData.com/a/1')
    ON CONFLICT (sku) DO NOTHING;
INSERT INTO product
    VALUES ('8a2b3c4d5e', 'dItem2', '10999', 'digital', 'www.dummyData.com/a/2')
    ON CONFLICT (sku) DO NOTHING;
INSERT INTO product
    VALUES ('9a2b3c4d5e', 'dItem3', '13500', 'digital', 'www.dummyData.com/a/3')
    ON CONFLICT (sku) DO NOTHING;
INSERT INTO product
    VALUES ('1a6b3c4d5e', 'dItem4', '94999', 'digital', 'www.dummyData.com/a/4')
    ON CONFLICT (sku) DO NOTHING;
INSERT INTO product
    VALUES ('1a7b3c4d5e', 'dItem5', '2199', 'digital', 'www.dummyData.com/a/5')
    ON CONFLICT (sku) DO NOTHING;
INSERT INTO product
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
    ON CONFLICT (sku) DO NOTHING;

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
INSERT INTO inventory_contains_product VALUES (3,'1a2b3c3d5e', 34) ON CONFLICT (inventory_id, sku) DO NOTHING;

INSERT INTO permission VALUES (1, 'SUBMIT_ANY_ORDER') ON CONFLICT (id) DO NOTHING;
INSERT INTO permission VALUES ('3321', 'SUBMIT_PURCHASE_ORDER') ON CONFLICT (id) DO NOTHING;
INSERT INTO permission VALUES ('4421', 'SUBMIT_RETURN_ORDER') ON CONFLICT (id) DO NOTHING;
INSERT INTO permission VALUES ('5521', 'SUBMIT_RESTOCK_ORDER') ON CONFLICT (id) DO NOTHING;
INSERT INTO permission VALUES ('5453', 'VIEW_ANY_ORDER') ON CONFLICT (id) DO NOTHING;
INSERT INTO permission VALUES ('2134', 'VIEW_INVENTORYS') ON CONFLICT (id) DO NOTHING;
INSERT INTO permission VALUES ('7654', 'VIEW_PRODUCT_LIST') ON CONFLICT (id) DO NOTHING;

INSERT INTO role VALUES (1, 'Order Manager', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO role VALUES ('301', 'Purchase_order_assistant', '3321') ON CONFLICT (id) DO NOTHING;
INSERT INTO role VALUES ('321', 'Return_order_assistant', '4421') ON CONFLICT (id) DO NOTHING;
INSERT INTO role VALUES ('303', 'Restock_order_assistant','5521') ON CONFLICT (id) DO NOTHING;
INSERT INTO role VALUES ('456', 'Manager', '1') ON CONFLICT (id) DO NOTHING;
INSERT INTO role VALUES ('456', 'Manager', '2134') ON CONFLICT (id) DO NOTHING;
INSERT INTO role VALUES ('456', 'Manager', '7654') ON CONFLICT (id) DO NOTHING;
INSERT INTO role VALUES ('456', 'Manager', '5453') ON CONFLICT (id) DO NOTHING;

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
    VALUES ('123','900788678','maji','wu','mwu123@company.com', '4169873322', '301')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO employee
    VALUES ('124','900788700','candy','zhou','czhou124@company.com', '6043218796', '321')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO employee
    VALUES ('125','900790876','alan','wang','awang125@company.com', '6043984400', '303')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO employee
    VALUES ('126','900673009','cindy','sun','csun126@company.com', '7789563377', '301')
    ON CONFLICT (id) DO NOTHING;
INSERT INTO employee
    VALUES ('127','900123788','tina','liu','tliu127@company.com', '7789563388', '456')
    ON CONFLICT (id) DO NOTHING;

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
    ON CONFLICT (id) DO NOTHING;

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
INSERT INTO order_has_product VALUES (15, '1a6b3c4d5e', 3) ON CONFLICT (order_id, sku) DO NOTHING;

INSERT INTO order_shipment VALUES ('23454567', 14, 'Fedex') ON CONFLICT (tracking_number) DO NOTHING;
INSERT INTO order_shipment VALUES ('34564567', 4, 'UPS') ON CONFLICT (tracking_number) DO NOTHING;
INSERT INTO order_shipment VALUES ('23453456', 3, 'DHL') ON CONFLICT (tracking_number) DO NOTHING;
INSERT INTO order_shipment VALUES ('87657654', 8, 'DHL') ON CONFLICT (tracking_number) DO NOTHING;