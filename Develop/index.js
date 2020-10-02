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
            name: "Table",
            question: "Table of contents for README."
        },
        {
            type: "input",
            name: "Installation",
            question: "What are the steps required to install your project?"
        },
        {
            type: "input",
            name: "Usage",
            question: "Provide instruction and examples for use."
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
            question: "Write tests for your application and provide examples on how to run them."
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
    # ${answers.Title}
    
    ## Description
    ${answers.Description}
    
    ## Table of Contents
    ${answers.Table}
    
    ## Installation
    ${answers.Installation}

    ## Usage
    ${answers.Usage}

    ## License
    ${answers.License}

    ## Contributing 
    ${answers.Tests}

    ## Questions
    ${answers.Questions}
    `;
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
