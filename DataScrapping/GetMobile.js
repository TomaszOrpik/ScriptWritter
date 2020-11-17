const formatText = require('./Utilities/formatText');

module.exports.getMobile = async function getMobile(page, newTitle) {
    const title = newTitle;
    await page.waitForSelector('div#mobileRegistration');
    await page.waitFor(5000);
    const textUnformatted = await page.evaluate(() => {
        const sel1 = document.getElementById('userName');
        const sel2 = document.getElementById('pinCode');
        sel1.parentNode.removeChild(sel1);
        sel2.parentNode.removeChild(sel2);
        return document.getElementById('main').innerText;
    });
    const text = formatText.formatText(textUnformatted);
    return { title, text };
}