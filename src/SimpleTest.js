function findWikiTitle(browserName) {

const { remote } = require('webdriverio');
const assert = require('assert');
const { getElementText, takeScreenshot, scrollToBottom, startBrowser, scrollToHeight } = require('./utils');

describe('Wikipedia Test', function () {
    this.timeout(30000); // Set a timeout of 30 seconds for the test

    let browser
    let browsers = ['chrome', 'firefox']; // List of browsers to test
    // You can loop through the browsers array to run the test in different browsers

    // beforeEach(async function() {
    //     // browser = await remote({
    //     //     logLevel: 'error',
    //     //     path: '/',
    //     //     capabilities: {
    //     //         browserName: 'chrome'
    //     //     }
    //     // });
    //     // browsers.map(async (browserName) => {
    //     //     browser = await startBrowser(browserName);
    //     // });
    //     browser = await startBrowser('chrome');
    // });


    // create a function to close the browser session after each test

    // async function closeBrowserSession() {
    //     if (browser) {
    //         await browser.deleteSession();
    //     }
    // };

    // afterEach(async function () {
    //     // Close the browser session after each test
    //     await closeBrowserSession();
    // });

    // browsers.forEach(function (browserName) {
        it('should work in', async() => {
            try {

                browser = await startBrowser(browserName);

                await browser.url('https://www.wikipedia.org'); // Added missing navigation

                let title = await browser.getTitle();
                console.log('Title is: ' + title);
                assert.equal(title, 'Wikipedia');

                let searchBox = await browser.$('input[name="search"]');
                await searchBox.setValue('test automation');
                await browser.keys('Enter');

                await browser.$('span.mw-page-title-main').waitForExist({ timeout: 20000 });
                let pageTitle = await browser.$('span.mw-page-title-main');
                let newTitle = await pageTitle.getText();
                console.log('New Title is: ' + newTitle);
                assert.equal(newTitle, 'Test automation', 'Page title did not match expected value');

                // an example of how to use relative locators by using the elements text
                // This is a relative locator that finds an element relative to another element
                // For example, finding an element relative to the h1 element
                // Note: Relative locators are not supported in all browsers, so this may not work in all cases
                // the text in this case is 23 languages, so it will find the element with that text, the element type is input
                // and the element is relative to the h1 element with the text 23 languages
                // This is a relative locator that finds an element relative to another element


                let relativeElement = await browser.$('input[aria-label="Go to an article in another language. Available in 23 languages"]');
                await relativeElement.waitForExist({ timeout: 5000 });
                await relativeElement.scrollIntoView();
                await relativeElement.click();
                console.log('Relative Element Found', relativeElement);
                let ariaLabel = await relativeElement.getAttribute('aria-label');

                console.log('Relative Element Text: ' + ariaLabel);
                assert.equal(ariaLabel, 'Go to an article in another language. Available in 23 languages', 'Relative element text did not match expected value');

                // await scrollToBottom(browser);
                await scrollToHeight(browser, 200);
            } catch (error) {
                console.log('Error, whoops!: ' + error);
                await takeScreenshot(browser, 'error.png');
                throw error; // Re-throw the error to ensure the test fails
            }
            finally {
            if (browser) {
                await browser.deleteSession();
            }
        }
        });
    // });

    // use tdd to try the test in different browsers

});
}
module.exports = { findWikiTitle };