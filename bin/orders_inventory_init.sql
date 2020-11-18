INSERT INTO location VALUES ('H3B4W3', 'Montreal', 'Quebec');
INSERT INTO location VALUES ('V5H4N2', 'Burnaby', 'British Columbia');
INSERT INTO location VALUES ('M5B2H1', 'Toronto', 'Ontario');
INSERT INTO location VALUES ('M5T3A8', 'Toronto', 'Ontario');
INSERT INTO location VALUES ('V7Y0A2', 'Vancouver', 'BC');

INSERT INTO product (sku, name, price, type, url)
    VALUES ('6a2b3c4d5e', 'dItem0', '1899', 'digital', 'www.dummyData.com/a/0');
INSERT INTO product (sku, name, price, type, url)
    VALUES ('7a2b3c4d5e', 'dItem1', '3450', 'digital', 'www.dummyData.com/a/1');
INSERT INTO product (sku, name, price, type, url)
    VALUES ('8a2b3c4d5e', 'dItem2', '10999', 'digital', 'www.dummyData.com/a/2');
INSERT INTO product (sku, name, price, type, url)
    VALUES ('9a2b3c4d5e', 'dItem3', '13500', 'digital', 'www.dummyData.com/a/3');
INSERT INTO product (sku, name, price, type, url)
    VALUES ('1a6b3c4d5e', 'dItem4', '94999', 'digital', 'www.dummyData.com/a/4');
INSERT INTO product (sku, name, price, type, url)
    VALUES ('1a7b3c4d5e', 'dItem5', '2199', 'digital', 'www.dummyData.com/a/5');
INSERT INTO product (sku, name, price, type, url)
    VALUES ('1a8b3c4d5e', 'dItem6', '1299', 'digital', 'www.dummyData.com/a/6');
INSERT INTO product
    VALUES ('1a2b3c4d5e', 'pItem0', '1299', 'physical', '2.48','3.45','2','3');
INSERT INTO product
    VALUES ('1a2b9c4d5e', 'pItem1', '1799', 'physical', '1.48','4.45','1.2','3.4');
INSERT INTO product
    VALUES ('1a2b8c4d5e', 'pItem2', '7299', 'physical', '6.48','4.45','6.2','9');
INSERT INTO product
    VALUES ('1a2b7c4d5e', 'pItem3', '9149', 'physical', '12.48','5.45','9.45','4.3');
INSERT INTO product
    VALUES ('1a2b3c5d5e', 'pItem4', '5799', 'physical', '9.48','2.45','5','4');
INSERT INTO product
    VALUES ('1a2b3c6d5e', 'pItem5', '2750', 'physical', '7.48','4.45','12.12','5');
INSERT INTO product
    VALUES ('1a2b3c3d5e', 'pItem6', '18899', 'physical', '5.71','4.20','16.91','8');

INSERT INTO inventory
    VALUES (1, '977', 'St Catherins St W', 'H3B4W3');
INSERT INTO inventory
    VALUES (2, '4700', 'Kingsway', 'V5H4N2');
INSERT INTO inventory
    VALUES (3, '220', 'Yonge St', 'M5B2H1');
INSERT INTO inventory
    VALUES (4, '100A-241', 'Spadina Ave', 'M5T3A8');
INSERT INTO inventory
    VALUES (5, '799', 'Robson St', 'V7Y0A2');

INSERT INTO inventory_contains_product VALUES (1,'6a2b3c4d5e', 34);
INSERT INTO inventory_contains_product VALUES (1,'7a2b3c4d5e', 4);
INSERT INTO inventory_contains_product VALUES (1,'8a2b3c4d5e', 12);
INSERT INTO inventory_contains_product VALUES (1,'9a2b3c4d5e', 45);
INSERT INTO inventory_contains_product VALUES (1,'1a6b3c4d5e', 3);
INSERT INTO inventory_contains_product VALUES (1,'1a7b3c4d5e', 43);
INSERT INTO inventory_contains_product VALUES (1,'1a8b3c4d5e', 12);
INSERT INTO inventory_contains_product VALUES (1,'1a2b3c4d5e', 76);
INSERT INTO inventory_contains_product VALUES (1,'1a2b9c4d5e', 324);
INSERT INTO inventory_contains_product VALUES (1,'1a2b8c4d5e', 41);
INSERT INTO inventory_contains_product VALUES (1,'1a2b7c4d5e', 54);
INSERT INTO inventory_contains_product VALUES (1,'1a2b3c5d5e', 98);
INSERT INTO inventory_contains_product VALUES (1,'1a2b3c6d5e', 55);
INSERT INTO inventory_contains_product VALUES (1,'1a2b3c3d5e', 3);

