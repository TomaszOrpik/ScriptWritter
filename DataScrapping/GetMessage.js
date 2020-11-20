const messageBox = require('./Utilities/messageBox');

module.exports.getMessage = async function getMessage(page, title) {
    let texts = [];
    let SelectorExist = true;

    try { await page.waitForSelector(`a[title="${title}"]`); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist)
        await page.click(`a[title="${title}"]`);
    try {
        await page.waitForSelector('#main');
        await page.waitForSelector('#content');
        await page.waitForSelector('#EmployeeMailbox');
        await page.waitForSelector('#noMailHeading');
        await page.waitForSelector('#hasMail');
        await page.waitForSelector('.errorMsg');
        await page.waitForSelector('tip-tip');
        await page.waitForSelector('.k-link');
    }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist) {
        texts = await page.evaluate(() => {
            const localtextArr = [];
            const body = document.getElementById('content');
            localtextArr.push(body.querySelector('h1').textContent.replace(/  +/g,'').split("\u21b5").join(''));
            localtextArr.push(document.getElementById('EmployeeMailbox').children[0].children[0].textContent.replace(/  +/g,'').split("\u21b5").join(''));
            localtextArr.push(document.getElementById('noMailHeading').innerText.replace(/  +/g,'').split("\u21b5").join(''));
            localtextArr.push(document.getElementById('hasMail').children[0].innerText);
            const errors = document.getElementsByClassName('errorMsg');
            for (let i = 0; i < errors.length; i++) localtextArr.push(errors[i].innerText);
            localtextArr.push(document.querySelector('tip-tip').children[1].innerText);
            const other = document.getElementsByClassName('k-link');
            for (let i = 0; i < other.length; i++) localtextArr.push(other[i].innerText);
            return localtextArr;
        });
        await page.goBack();
    }

    return texts;
}