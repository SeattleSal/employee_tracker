USE employeesDB;

insert into department (name)
values ('Sales'),
('Finance'),
('Human Resources'),
('Quality Assurance');

insert into role (title, salary, department_id)
values('Branch Manager', 100000, 1),
('Salesperson', 80000,1),
('Receptionist', 55000, 1),
('Head of Accounting', 80000, 2),
('Accountant', 60000, 2),
('HR Representative', 80000, 3),
('Quality Assurance Director', 100000, 4);

insert into employee (first_name, last_name, role_id, manager_id)
values
('Michael', 'Scott', 1, null),
('Jim', 'Halpert', 2, 1),
('Dwight', 'Schrute', 2, 1),
('Pam', 'Beesly', 3, null),
('Angela', 'Martin', 4, null),
('Kevin', 'Malone', 5, 5),
('Oscar', 'Martinez', 5, 5),
('Toby', 'Flenderson', 6, null),
('Creed', 'Bratton', 7, null);