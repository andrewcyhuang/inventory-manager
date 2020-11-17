CREATE DATABASE inventoryManager;

CREATE TABLE location ( 
    postal_code char(6) PRIMARY KEY,
    city varchar(30),
    province varchar(30)
);

CREATE TABLE inventory (
    id integer PRIMARY KEY,
    unit integer,
    street varchar(50),
    postal_code char(6) NOT NULL,
    FOREIGN KEY (postal_code) REFERENCES location (postal_code) ON DELETE NO ACTION
);

CREATE TYPE product_type AS ENUM('physical', 'digital');

CREATE TABLE product(
    sku varchar(10) PRIMARY KEY,
    name varchar(50),
    price bigint,
    type product_type NOT NULL, 
    weight decimal(10,2), 
    width decimal(10,2),
    length decimal(10,2),
    height decimal(10,2),
    url varchar(2048)
)​

CREATE TABLE inventory_contains_product (
    inventory_id integer,
    sku varchar(10),
    quantity integer NOT NULL DEFAULT 0,
    PRIMARY KEY (inventory_id, SKU),
    FOREIGN KEY (SKU) REFERENCES product (sku),
    FOREIGN KEY (inventory_id) REFERENCES inventory (id)
);

CREATE TABLE employee (
    id integer PRIMARY KEY,
    sin varchar(9) UNIQUE NOT NULL,
    first_name varchar(30),
    last_name varchar(30),
    email varchar(256),
    phone_number varchar(11),
    role_id integer NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE NO ACTION ON UPDATE CASCADE 
);

CREATE TABLE role (
    id integer,
    name varchar(50) NOT NULL,
    permission_id integer NOT NULL,
    PRIMARY KEY(id, permission_id),
    FOREIGN KEY (permission_id) REFERENCES permission(id) ON DELETE CASCADE
);

CREATE TYPE permission_type AS ENUM (
    'VIEW_INVENTORYS', 'VIEW_PRODUCT_LIST', 'VIEW_ANY_ORDER', 'VIEW_EMPLOYEES', 'VIEW_ROLES',
    'VIEW_PERMISSIONS', 'VIEW_ORDER_SHIPMENTS','SUBMIT_PURCHASE_ORDER', 'SUBMIT_RETURN_ORDER',
    'SUBMIT_RESTOCK_ORDER', 'SUBMIT_ANY_ORDER', 'VIEW_INVENTORY_STOCK', 'ADD_EMPLOYEE',
    'REMOVE_EMPLOYEE','UPDATE_EMPLOYEE_ROLE','ADD_PERMISSION_TO_ROLE'
);

CREATE TABLE permission (
    id integer PRIMARY KEY,
    type permission_type UNIQUE NOT NULL
);

CREATE TYPE order_type AS ENUM ('restock', 'purchase', 'return');

CREATE TABLE orders ( 
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

CREATE TABLE order_has_product ( 
    order_id integer,
    sku varchar(10),
    quantity integer NOT NULL DEFAULT 1,
    PRIMARY KEY (order_id, sku),
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (sku) REFERENCES product (sku) 
);

CREATE TABLE order_shipment ( 
    tracking_number varchar(30) PRIMARY KEY,
    order_id integer NOT NULL,
    shipping_company varchar(30),
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
);

CREATE SEQUENCE seqId START 1;

