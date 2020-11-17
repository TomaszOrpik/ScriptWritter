const e = require("express");

module.exports.getGeneral = async function getGeneral(page, navTitle) {
    
    let title;
    await page.waitFor(2000);
    await page.waitForSelector('div.page-content');
    const pageTitle = await page.evaluate(() => {
        const pageTitle = document.getElementById('page-title');
        if (pageTitle == null) return null;
        else return pageTitle.textContent;
    });
    if (pageTitle != null) title = pageTitle;
    else title = navTitle;
    let text = await page.evaluate(() => {
        const text =  document.querySelector('div.page-content').innerText;
        const textFormatted = text.replace('	',''); 
        const textArr = textFormatted.split("\n");
        const textFilOne = textArr.filter(el => el !== "");
        const textFillTwo = textFilOne.filter(el => el !== " ");
        const textFillThree = textFillTwo.filter(el => el !== "	");
        return textFillThree;
    })
    return {title, text };
}