const messageBox = require('./Utilities/messageBox');

module.exports.getLoginPage = async function getLoginPage(page) {
    let textArrFixed = [];
    let SelectorExist = true;
    
    try { 
        await page.waitForSelector('#ddlLanguage'); 
        await page.waitForSelector('.sr-only'); 
        await page.waitForSelector('#containerGlobal'); 
    } catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    
    if (SelectorExist) {
        const text = await page.evaluate(() => {
            const select = document.getElementById('ddlLanguage');
            select.style.display = 'none';
            const srEls = document.getElementsByClassName('sr-only');
            srElsArr = Array.from(srEls);
            srElsArr.forEach(el => {
                const parent = el.parentNode;
                parent.removeChild(el);
            });
            const global = document.getElementById('containerGlobal');
            return global.innerText;
        });
        const textArr = text.split("\n");
        textArrFixed = {...textArr};
    }

    return textArrFixed;
}