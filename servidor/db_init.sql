CREATE TABLE contact (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    message VARCHAR(1000) NOT NULL,
    status VARCHAR(50) NOT NULL,
    response VARCHAR (500),
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
   username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
   password VARCHAR(100) NOT NULL,
   firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

insert into users (username,email,password,fristname,lastname) values ('admin','admin@caixirito.pt','admin','admin','admin');






