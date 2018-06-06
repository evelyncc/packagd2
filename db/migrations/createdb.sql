CREATE TABLE tracking(
  id serial PRIMARY KEY,
  username varchar(20),
  tracking_number varchar(30),
  postal_carrier varchar(10)
);

INSERT INTO tracking (username, tracking_number, postal_carrier)  
VALUES ('evelyn', '9374889676090671173342', 'USPS');

INSERT INTO tracking (username, tracking_number, postal_carrier)  
VALUES ('evelyn', '1ZXX2832YW19841840', 'UPS');