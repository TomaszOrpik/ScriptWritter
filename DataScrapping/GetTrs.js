const formatText = require('./Utilities/formatText');

module.exports.getTrs = async function getTrs(page, elTitle) {
    const title = elTitle;
    let text = null;
    
    await page.waitFor(30000);
    await page.waitForSelector('div.page-content');
    await page.waitForSelector(".col-xs-5");
    await page.waitForSelector('.summarystatementdate');
    const rawText = await page.evaluate(() => {
        const currencys = document.querySelectorAll(".col-xs-5");
        currencys.forEach(el => el.parentElement.removeChild(el));
        const date = document.getElementsByClassName('summarystatementdate')[0];
        date.parentElement.removeChild(date);
        return document.getElementsByName('page-content')[0].innerText;
    });
    text = formatText.formatText(rawText);
    return { title, text };
}