const messageBox = require('./Utilities/messageBox');

module.exports.getGeneral = async function getGeneral(page, navTitle) {
    let selectorExist = true;
    let title = null;
    let text = null;
    try { await page.waitForSelector('div.page-content'); }
    catch(e) { selectorExist = messageBox.messageBox(e, false); }
    if (selectorExist) {
        const pageTitle = await page.evaluate(() => {
            const pageTitle = document.getElementById('page-title');
            if (pageTitle == null) return null;
            else return pageTitle.textContent;
        });
        title = (pageTitle != null) ? pageTitle : navTitle;
        
        // special title condition for survey page
        let gotHeading = true;
        try { await page.waitForSelector('.heading ', { timeout: 1000 });  }
        catch(e) { gotHeading = false; console.log('no heading');}
        if (gotHeading)
            title = await page.evaluate(() => {
                return document.getElementsByClassName('heading ')[0].innerText;
            });

        text = await page.evaluate(() => {
            const text =  document.querySelector('div.page-content').innerText;
            const textFormatted = text.replace('	',''); 
            const textArr = textFormatted.split("\n");
            const textFilOne = textArr.filter(el => el !== "");
            const textFillTwo = textFilOne.filter(el => el !== " ");
            const textFillThree = textFillTwo.filter(el => el !== "	");
            return textFillThree;
        })
    }

    return {title, text };
}