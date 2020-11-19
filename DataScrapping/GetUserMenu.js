const messageBox = require('./Utilities/messageBox');

module.exports.getUserMenu = async function getUserMenu(page) { ///add console log when testing second lang it gets english title on second lang
    let menuArr = [];
    let SelectorExist = true;
    try { await page.waitForSelector('#user-div'); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist) {
        menuArr = await page.evaluate(() => {
            const div = document.getElementById('user-div');
            const navElsArray = Array.from(div.children);
            navEls = navElsArray.map(navEl => navEl.getAttribute('title'));
            filteredEls = navEls.filter(e => e != null);
            return filteredEls;
        });
    }
    return menuArr;
}