const formatText = require('./Utilities/formatText');
const messageBox = require('./Utilities/messageBox');

module.exports.getUploadDocument = async function getUploadDocument(page, newTitle) {
    const title = newTitle;
    let SelectorExist = true;

    try {
         await page.waitForSelector('#ddlCorrespondenceType'); 
         await page.waitForSelector('#fileExt'); 
         await page.waitForSelector('#fileMaxSize'); 
         await page.waitForSelector('.page-content'); 
    }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }

    if (SelectorExist) {
        const textUnformatted = await page.evaluate(() => {
            const input = document.getElementById('ddlCorrespondenceType');
            const fileExt = document.getElementById('fileExt');
            const fileMaxSize = document.getElementById('fileMaxSize');
            fileMaxSize.parentNode.removeChild(fileMaxSize);
            fileExt.parentNode.removeChild(fileExt);
            input.parentNode.removeChild(input);
            return document.getElementsByClassName('page-content')[0].textContent;
        });
        text = formatText.formatText(textUnformatted);
    }

    return { title, text };
}