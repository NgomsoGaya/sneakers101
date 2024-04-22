CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE shoes (
    shoe_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    color VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    instock INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    size varchar(50)
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    shoe_id INT REFERENCES shoes(shoe_id),
    user_id INT REFERENCES users(id),
    quantity INT NOT NULL,
    FOREIGN KEY (shoe_id) REFERENCES shoes(shoe_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
