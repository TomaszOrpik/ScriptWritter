const messageBox = require('./Utilities/messageBox');

module.exports.getEnrollmentPage = async function getEnrollmentPage(page) {
    let selectorExist = true;
    try { await page.waitForSelector('.page-content'); }
    catch(e) { selectorExist = messageBox.messageBox(e, false); }
    if (selectorExist) {
        await hideElements('group-default');
        await hideElements('benefitline');
        const result = await page.evaluate(() => {
            const main = document.getElementsByClassName('page-content')[0];
            const text = main.innerText;
            const textArr = text.split('\n');
            return textArr;
        });
        return result;
    } else return null;
}

async function hideElements(className) {
    await page.evaluate(className => {
        const elements = document.getElementsByClassName(className);
        const elementsArr = Array.from(elements);
        elementsArr.forEach(el => {
            const parent = el.parentNode;
            parent.removeChild(el);
        });
    }, className);
};