const formatText = require('./Utilities/formatText');

module.exports.getTrs = async function getTrs(page, elTitle) {
    const title = elTitle;
    let text = null;
    
    await page.waitFor(30000);
    await page.waitForSelector('div#dashboardContainer');
    await page.waitForSelector(".col-xs-5");
    await page.waitForSelector('.summarystatementdate');
    const rawText = await page.evaluate(() => {
        const currencys = document.querySelectorAll(".col-xs-5");
        currencys.forEach(el => el.parentElement.removeChild(el));
        const date = document.getElementsByClassName('summarystatementdate')[0];
        date.parentElement.removeChild(date);

        const pageContet = document.getElementById('dashboardContainer');
        return pageContet.innerText;
    });
    text = formatText.formatText(rawText);
    return { title, text };
}