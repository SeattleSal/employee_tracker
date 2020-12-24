# Note Taker
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Table of Contents
* [Description](#description)
* [Dependencies](#dependencies)
* [Usage](#usage)
* [Links](#links)
* [License](#license)

## Description
Note Taker is an application that can be used to write, save and delete notes. The application uses an Express backend to save and retrieve note data from a JSON file.

## Dependencies
* [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.
* [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.
* [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.
* [ASCII Art Logo](https://www.npmjs.com/package/asciiart-logo)

There is a `package.json` included, the following commands should be run to install dependencies:

```bash
npm i
```
Note the frontend files were provided. 

## Usage
Use the links below to use the application live. If you prefer to run the application from your computer, you can use the following command after installing the dependencies:
```bash
node server.js
```

The application displays a home page, the user can click Get Started button to get to the Notes page. On the Notes page, the user can enter in text for a new note, view a previously saved note or delete a previously saved note. 

See Screenshots:
![Home Page](./assets/img/homepage.JPG)
![Notes Page](./assets/img/notes.JPG)

## Links
* Github Link: https://github.com/SeattleSal/note_taker
* Heroku: https://seattlesal-notes-taker.herokuapp.com/

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