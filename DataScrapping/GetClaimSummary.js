const formatText = require('./Utilities/formatText');
const messageBox = require('./Utilities/messageBox');

module.exports.getClaimSummary = async function getClaimSummary(page) {
    let SelectorExist = true;

    let claimDetails = null;
    await page.goBack();
    await page.goForward();
    let claimsLoaded = false;
    try { await page.waitForSelector("span[ng-bind-html='loadingText']"); }
    catch(e) { 
        console.log(e);
        await page.goBack();
        await page.goForward();
    }
    const loadingText = await page.evaluate(() => document.querySelector("span[ng-bind-html='loadingText']").innerText);
    do {
        try { 
            await page.waitForSelector('#flexClaimTitle', { timeout: 30000 });
            claimsLoaded = true;
        }
        catch(e) {
            await page.goBack();
            await page.foForward();
        }
    } while (!claimsLoaded)

    const pageText = await page.evaluate(() => {
        const title = document.getElementById('flexClaimTitle').innerText;
        const tabs = document.getElementsByClassName('tab-titles')[0];
        const tabsArr = Array.from(tabs.children);
        const tabsTitles = tabsArr.map(tab => tab.textContent);
        return { title, tabsTitles };
    });
    // my statement
    await page.click("a[ng-click='vm.contentTypeChanged(1)']");
    await page.waitFor(1000);
    const myStatementText = await page.evaluate(() => {
        function getText(arr) {
            const transformedArr = Array.from(arr);
            const arrValue = transformedArr.map(el => el.innerText);
            return arrValue;
        }
        const oldText = [];
        const claimHeader = document.getElementsByClassName('claim-header')[0];
        const claimHeaderChild = getText(claimHeader.children);
        claimHeaderChild.forEach(claimTxt => { oldText.push(claimTxt); });
        const tableCaption = getText(document.getElementsByClassName('fsa-table-caption'));
        tableCaption.forEach(tableEl => { oldText.push(tableEl); });
        const sectionTitle = getText(document.getElementsByClassName('section_title'));
        sectionTitle.forEach(sectionTitleTxt => { oldText.push(sectionTitleTxt); });
        const text = [...new Set(oldText)];
        return text;
    });
    // my claim summary
    await page.evaluate(() => {
        document.getElementsByClassName('tab-titles')[0]
            .children[0].children[0].click();
    });
    await page.waitFor(1000);
    const myClaimSummaryText = await page.evaluate(() => {
        const headers = document.getElementsByClassName('claim-header')[0];
        const headersArr = Array.from(headers.children);
        const headersText = headersArr.map(el => el.innerText);
        const buttonTitles = document.getElementsByClassName('claim-approved');
        const btnArr = Array.from(buttonTitles);
        const btnText = btnArr.map(el => el.children[0].title);
        btnText.forEach(el => { headersText.push(el); });
        const text = [...new Set(headersText)];
        return text;
    });
    // claim details
    ////try to click if exist
    try { await page.waitForSelector('div.claim-approved a'); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false) }
    if (SelectorExist) {
        await page.click('div.claim-approved a');
        await page.waitForSelector('table.table', { timeout: 1000 });
        claimDetails = await page.evaluate(() => {
            const table = document.querySelector('table.table tbody');
            const tableTr = document.querySelectorAll('table.table tbody tr');
            const tableArr = Array.from(tableTr);
            tableArr.forEach(el => {
                const elRemove = el.children[1];
                el.removeChild(elRemove);
            })
            ///table text + btn text
            const tableTextRaw = table.innerText;
            const tableText = tableTextRaw.split('\n');
    
            const btnTextRaw = document.getElementsByClassName('btn');
            const btnTxtArr = Array.from(btnTextRaw);
            const buttonsTextAll = btnTxtArr.map(btn => btn.innerHTML);
            const buttonsTextMains = buttonsTextAll.slice(0, 3);
            const buttonsText = buttonsTextMains;
    
            return { tableText, buttonsText };
        });
    }

    return { 
        loadingText,
        pageText,
        myStatementText,
        myClaimSummaryText,
        claimDetails
    };
}