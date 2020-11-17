const getAssistance = require('./getAssistance');
const getUserMenu = require('./GetUserMenu');
const getProfile = require('./GetProfile');
const getMessage = require('./GetMessage');

const getHome = require('./GetHome');
const getOverview = require('./GetOverview');
const getGeneral = require('./GetGeneral');
const getClaimsSubmitPage = require('./GetClaimsSubmitPage');
const getClaimSummary = require('./GetClaimSummary');
const getUploadDocument = require('./GetUploadDocument');
const getMobile = require('./GetMobile');
const getBenefitStatement = require('./GetBenefitStatement');
const getEnrollment = require('./GetEnrollment');

const getDivText = require('./Utilities/GetDivText');

module.exports.getPageContent = async function getPageContent(page, pageContent) {
    const pagesUnsorted = [];
            /// get NeedAssistanceBar
            pageContent.needAssistanceBar = await getAssistance.getAssistance(page);
            /// get User menu
            pageContent.userMenu = await getUserMenu.getUserMenu(page);
            /// get main menu
            pageContent.mainMenu = await getDivText.getDivText(page, 'menu-no-dashboard');
            /// get footer
            pageContent.footer = await getDivText.getDivText(page, 'f-nav');
            /// get profile Page
            pageContent.profilePage = await getProfile.getProfile(page, pageContent.userMenu[0]);
            /// get message Page
            pageContent.messagePage = await getMessage.getMessage(page, pageContent.userMenu[1]);
            // get list of navigation buttons
            let navigation = await page.evaluate(() => {
                const nav = document.getElementById('menu-no-dashboard');
                let navArr = Array.from(nav.children);
    
                let navid = navArr.map(navEl => {
                    const id = navEl.children[0].id;
                    const title = navEl.children[0].getAttribute('title');
                    const type = 'id';
                    return { id, title, type};
                });
                return navid;
            });
            /// get list of footer buttons
            let footerNavigation = await page.evaluate(() => {
                const nav = document.getElementById('f-nav');
                let navArr = Array.from(nav.children);
                let navid = navArr.map(navEl => {
                    const id = navEl.children[0].className;
                    const title = navEl.children[0].textContent;
                    const type = 'class';
                    return { id, title, type };
                });
                return navid;
            });
            /// get list of home buttons
            const buttonsCount = await getButtonsCount(page);
            /// loop through home buttons
            await homeButtonsLoop(page, pageContent, pagesUnsorted, buttonsCount);
            /// loop through main menu buttons
            await buttonsLoop(page, navigation, pageContent, pagesUnsorted);
            /// loop through footer buttons
            await buttonsLoop(page, footerNavigation, pageContent, pagesUnsorted);

            pageContent.generalPages = Array.from(new Set(pagesUnsorted.map(a => a.title)))
                 .map(title => {
                     return pagesUnsorted.find(a => a.title === title);
                 });
}

async function homeButtonsLoop(page, pageContent, pagesUnsorted, buttonCount) {
    for (let i = 0; i < buttonCount; i++) {
        await page.waitFor(2000);
        await page.waitForSelector('div#main');
        const buttonTitle = await page.evaluate(i => {
            const button = document.getElementById('main').getElementsByClassName('btn')[i];
            const btnClasses = button.classList;
            if (!btnClasses.contains('expand-dashboard') && !btnClasses.contains('expand-messages'))
                button.click();
            return button.innerText;
        }, i);
        await checkPages(page, buttonTitle, pageContent, pagesUnsorted);
    }
}

async function getButtonsCount(page) {
    return await page.evaluate(() =>  document.getElementById('main').getElementsByClassName('btn').length)
}

