# Employee Tracker
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Table of Contents
* [Description](#description)
* [Dependencies](#dependencies)
* [Usage](#usage)
* [Links](#links)
* [License](#license)

## Description
Employee Tracker is a **C**ontent **M**anagement **S**ystems for managing a company's employees, roles and departments. It utilizes node, inquirer and MySQL and is a command line application.

## Dependencies
* [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.
* [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.
* [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.
* [ASCII Art Logo](https://www.npmjs.com/package/asciiart-logo)

There is a `package.json` included, the following commands should be run to install dependencies:

```bash
npm i
```

## Database
The application uses a MySQL database. A schema.sql and seeds.sql file are provided. 
![Database Schema](assets/schema.png)

## Usage
Run the application from your computer using the following command after installing the dependencies:
```bash
node index.js
```

The application displays a logo, then options for the user to choose including:
  * Add departments, roles, employees
  * View departments, roles, employees
  * Update employee roles
  * Update employee managers - any employee can be a manager but an employee cannot be their own manager
  * View employees by manager
  * Delete departments - will delete all roles and employees associated with department
  * Delete roles - will delete all employees associated with role
  * Delete employees - if employee was manager, their employees will have null for manager id
  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

See Screenshots and click for video:

[![Employee Summary Walkthrough](./assets/video_gif.gif)](https://drive.google.com/file/d/1B3P_wJjEnPmHWFPjslLiUh6WFILuFzqU/view)

## Links
* Github Link: https://github.com/SeattleSal/employee_tracker

## License

MIT License

Copyright (c) [2020] [Sally Perez]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.