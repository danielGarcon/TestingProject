const fs = require('fs').promises;
const { remote } = require('webdriverio');

// Get the text of an element using WebdriverIO
async function getElementText(browser, selector) {
    if (!browser || !selector) {
        throw new Error('Browser and selector are required');
    }
    const element = await browser.$(selector);
    return await element.getText();
}

// Get the count of elements matching a selector using WebdriverIO
async function getElementCount(browser, selector) {
    if (!browser || !selector) {
        throw new Error('Browser and selector are required');
    }
    const elements = await browser.$$(selector);
    return elements.length;
}

// Take a screenshot using WebdriverIO
async function takeScreenshot(browser, filename) {
    if (!browser || !filename) {
        throw new Error('Browser and filename are required');
    }
    try {
        await browser.saveScreenshot(filename);
    } catch (err) {
        console.error('Error taking screenshot:', err);
    }
}

// Select a dropdown option by visible text using WebdriverIO
async function selectDropdown(browser, selector, value) {
    if (!browser || !selector || !value) {
        throw new Error('Browser, selector and value are required');
    }
    const dropdown = await browser.$(selector);
    await dropdown.selectByVisibleText(value);
}

// Scroll to the bottom of the page using WebdriverIO
async function scrollToBottom(browser) {
    await browser.execute('window.scrollTo(0, document.body.scrollHeight)');
}

// Scroll to a certain height of the page using WebdriverIO
async function scrollToHeight(browser, height) {
    await browser.execute(`window.scrollTo(0, ${height})`);
}

// Start a browser session using WebdriverIO
async function startBrowser(browserName) {
    let browser;
    try {
        if (!browserName) {
            throw new Error('Browser name is required');
        }
        browser = await remote({
            logLevel: 'error',
            path: '/',
            capabilities: {
                browserName: browserName
            }
        });
        return browser;
    } catch (error) {
        console.log(`Error starting browser: ${error}`);
        if (browser) {
            try {
                await browser.deleteSession();
                console.log('Browser session deleted');
            } catch (error) {
                console.log(`Error closing browser: ${error}`);
            }
        }
        return null;
    }
}

module.exports = { getElementText, getElementCount, takeScreenshot, selectDropdown, scrollToBottom, startBrowser, scrollToHeight };
