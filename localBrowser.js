const puppeteer = require('puppeteer');

///imports
const getPageContent = require('./DataScrapping/GetPageContent');
const getLoginPage = require('./DataScrapping/GetLoginPage');
const generateLocalManuscript = require('./GenerateLocalManuscript/CreateDocument');
const generateGlobalManuscript = require('./GenerateGlobalManuscript/CreateExcel');

const messageBox = require('./DataScrapping/Utilities/messageBox');

let _browser;

//pageInteractionElements
let reviewedBy;
let version;

let clientName;
let pageUrl;
let clientColor;

let localizationName;
let currencyName;
let curFormatName;
let dateName;

let userId;
let password;
let isHeadless;

let pageContent = {
    loginPage: null, //+
    forgotPassword: null, //add scrapping for every tab
    needAssistanceBar: null, //+
    userMenu: null, //+
    mainMenu: null, //+
    footer: null, //+
    profilePage: null, //+
    messagePage: null, //+
    homePage: null, //+
    overviewPage: null, //+
    claimSubmitPage: null, //+
    claimOverviewPage: null,
    uploadDocumentPage: null, //+
    mobilePage: null, //+
    wellbeingPage: null, //general check if null before save not in jnj
    enrollmentPage: null, //add scrapping for every subpage
    benefitStatementPage: null, //+
    trsPage: null, // to add
    generalPages: [] //+
}
let pageContentSecond = {
    loginPage: null,
    forgotPassword: null,
    needAssistanceBar: null,
    userMenu: null,
    mainMenu: null,
    footer: null,
    profilePage: null,
    messagePage: null,
    homePage: null,
    overviewPage: null,
    claimSubmitPage: null,
    claimOverviewPage: null,
    uploadDocumentPage: null,
    mobilePage: null,
    wellbeingPage: null,
    enrollmentPage: null,
    benefitStatementPage: null,
    trsPage: null,
    generalPages: []
}

let langA;
let langB;

function Start() {
    let SelectorExist = true;
    /// config puppeteer
    (async () => {
        let url = pageUrl + '/';
        let browser = await puppeteer.launch({
            headless: isHeadless,
            defaultViewport: null,
            args: [
                '--window-size=1920,1080',
                '--no-sandbox'
            ]
        });
        const page = await browser.newPage();
        _browser = browser;
        page.setDefaultNavigationTimeout(0);
        /// open the page
        await page.goto(url);
        /// get login page data
        const login = await getLoginPage.getLoginPage(page, pageContent);
        pageContent.loginPage = login;
        /// get forget password page data
        ///CODE HERE
        /// login to portal
        try { 
            await page.waitForSelector('input#username');
            await page.waitForSelector('input#password');
            await page.waitForSelector('div#login');
        }
        catch(e) { 
            SelectorExist = messageBox.messageBox('Couldnt load login page inputs!', false); 
            this.Close();
        }
        await page.click('input#username');
        await page.keyboard.type(userId); // input login
        await page.click('input#password');
        await page.keyboard.type(password); // input password
        await page.click('div#login');
        try { await page.waitForNavigation(); }
        catch(e) { SelectorExist = messageBox.messageBox('Page didnt load correctly', false); }
        /// get languages
        let secondLangExist = true;
        try { await page.waitForSelector('#ddlLanguage', { timeout: 1000 }); }
        catch(e) { secondLangExist = false; }
        const langNumber = secondLangExist ? await page.evaluate(() => {
            return document.getElementById('ddlLanguage').childElementCount;
        }) : 1;
        /// choose english language
        if(langNumber > 1) {
            langA = await page.evaluate(() => {
                return document.getElementById('ddlLanguage').children[0].getAttribute('value');
            });
            langB = await page.evaluate(() => {
                return document.getElementById('ddlLanguage').children[1].getAttribute('value');
            });

            try { await page.select('select[id="ddlLanguage"]', langA); }
            catch(e) { SelectorExist = messageBox.messageBox('Page didnt load correctly', false); }
        };
        /// get English page data
        await getPageContent.getPageContent(page, pageContent);
        //test console log
        console.log(pageContent);

        ///second language
        if(langNumber > 1) {
            try { await page.waitForSelector('select[id="ddlLanguage"]', { timeout: 1000 }); }
            catch(e) { SelectorExist = messageBox.messageBox('Couldnt Load second language!', false); }
            if (SelectorExist) {
                await page.select('select[id="ddlLanguage"]', langB);
                await getPageContent.getPageContent(page, pageContentSecond);
                ///logout
                await page.evaluate(() => {
                    const logout = document.querySelector('i.fa.fa-sign-out');
                    logout.click();
                })
                /// get login page data
                const loginSecond = await getLoginPage.getLoginPage(page, pageContent);
                pageContentSecond.loginPage = loginSecond;
                /// get forget password page data
                ///CODE HERE
                ///test console log
                console.log(pageContentSecond);
            }
        }
        /// close browser
        await browser.close();
        /// save data to files
        generateLocalManuscript.createDocument(clientName, localizationName, version, pageContent, pageContentSecond, clientColor);
        generateGlobalManuscript.createExcel(clientName, localizationName, version, reviewedBy,
            currencyName, curFormatName, dateName,
           pageContent, pageContentSecond
        ); ///add client color to formatting
    })
    ();
}

async function Reset() {
    await _browser.close();
    Start();
}

function Close() {window.close();}

