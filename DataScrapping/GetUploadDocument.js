const formatText = require('./Utilities/formatText');

module.exports.getUploadDocument = async function getUploadDocument(page, newTitle) {
    const title = newTitle;
    const textUnformatted = await page.evaluate(() => {
        const input = document.getElementById('ddlCorrespondenceType');
        const fileExt = document.getElementById('fileExt');
        const fileMaxSize = document.getElementById('fileMaxSize');
        fileMaxSize.parentNode.removeChild(fileMaxSize);
        fileExt.parentNode.removeChild(fileExt);
        input.parentNode.removeChild(input);
        return document.getElementsByClassName('page-content')[0].textContent;
    });
    const text = formatText.formatText(textUnformatted);
    return { title, text };
}