const messageBox = require('./Utilities/messageBox');

module.exports.getProfile = async function getProfile(page, title) {
    let list = [];
    let tabs = [];
    let forCount = 0;
    let SelectorExist = true;

    /// click into profile tab
    await page.evaluate(title => {
        const tab = document.querySelector(`a[title="${title}"]`);
        tab.click();
    }, title);

    try { await page.waitForSelector('#headerTabs'); }
    catch(e) { 
        SelectorExist = messageBox.messageBox(e, false); 
    }
    if (SelectorExist) {
        tabs = await page.evaluate(() => {
            const rawList = document.getElementById('headerTabs')
                .children[0].children[0].children[0];
            list = Array.from(rawList.children);
    
            return list.map(el => el.querySelector('a').textContent);
        });
        
        await getTabData(page, list, tabs, forCount);
        forCount = forCount + 1;
        if (forCount < tabs.length) {
            await getTabContent(page, list, tabs, forCount);
            forCount = forCount + 1;
        }
        if (forCount < tabs.length) {
            await getTabContent(page, list, tabs, forCount);
            forCount = forCount + 1;
        }
            if (forCount < tabs.length) {
            await getTabContent(page, list, tabs, forCount);
            forCount = forCount + 1;
        }
        if (forCount < tabs.length) {
            await getTabContent(page, list, tabs, forCount);
            forCount = forCount + 1;
        }
            if (forCount < tabs.length) {
            await getTabContent(page, list, tabs, forCount);
            forCount = forCount + 1;
        }
        if (forCount < tabs.length) {
            await getTabContent(page, list, tabs, forCount);
            forCount = forCount + 1;
        }
            if (forCount < tabs.length) {
            await getTabContent(page, list, tabs, forCount);
            forCount = forCount + 1;
        }
        if (forCount < tabs.length) {
            await getTabContent(page, list, tabs, forCount);
            forCount = forCount + 1;
        }
        await page.goBack();
    }

    return list;
}

async function getTabContent(page, list, tabs, forCount) {
    const id = await getId(page, forCount);
    await page.click(`#${id}`);
    await page.waitFor(1000);
    await getTabData(page, list, tabs, forCount);
}

async function getId(page, forCount) {
    /// get tab id
    return await page.evaluate(forCount => 
        document.getElementById('headerTabs')
            .children[0].children[0].children[0]
            .children[forCount].querySelector('a').id, forCount);
}

async function getTabData(page, list, tabs, forCount) {
        /// get tab data
        const el = await page.evaluate(() => {
            const title = '';
            const Allinputs = [];
            const body = document.getElementById('content').querySelector('[class="form-data"]')
                .children[1].children[0].children[0];
            const warning = body.children[0].innerText;

            const labels = body.querySelectorAll('label');
            const labelsArr = Array.from(labels);
            labelsArr.forEach(label => Allinputs.push(label.textContent));
            /// inputs remove duplicates
            inputs = [...new Set(Allinputs)];
            return { title, warning, inputs };
        });
        el.title = tabs[forCount];
        list.push(el);
}