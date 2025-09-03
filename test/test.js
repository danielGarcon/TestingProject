const { startBrowser } = require('./utils');
const { findWikiTitle } = require('./SimpleTest');
const browsers = ['chrome', 'firefox']; // List of browsers to test

describe('Wikipedia Title Test', () => {
    browsers.forEach(function (browserName) {
        it(`should find the Wikipedia title and search for Automation Testing in ${browserName}`, async () => {
            // const browser = await startBrowser(browserName);
            // // navigate to the Wikipedia page
            // await browser.url('https://www.wikipedia.org'); // Added missing navigation
            await findWikiTitle(browserName);
        });
    });
});




// Structure Overview
// Test Implementation File (SimpleTest.js): This file contains the actual test logic and functions. 
// For example, SimpleTest.js contains the findWikiTitle function.


// I'm using the selenium webdriver for automation
// WebDriverIO acts as a wrapper around Selenium WebDriver, providing a more modern and user-friendly API.
// Webdriver allows you to sctuakky interat with elements on the page, navigate to different pages, and perform actions like clicking and typing.
// Test Definition File (test.js): This file uses a test framework like Mocha to define and run the tests.
//  It imports the test functions from SimpleTest.js and uses Mocha's describe and it blocks to structure the tests.

// WebDriverIO Configuration File (wdio.conf.js): This file configures WebDriverIO to run the tests.
//  It specifies the test files to run, the browser to use, and other settings.




// Summary of Your Setup

// Selenium WebDriver:
// _________________________
// Used for browser automation.
// Provides the capabilities to interact with web elements, navigate pages, and perform actions like clicking and typing.


// Mocha:
// _________________________

// A JavaScript test framework used to define and run tests.
// Provides describe and it blocks to structure your tests.
// It also provides syntax for assertions and hooks like before and after.


// WebDriverIO:
// _________________________

// A wrapper around Selenium WebDriver that simplifies the API and provides additional features.
// Integrates with Mocha to run tests, and allows you to interact with web elements using a more modern API.