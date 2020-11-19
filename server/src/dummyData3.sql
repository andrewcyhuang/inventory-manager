INSERT INTO employee
VALUES ('123','900788678','maji','wu','mwu123@company.com', '4169873322', '301');
INSERT INTO employee
VALUES ('124','900788700','candy','zhou','czhou124@company.com', '6043218796', '321');
INSERT INTO employee
VALUES ('125','900790876','alan','wang','awang125@company.com', '6043984400', '303');
INSERT INTO employee
VALUES ('126','900673009','cindy','sun','csun126@company.com', '7789563377', '301');
INSERT INTO employee
VALUES ('127','900123788','tina','liu','tliu127@company.com', '7789563388', '305');


INSERT INTO role
VALUES ('301', 'Purchase_order_assistant', '3321');
INSERT INTO role
VALUES ('321', 'Return_order_assistant', '4421');
INSERT INTO role
VALUES ('303', 'Restock_order_assistant','5521');
INSERT INTO role
VALUES ('456', 'Manager', '5432');
INSERT INTO role
VALUES ('456', 'Manager', '2134');
INSERT INTO role
VALUES ('456', 'Manager', '7654');
INSERT INTO role
VALUES ('456', 'Manager', '5453');


INSERT INTO permission
VALUES ('3321', 'SUBMIT_PURCHASE_ORDER');
INSERT INTO permission
VALUES ('4421', 'SUBMIT_RETURN_ORDER');
INSERT INTO permission
VALUES ('5521', 'SUBMIT_RESTOCK_ORDER');
INSERT INTO permission
VALUES ('5432', 'SUBMIT_ANY_ORDER');
INSERT INTO permission
VALUES ('5453', 'VIEW_ORDERS');
INSERT INTO permission
VALUES ('2134', 'VIEW_INVENTORYS');
INSERT INTO permission
VALUES ('7654', 'VIEW_PRODUCT_LIST');