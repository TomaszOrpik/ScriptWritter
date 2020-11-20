

module.exports.getLoginPage = async function getLoginPage(page, pageContent) {
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
    const textArrFixed = {...textArr};
    return textArrFixed;
}