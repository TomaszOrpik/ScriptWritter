module.exports.getMessage = async function getMessage(page, title) {
    let texts = [];

    await page.click(`a[title="${title}"]`);
    await page.waitForSelector('#main');
    await page.waitForSelector('#content');
    /// wait for page to fully load
    await page.waitFor(10000);
    
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
    return texts;
}