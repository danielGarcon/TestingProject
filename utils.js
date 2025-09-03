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




// function areAnagrams(str1, str2) {
//     // Check if the strings have the same length
//     if (str1.length !== str2.length) {
//         return false;
//     }
    
//     // Split the strings into arrays

//     // make all the letters lowercase and remove spaces

//     let arr1 = str1.toLowerCase().replace(/\s/g, '').split('');
//     let arr2 = str2.toLowerCase().replace(/\s/g, '').split('');

//     // Sort the arrays
//     arr1.sort();
//     arr2.sort();

//     // Compare the sorted arrays
//     for (let i = 0; i < arr1.length; i++) {
//         if (arr1[i] !== arr2[i]) {
//             return false;
//         }
//     }
//     return true;
// }


// lngestCommonPrefix(["flower", "flow", "flight"]); // "fl"

// function longestCommonPrefix(strs){
//     if(strs.length === 0) return '';
//     let prefix = strs[0];
//     for ( let i = 1; i < strs.lenght; i++ ){
//         // the line below checks if the prefix is not at the beginning of the string
//         while(strs[i].indexOf(prefix) !== 0){
//             prefix = prefix.substring(0, prefix.length - 1);
//         }
//     }
//     return prefix;
// }



// Problem: Given an array of integers, return the indices of the two numbers that add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example:

// javascript
// Copy code
// const nums = [2, 7, 11, 15];
// const target = 9;

// twoSum(nums, target); // Output: [0, 1]

// function twoSums(nums, target) {
//     const map = new Map();
//     for (let i = 0; i < nums.length; i++) {
//         const complement = target - nums[i];
//         if (map.has(complement)) {
//             return [map.get(complement), i];
//         }
//         map.set(nums[i], i);
//     }
//     return [];
// }