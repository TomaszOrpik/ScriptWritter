const messageBox = require('./Utilities/messageBox');

module.exports.getHome = async  function getHome(page, navTitle) {
    let SelectorExist = true;
    
    let title = navTitle;
    let titles = [];
    let sliderText = [];
    let modules = [];
    let text = [];

    try { await page.waitForSelector('#greeting-message'); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist)
        text.push(await page.evaluate(() => {
            return document.getElementById('greeting-message').textContent;
        }));
    try { await page.waitForSelector('.caption-text'); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist)
        text.push(await page.evaluate(() => {
            return document.getElementsByClassName('caption-text')[0].textContent;
        }));
    ///session timeout data
    try { await page.waitForSelector('#main', {timeout: 5000}); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist) {
        text.push(await page.evaluate(() => {
            return document.getElementById('main').querySelector('h5').textContent.replace(/  +/g,'');
        }));
        text.push(await page.evaluate(() => {
            return document.getElementById('main').querySelector('.header-overlay').children[1].textContent.replace(/  +/g,'');
        }));
    }
    try { await page.waitForSelector('#timeout-continue-session', {timeout: 5000}); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist)
        text.push(await page.evaluate(() => {
            return document.getElementById('timeout-continue-session').querySelector('a').textContent.replace(/  +/g,'');
        }));

    try { await page.waitForSelector('.toggle-option'); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist) {
        const tempSwitch = await page.evaluate(() => {
            const yn = document.getElementsByClassName('toggle-option');
            const ynArr = Array.from(yn);
    
            let ynFinal = ynArr.map(el => el.textContent);
            return ynFinal;
        });
        tempSwitch.forEach(el => text.push(el));
    }

    try { await page.waitForSelector('.dropdown-menu'); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist)
        titles = await page.evaluate(() => {
            const titles = document.getElementsByClassName('dropdown-menu')[0];
            const titlesArr = Array.from(titles.children);

            let titleDetails = titlesArr.map(title => {
                return title.innerText.replace(/  +/g,'').split("\u21b5").join('');
            });
            return titleDetails;
        });
    // collect slider data
    try { await page.waitForSelector('#slider'); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist)
        sliderText = await page.evaluate(() => {
            const slider = document.getElementById('slider').children[0].children[0].children[1];
            const sliderArr = Array.from(slider.children);

            let sliderDetails = sliderArr.map(sliderDetail => {
                const image = sliderDetail.querySelector('img').src;
                const textRaw = sliderDetail.children[0].innerText;
                const textRawWithEmpty = textRaw.split(/\n/g);
                const text = textRawWithEmpty.filter(el => el != "");
                return { text, image }
            });
            return sliderDetails;
        });
        // valid data (if pending event and add claim remove other data)
    try { await page.waitForSelector('#right-side'); }
    catch(e) { SelectorExist = messageBox.messageBox(e, false); }
    if (SelectorExist) ///throws error here
        modules = await page.evaluate(() => {
            const mods = document.getElementsByClassName('modules-right-side')[0]; //to check
            const claimItems = document.querySelectorAll("div[ng-bind='claim.ClaimItem']");
            if(claimItems.length > 0)
                claimItems.forEach(claimItem => {
                    claimItem.parentNode.removeChild(claimItem);
                });
            const claimNumbers = document.querySelectorAll("span[ng-bind='claim.ClaimNumber']");
            if(claimNumbers.length > 0)
                claimNumbers.forEach(claimNumber => {
                    claimNumber.parentNode.removeChild(claimNumber);
                });
            const claimAmounts = document.querySelectorAll(`span[ng-class="vm.showSensitiveData ? 'show-sensitive':'hide-sensitive'"]`);
            if(claimAmounts.length > 0)
                claimAmounts.forEach(claimAmount => {
                    claimAmount.parentNode.removeChild(claimAmount);
                });
            const claimStatuses = document.querySelectorAll("span[ng-bind='claim.LocalizedStatus']");
            if(claimStatuses.length > 0)
                claimStatuses.forEach(claimStatus => {
                    claimStatus.parentNode.removeChild(claimStatus);
                });
            //remove other modules data
            const modsArr = Array.from(mods.children); //Cannot read property 'children' of undefined
            let mappedMods = modsArr.map((el) => {

                const moduleTextBeforeFilter = [];
                const moduleTitle = el.querySelector('h3').textContent;
                const spans = el.querySelectorAll('span');
                spans.forEach(span => moduleTextBeforeFilter.push(span.innerText));
                const moduleTextFiltr = moduleTextBeforeFilter.filter(el => el != '');
                const moduleText = [...new Set(moduleTextFiltr)];

                return { moduleTitle, moduleText };
            });
        //check if trs data exist and remove
        const trs = document.getElementsByClassName('highcharts-title');
        const trsTwo = document.getElementsByClassName('highcharts-data-label');
        if (trs.length > 0) trs[0].removeChild(trs[0].children[0]);
        if (trsTwo.length > 0) trsTwo[0].children[0].removeChild(trsTwo[0].children[0].children[1]);

        return mappedMods;
    });
    return { title, titles, sliderText, modules, text };
}