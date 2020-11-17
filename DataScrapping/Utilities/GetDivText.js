module.exports.getDivText = async function getDivText(page, divId) {
    const mainDiv = page.evaluate(divId => document.getElementById(divId), divId);
    if (mainDiv != null) {
        return await page.evaluate(divId => {
            const div = document.getElementById(divId);
            const navElsArray = Array.from(div.children);
            navEls = navElsArray.map(navEl => navEl.children[0].textContent);
            return navEls;
        }, divId);
    }
}