INSERT INTO inventory_contains_product VALUES (2,'6a2b3c4d5e', 234);
INSERT INTO inventory_contains_product VALUES (2,'7a2b3c4d5e', 65);
INSERT INTO inventory_contains_product VALUES (2,'8a2b3c4d5e', 3);
INSERT INTO inventory_contains_product VALUES (2,'9a2b3c4d5e', 66);
INSERT INTO inventory_contains_product VALUES (2,'1a6b3c4d5e', 13);
INSERT INTO inventory_contains_product VALUES (2,'1a7b3c4d5e', 5);
INSERT INTO inventory_contains_product VALUES (2,'1a8b3c4d5e', 32);
INSERT INTO inventory_contains_product VALUES (2,'1a2b3c4d5e', 76);
INSERT INTO inventory_contains_product VALUES (2,'1a2b9c4d5e', 43);
INSERT INTO inventory_contains_product VALUES (2,'1a2b8c4d5e', 43);
INSERT INTO inventory_contains_product VALUES (2,'1a2b7c4d5e', 2);
INSERT INTO inventory_contains_product VALUES (2,'1a2b3c5d5e', 56);
INSERT INTO inventory_contains_product VALUES (2,'1a2b3c6d5e', 3);
INSERT INTO inventory_contains_product VALUES (2,'1a2b3c3d5e', 12);

INSERT INTO inventory_contains_product VALUES (3,'6a2b3c4d5e', 32);
INSERT INTO inventory_contains_product VALUES (3,'7a2b3c4d5e', 431);
INSERT INTO inventory_contains_product VALUES (3,'8a2b3c4d5e', 33);
INSERT INTO inventory_contains_product VALUES (3,'9a2b3c4d5e', 34);
INSERT INTO inventory_contains_product VALUES (3,'1a6b3c4d5e', 87);
INSERT INTO inventory_contains_product VALUES (3,'1a7b3c4d5e', 5);
INSERT INTO inventory_contains_product VALUES (3,'1a8b3c4d5e', 8);
INSERT INTO inventory_contains_product VALUES (3,'1a2b3c4d5e', 56);
INSERT INTO inventory_contains_product VALUES (3,'1a2b9c4d5e', 16);
INSERT INTO inventory_contains_product VALUES (3,'1a2b8c4d5e', 4);
INSERT INTO inventory_contains_product VALUES (3,'1a2b7c4d5e', 14);
INSERT INTO inventory_contains_product VALUES (3,'1a2b3c5d5e', 32);
INSERT INTO inventory_contains_product VALUES (3,'1a2b3c6d5e', 76);
INSERT INTO inventory_contains_product VALUES (3,'1a2b3c3d5e', 34);


INSERT INTO orders
    VALUES (1, 1, 'purchase', 1, DEFAULT, 'Carson', 'carson@gmail.com', 'visa', '16723 100ave Vancouver, BC');
INSERT INTO orders
    VALUES (2, 1, 'return', 1, DEFAULT, 'Carson', 'carson@gmail.com', 'visa', '16723 100ave Vancouver, BC');
INSERT INTO orders
    VALUES (3, 1, 'restock', 1, DEFAULT);
INSERT INTO orders
    VALUES (4, 1, 'restock', 1, DEFAULT);
INSERT INTO orders
    VALUES (5, 1, 'purchase', 1, DEFAULT, 'Danny', 'danny@gmail.com', 'debit', '26346 44ave Richmond, BC');
INSERT INTO orders
    VALUES (6, 1, 'purchase', 1, DEFAULT, 'Danny', 'danny@gmail.com', 'debit', '26346 44ave Richmond, BC');
