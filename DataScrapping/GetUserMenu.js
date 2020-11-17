module.exports.getUserMenu = async function getUserMenu(page) {
    const mainDiv = page.evaluate(() => document.getElementById('user-div'));
    if (mainDiv != null) {
        return await page.evaluate(() => {
            const div = document.getElementById('user-div');
            const navElsArray = Array.from(div.children);
            navEls = navElsArray.map(navEl => navEl.getAttribute('title'));
            filteredEls = navEls.filter(e => e != null);
            return filteredEls;
        });
    }
}