async function buttonsLoop(page, navigation, pageContent, pagesUnsorted) {
    /// click at each button
        /// jnj double link class issue fix
        let surveClicked = false;
        for(let i = 0; i < navigation.length; i++) {
            if (navigation[i].type === 'id') {
                await page.click(`#${navigation[i].id}`);
            }
            else {
                if (navigation[i].id === 'text-online-security' && !surveClicked) {
                    await page.click(`.${navigation[i].id}`);
                    surveClicked = true;
                } else if (navigation[i].id === 'text-online-security' && surveClicked) {
                    await page.evaluate(() => {
                        const surveyLink = document.getElementsByClassName('text-online-security')[1];
                        surveyLink.click();
                    })
                }
                else {
                    await page.click(`.${navigation[i].id}`);
                }
            }
            await checkPages(page, navigation[i].title, pageContent, pagesUnsorted)

    }
}

async function checkPages(page, title, pageContent, pagesUnsorted) {
    await page.waitForSelector('#main');
    await page.waitFor(10000);
    const mainClass = await page.evaluate(() => {
        return document.getElementById('main').className;
    });
    /// check page type and collect sub-pages data
    switch(mainClass) {
    case 'home':
        pageContent.homePage = await getHome.getHome(page, title);
        break;
    case 'overview':
        pageContent.overviewPage = await getOverview.getOverview(page, title);
        await page.goBack();
        break;
    case 'general':
        pagesUnsorted.push(await getGeneral.getGeneral(page, title));
        /// get last link
        const pageLink = await generalGetLastLink(page);
        if (pageLink === "/FSA/FSAClaim") {
            /// click last link
            await clickLastLink(page);
            /// get Claims Submit Page
            pageContent.claimSubmitPage = await getClaimsSubmitPage.getClaimsSubmitPage(page);
            await page.goBack();
        }
        await page.goBack();
        await page.goBack();
        break;
    case 'claim':
        pageContent.claimSubmitPage = await getClaimsSubmitPage.getClaimsSubmitPage(page);
        await page.goBack();
        await page.goBack();
        break;
    case 'matrix benefit-statement':
        pageContent.benefitStatementPage = await getBenefitStatement.getBenefitStatement(page);
        await page.goBack();
        break;
    case 'matrix matrix-for-enroll':
        console.log('reached');
        pageContent.enrollmentPage = await getEnrollment.getEnrollmentPage(page);
        await page.goBack();
        break;
    case 'MobileRegistation':
        pageContent.mobilePage = await getMobile.getMobile(page, title);
        await page.goBack();
        await page.goBack();
        break;
    ///trs + wellbeing
    default:
        await page.waitFor(5000);
        const isUploadDocument = await checkIfIsUpload(page);
        const isFlexClaim = await checkIfFlexClaim(page);
        if (isUploadDocument) {
            pageContent.uploadDocumentPage = await getUploadDocument.getUploadDocument(page, title);
        }
        else if (isFlexClaim) {
            pageContent.claimOverviewPage = await getClaimSummary.getClaimSummary(page);
            await page.click('button.btn.btn-primary.claim-details-edit');
            pageContent.claimSubmitPage = await getClaimsSubmitPage.getClaimsSubmitPage(page);
            await page.goBack();
            await page.goBack();
        }
        else if (!isUploadDocument && !isFlexClaim) {
            pagesUnsorted.push(await getGeneral.getGeneral(page, title));
        }
        await page.goBack();
        break;
    }
}

async function checkIfFlexClaim(page) {
    return await page.evaluate(() => {
        const claimSummary = document.getElementById('flexClaimTitle');
        if (claimSummary == null) return false;
        else return true;
    })
}

async function checkIfIsUpload(page) {
    return await page.evaluate(() => {
        const upload = document.getElementById('documentsContainer');
        if (upload == null) return false;
        else return true;
    })
}

async function clickLastLink(page) {
    await page.evaluate(() => {
        const links = document.getElementById('main').querySelectorAll('a');
        links[links.length-1].click();
    })
}

async function generalGetLastLink(page) {
    /// get last button on page
    return await page.evaluate(() => {
        const links = document.getElementById('main').querySelectorAll('a');
        const linksArr = Array.from(links);
        const linksMapped = linksArr.map(link => link.getAttribute('href'));
        return linksMapped[linksMapped.length-1];
    });
}
