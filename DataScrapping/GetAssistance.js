const messageBox = require('./Utilities/messageBox');

module.exports.getAssistance = async function getAssistance(page) {
    let SelectorExist = true;
    try {
         await page.waitForSelector('div#floating-header');
    } catch (e) { SelectorExist = messageBox.messageBox(e, false); }
    if(SelectorExist)
        return await page.evaluate(() => {
            const div = document.getElementById('floating-header').innerText;
            const text = div.split("\n");
            text.push(document.getElementById('search-box').value);
            const textFormatted = text.filter(e => e !== "");
            return textFormatted;
        })
    else return null;
}
