// Variables

const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "Title",
            question: "What would you like to name the README?"
        },
        {
            type: "input",
            name: "Description",
            question: "What is the description of the application?"
        },
        {
            type: "input",
            name: "Table of Contents",
            question: "Table of contents for application"
        },
        {
            type: "input",
            name: "Installation",
            question: "How do you install the application?"
        },
        {
            type: "input",
            name: "Usage",
            question: "How do you use the application?"
        },
        {
            type: "input",
            name: "License",
            question: "What is the license for the application?"
        },
        {
            type: "input",
            name: "Contributing",
            question: "How can someone make contributions to the application?"
        },
        {
            type: "input",
            name: "Tests",
            question: "?"
        },
        {
            type: "input",
            name: "Questions",
            question: "Any questions?"
        },
    ]);
}

function generateMd(answers) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Document</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Hi! My name is ${answers.name}</h1>
      <p class="lead">I am from ${answers.location}.</p>
      <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
      <ul class="list-group">
        <li class="list-group-item">My GitHub username is ${answers.github}</li>
        <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
      </ul>
    </div>
  </div>
  </body>
  </html>`;
}

promptUser()
    .then(function (answers) {
        const md = generateMd(answers);

        return writeFileAsync("README.md", md);
    })
    .then(function () {
        console.log("Successfully wrote to README.md");
    })
    .catch(function (err) {
        console.log(err);
    });


// // function to write README file
// function writeToFile(fileName, data) {
// }

// // function to initialize program
// function init() {

// }

// // function call to initialize program
// init();