function GoBack(step) {
    const container = document.getElementById('container');
    switch(step) {
        case 1:
            if (container.classList.contains('moveRightTwoStep')) {
                container.classList.remove('moveRightTwoStep');
            }
            container.classList.replace('moveLeftOneStep', 'moveRightOneStep');
            break;
        case 2:
            if (container.classList.contains('moveRightThreeStep')) {
                container.classList.remove('moveRightThreeStep');
            }
            container.classList.replace('moveLeftTwoStep', 'moveRightTwoStep');
            break;
        case 3:
            if (container.classList.contains('moveRightFourStep')) {
                container.classList.remove('moveRightFourStep');
            }
            container.classList.replace('moveLeftThreeStep', 'moveRightThreeStep');
            break;
        case 4:
            container.classList.replace('moveLeftFourStep', 'moveRightFourStep');
            break;
        default:
            break;
    }
}


function UserDataSubmit(e) {
    e.preventDefault();
    const value1 = document.getElementById('revivedName').value;
    const value2 = document.getElementById('versionName').value;

    reviewedBy = value1;
    version = value2;

    const container = document.getElementById('container');
    if (container.classList.contains('moveRightOneStep')) {
        container.classList.replace('moveRightOneStep', 'moveLeftOneStep');
    } else {
        container.classList.add('moveLeftOneStep');
    }
}
//clicked next step 2
function UserDataSubmitStepTwo(e) {
    e.preventDefault();
    const value1 = document.getElementById('clientName').value;
    const value2 = document.getElementById('pageAddress').value;
    const value3 = document.getElementById('colorPicker').value;

    clientName = value1;
    pageUrl = value2;
    clientColor = value3;

    const container = document.getElementById('container');
    if (container.classList.contains('moveRightTwoStep')) {
        container.classList.replace('moveRightTwoStep', 'moveLeftTwoStep');
    } else {
        container.classList.add('moveLeftTwoStep');
    }
}
//clicked next step 3
function UserDataSubmitStepThree(e) {
    e.preventDefault();
    const value1 = document.getElementById('localizationName').value;
    const value2 = document.getElementById('currencyName').value;
    const value3 = document.getElementById('currencyFormat').value;
    const value4 = document.getElementById('dateFormat').value;

    localizationName = value1;
    currencyName = value2;
    curFormatName = value3;
    dateName = value4;
    /// switch page to next
    const container = document.getElementById('container');
    if (container.classList.contains('moveRightThreeStep')) {
        container.classList.replace('moveRightThreeStep', 'moveLeftThreeStep');
    } else {
        container.classList.add('moveLeftThreeStep');
    }
}
//clicked next step 4
function UserDataSubmitStepFour(e) {
    e.preventDefault();
    const value1 = document.getElementById('employeeLogin').value;
    const value2 = document.getElementById('employeePassword').value;
    const value3 = document.getElementById('cbx').checked;

    userId = value1;
    password = value2;
    isHeadless = value3;
     /// switch page to next
     const container = document.getElementById('container');
     if (container.classList.contains('moveRightFourStep')) {
         container.classList.replace('moveRightFourStep', 'moveLeftFourStep');
     } else {
         container.classList.add('moveLeftFourStep');
     }

     /// Start data scrapping
     Start();
}
// client clicked
function clientClicked(client) {
    clientName = client.name;
    pageUrl = client.url;
    clientColor = client.color;
    /// switch page to next
    const container = document.getElementById('container');
    if (container.classList.contains('moveRightTwoStep')) {
        container.classList.replace('moveRightTwoStep', 'moveLeftTwoStep');
    } else {
        container.classList.add('moveLeftTwoStep');
    }
}
// language clicked
function languageClicked(lang) {
    localizationName = lang.name;
    currencyName = lang.currency;
    curFormatName = lang.currencyFormat;
    dateName = lang.dateFormat;
    /// switch page to next
    const container = document.getElementById('container');
    if (container.classList.contains('moveRightThreeStep')) {
        container.classList.replace('moveRightThreeStep', 'moveLeftThreeStep');
    } else {
        container.classList.add('moveLeftThreeStep');
    }
}

function EnableButton(buttonId) {
    const btn = document.getElementById(buttonId).children[0];
    btn.disabled = false;
}

function switchClientCheckbox() {
    const textLeft = document.getElementById('textSliderLeft');
    const textRight = document.getElementById('textSliderRight');
    const switchClient = document.getElementsByClassName('switchClient')[0];
    const predefined = document.getElementById('predefined');
    const custom = document.getElementById('custom');
    if (switchClient.checked) {
        // display custom
        textLeft.classList.remove('activeTextLeft');
        textRight.classList.add('activeTextRight');
        predefined.classList.replace('show', 'hide');
        setTimeout(() => {
            custom.classList.replace('hide', 'show');
        }, 500);
    }
    else {
        //display predefined
        textLeft.classList.add('activeTextLeft');
        textRight.classList.remove('activeTextRight');
        predefined.classList.replace('hide', 'show');
        setTimeout(() => {
            custom.classList.replace('show', 'hide');
        }, 500);
    }
}

function switchClientCheckboxLanguage() {
    console.log('start');
    const textLeft = document.getElementById('textSliderLeftLang');
    const textRight = document.getElementById('textSliderRightLang');
    const switchLang = document.getElementsByClassName('switchLang')[0];
    const predefined = document.getElementById('predefinedLang');
    const custom = document.getElementById('customLang');
    console.log(switchLang.checked);
    if (switchLang.checked) {
        // display custom
        textLeft.classList.remove('activeTextLeft');
        textRight.classList.add('activeTextRight');
        predefined.classList.replace('show', 'hide');
        setTimeout(() => {
            custom.classList.replace('hide', 'show');
        }, 500);
    }
    else {
        //display predefined
        textLeft.classList.add('activeTextLeft');
        textRight.classList.remove('activeTextRight');
        predefined.classList.replace('hide', 'show');
        setTimeout(() => {
            custom.classList.replace('show', 'hide');
        }, 500);
    }
}




