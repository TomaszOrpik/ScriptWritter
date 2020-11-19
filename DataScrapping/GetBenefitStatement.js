const messageBox = require('./Utilities/messageBox');

module.exports.getBenefitStatement = async function getBenefitStatement(page) {
    let selectorExist = true;
    let text = [];
    try { await page.waitForSelector('.benefit-print-single-header'); }
    catch(e) { selectorExist = messageBox.messageBox(e, false); }
    
    if (selectorExist) {
        const textUnsorted = await page.evaluate(() => {
            function exportText(elements) {
                const elementsArr = Array.from(elements);
                const elementsText = elementsArr.map(el => el.textContent);
                return elementsText;
            };

            const text = [];
            const headers = exportText(document.getElementsByClassName('benefit-print-single-header'));
            headers.forEach(header => { text.push(header); });
            const texts = exportText(document.getElementsByClassName('text-success'));
            texts.forEach(txt => { text.push(txt); });
            const loaders = exportText(document.getElementsByClassName('tbs-loader'));
            loaders.forEach(loader => { text.push(loader); });
            const btns = exportText(document.getElementsByClassName('btn'));
            btns.forEach(btn => { text.push(btn); });
            return text;
        });
        const textWithNull = [...new Set(textUnsorted)];
        textWithNull.forEach(txt => {
            txt = txt.replace(/(\r\n|\n|\r)/gm, "");
        });
        text = textWithNull.filter(el => el != null);
    }
    return text;
}
