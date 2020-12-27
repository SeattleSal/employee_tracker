DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

create table department (
    id INT unsigned AUTO_INCREMENT primary key,
    name VARCHAR(30) UNIQUE NOT NULL 
);

CREATE TABLE role (
    id int unsigned AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL unsigned NOT NULL,
    department_id INT unsigned NOT NULL,
    index dep_ind (department_id),
    constraint fk_department foreign key (department_id) references department(id) on delete CASCADE 
);

CREATE TABLE employee (
    id int unsigned AUTO_INCREMENT PRIMARY KEY ,
    first_name VARCHAR(30) NOT NULL ,
    last_name VARCHAR(30) NOT NULL ,
    role_id INT UNSIGNED NOT NULL ,
    INDEX role_ind (role_id),
    constraint fk_role FOREIGN KEY (role_id) references role(id) on delete cascade,
    manager_id INT unsigned,
    index man_ind (manager_id),
    constraint fk_manager FOREIGN KEY (manager_id) references employee(id) on delete set null
);