INSERT INTO orders
    VALUES (7, 1, 'return', 3, DEFAULT, 'Danny', 'danny@gmail.com', 'debit', '16723 100ave Vancouver, BC', 'not what I expected.');
INSERT INTO orders
    VALUES (8, 2, 'purchase', 2, DEFAULT, 'Tyler', 'tyler@gmail.com', 'visa', '33123 1ave Langley, BC');
INSERT INTO orders
    VALUES (9, 2, 'purchase', 2, DEFAULT, 'Bryan', 'bryan@gmail.com', 'visa', '54312 23ave Abbotsford, BC');
INSERT INTO orders
    VALUES (10, 2, 'restock', 2, DEFAULT);
INSERT INTO orders
    VALUES (11, 2, 'restock', 2, DEFAULT);
INSERT INTO orders
    VALUES (12, 3, 'purchase', 3, DEFAULT, 'Andy', 'andy@gmail.com', 'paypal');
INSERT INTO orders
    VALUES (13, 3, 'purchase', 3, DEFAULT, 'Dylan', 'dylan@gmail.com', 'visa', '6523 101ave Hope, BC');
INSERT INTO orders
    VALUES (14, 3, 'purchase', 3, DEFAULT, 'Fred', 'fred@gmail.com', 'debit', '24635 36ave Calgary, AB');
INSERT INTO orders
    VALUES (15, 3, 'purchase', 3, DEFAULT, 'Betty', 'betty@gmail.com', 'visa', '45673 87ave Kamloops, BC');

INSERT INTO order_has_product VALUES (1, '6a2b3c4d5e', 3);
INSERT INTO order_has_product VALUES (1, '7a2b3c4d5e', 1);
INSERT INTO order_has_product VALUES (1, '9a2b3c4d5e', 1);
INSERT INTO order_has_product VALUES (2, '9a2b3c4d5e', 1);
INSERT INTO order_has_product VALUES (3, '1a2b7c4d5e', 20);
INSERT INTO order_has_product VALUES (4, '1a2b3c5d5e', 3);
INSERT INTO order_has_product VALUES (5, '8a2b3c4d5e', 1);
INSERT INTO order_has_product VALUES (5, '1a8b3c4d5e', 7);
INSERT INTO order_has_product VALUES (5, '1a6b3c4d5e', 1);
INSERT INTO order_has_product VALUES (6, '1a7b3c4d5e', 1);
INSERT INTO order_has_product VALUES (7, '6a2b3c4d5e', 2);
INSERT INTO order_has_product VALUES (8, '1a6b3c4d5e', 1);
INSERT INTO order_has_product VALUES (8, '1a8b3c4d5e', 1);
INSERT INTO order_has_product VALUES (8, '1a2b7c4d5e', 3);
INSERT INTO order_has_product VALUES (9, '6a2b3c4d5e', 3);
INSERT INTO order_has_product VALUES (9, '1a6b3c4d5e', 1);
INSERT INTO order_has_product VALUES (9, '8a2b3c4d5e', 1);
INSERT INTO order_has_product VALUES (10, '1a8b3c4d5e', 2);
INSERT INTO order_has_product VALUES (11, '6a2b3c4d5e', 3);
INSERT INTO order_has_product VALUES (12, '9a2b3c4d5e', 3);
INSERT INTO order_has_product VALUES (13, '1a6b3c4d5e', 3);
INSERT INTO order_has_product VALUES (13, '9a2b3c4d5e', 3);
INSERT INTO order_has_product VALUES (14, '9a2b3c4d5e', 3);
INSERT INTO order_has_product VALUES (14, '1a2b8c4d5e', 3);
INSERT INTO order_has_product VALUES (15, '9a2b3c4d5e', 3);
INSERT INTO order_has_product VALUES (15, '1a6b3c4d5e', 3);

INSERT INTO order_shipment VALUES ('23454567', 14, 'Fedex');
INSERT INTO order_shipment VALUES ('34564567', 4, 'UPS');
INSERT INTO order_shipment VALUES ('23453456', 3, 'DHL');
INSERT INTO order_shipment VALUES ('87657654', 8, 'DHL');


