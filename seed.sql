DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE employee (
    id int,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id int,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    Primary key (id) 
);

create table department (
    id INT,
    name VARCHAR(30),
    primary key (id)
);