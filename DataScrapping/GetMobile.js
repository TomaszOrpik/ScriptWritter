const formatText = require('./Utilities/formatText');
const messageBox = require('./Utilities/messageBox');

module.exports.getMobile = async function getMobile(page, newTitle) {
    const title = newTitle;
    let text = null;
    let SelectorExist = true;
    try { await page.waitForSelector('div#mobileRegistration'); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist) {
        const textUnformatted = await page.evaluate(() => {
            const sel1 = document.getElementById('userName');
            const sel2 = document.getElementById('pinCode');
            sel1.parentNode.removeChild(sel1);
            sel2.parentNode.removeChild(sel2);
            return document.getElementById('main').innerText;
        });
        text = formatText.formatText(textUnformatted);
    }

    return { title, text };
}