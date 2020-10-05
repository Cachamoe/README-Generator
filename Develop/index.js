// Variables
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);

// Array of questions for user
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
            name: "Installation",
            question: "What are the steps required to install your project?"
        },
        {
            type: "input",
            name: "Usage",
            question: "Provide instruction and examples for use."
        },
        {
            type: "list",
            name: "License",
            question: "What is the license for the application?",
            choices: [
                "MIT",
                "APACHE 2.0",
                "GPL 3.0",
                "BSD 3",
                "None",
            ]
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
            name: "GitHub",
            question: "What is your GitHub username?"
        },
        {
            type: "input",
            name: "Email",
            question: "What is your email address?"
        },
    ]);
}

// Function for inputing user answers into new README file
function generateMd(answers) {
    return `
# ${answers.Title}

## Description
${answers.Description}

## Table of Contents
1) [Installation](##installation)
2) [Usage](##usage)
3) [License](##license)
4) [Contributing](##contributing)
5) [Tests](##tests)
6) [Questions](##questions)

## Installation
${answers.Installation}

## Usage
${answers.Usage}

## License
${answers.License === "MIT" ? "[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)" :
            answers.License === "APACHE 2.0" ? "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)" :
                answers.License === "GPL 3.0" ? "[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)" :
                    answers.License === "BSD 3" ? "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)" :
                        ""}
## Contributing 
${answers.Contributing}

## Tests
${answers.Tests}

## Questions
GitHub Profile: ${answers.GitHubProfile} <br>
Email: ${answers.Email}
`;
}

// Function for generating new README file
promptUser()
    .then(function (answers) {
        axios.get("https://api.github.com/users/" + answers.GitHub).then(function (response) {
            answers.GitHubProfile = response.data.html_url;
            const md = generateMd(answers);

            return writeFileAsync("README.md", md);
        })
    })
    .then(function () {
        console.log("Successfully wrote to README.md");
    })
    .catch(function (err) {
        console.log(err);
    });
