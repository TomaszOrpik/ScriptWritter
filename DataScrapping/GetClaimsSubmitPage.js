const formatText = require('./Utilities/formatText');
const messageBox = require('./Utilities/messageBox');

module.exports.getClaimsSubmitPage = async function getClaimsSubmitPage(page) {
    let loadingText = null;
    let pageText = null;
    let completedText = null;
    let selectorExist = true;
    try { await page.waitForSelector("span[ng-bind-html='loadingText']"); }
    catch (e) { selectorExist = messageBox(e, false); }
    if (selectorExist)
        loadingText = await page.evaluate(() => document.querySelector("span[ng-bind-html='loadingText']").innerText);
    /// wait for inputs to load
    try {
        await page.waitForSelector('#claimDetail');
        await page.waitForSelector('#receiptDetail');
        await page.waitForSelector('#Attachment');
        await page.waitForSelector('#claimItemBreakdownDetail');
        await page.waitForSelector('#AdditionalDetail');
    } catch (e) { selectorExist = messageBox(e, false); }
    if (selectorExist)
        /// get page text without inputs
        pageText = await page.evaluate(() => {
            const sel1 = document.getElementById('SpendingAccountSelect');
            const sel2 = document.getElementById('ClaimItemSelect');
            const sel3 = document.getElementById('spendingAccountBalanceDisplay');
            const sel4 = document.getElementById('ClaimantSelect');
            const sel5 = document.getElementById('receiptCurrencySelect');
            sel1.parentNode.removeChild(sel1);
            sel2.parentNode.removeChild(sel2);
            sel3.parentNode.removeChild(sel3);
            sel4.parentNode.removeChild(sel4);
            sel5.parentNode.removeChild(sel5);
            const text = document.getElementById('main').innerText;
            const textFormatted = text.replace('	', '');
            const textArr = textFormatted.split("\n");
            const textFilOne = textArr.filter(el => el != "");
            return textFilOne.filter(el => el != " ");
        });
    /// refresh page
    await page.goBack();
    await page.goForward();
    try {
        await page.waitForSelector('.loading-error.ng-binding');
        selectorExist = messageBox(e, false);
    }
    catch (e) {
        selectorExist = true;
    }
    if (selectorExist) {
        try {
            /// wait for page to load
            await page.waitForSelector('#claimDetail');
            await page.waitForSelector('#receiptDetail');
            await page.waitForSelector('#Attachment');
            await page.waitForSelector('#claimItemBreakdownDetail');
            await page.waitForSelector('#AdditionalDetail');
        } catch (e) { selectorExist = messageBox(e, false); }
        /// fill submit a claim fields
        await page.click("input[ng-model='vm.CurrentClaim.ReceiptDate']");
        await page.keyboard.type('01/01/2020');
        await page.click("input[name='receiptNumberInput']");
        await page.keyboard.type('123');
        await page.click("input[name='receiptAmountInput']");
        await page.keyboard.type('123');
        const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            page.click('span.fileinput-button')
        ]);
        await fileChooser.accept(['./images/empty.jpg']);
        await page.click('button[tbs-translate="FSA.ClaimSubmit.Submit"]');
    }
    try {
        await page.waitForSelector('h1[tbs-translate="FSA.ClaimSubmit.ClaimSubmitted"]');
    } catch (e) { selectorExist = messageBox(e, false); }
    if (selectorExist) {
        /// get page text
        const textUnformatted = await page.evaluate(() => {
            const sel1 = document.getElementsByClassName('table-bordered')[0];
            sel1.removeChild(sel1.children[1]);
            return document.querySelector('div[ng-show="!vm.Initializing && vm.ClaimSubmitted && !vm.LoadingError"]').textContent;
        });
        completedText = formatText.formatText(textUnformatted);
    }
    if (loadingText == null && pageText == null && completedText == null) return null;
    else return { loadingText, pageText, completedText };

}
