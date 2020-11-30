const createTable = require('./Utilities/CreateTable');
const titleTextPageConverter = require('./Utilities/titleTextPageConverter');

module.exports.saveFooterToWorksheet = function saveFooterToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.footer) {
        const ws = wb.addWorksheet('Footer');
        createTable.createHeader(wb, ws, localizationName, styles, 1, 1);
        const secondPage = pageContentSecond.footer ? pageContentSecond.footer : null;
        createTable.createTable(wb, ws, styles, 'FM', pageContent.footer, secondPage, 2, 1);
    }
}

module.exports.saveNeedAssistanceBarToWorksheet = function saveNeedAssistanceBarToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.needAssistanceBar) {
        const ws = wb.addWorksheet('Need Assistance Bar');
        createTable.createHeader(wb, ws, localizationName, styles, 1, 1);
        const secondPage = pageContentSecond.needAssistanceBar ? pageContentSecond.needAssistanceBar : null;
        createTable.createTable(wb, ws, styles, 'NAB', pageContent.needAssistanceBar, secondPage, 2, 1);
    }
}

module.exports.saveUserMenuToWorksheet = function saveUserMenuToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.userMenu) {
        const ws = wb.addWorksheet('User Menu');
        createTable.createHeader(wb, ws, localizationName, styles, 1, 1);
        const secondPage = pageContentSecond.userMenu ? pageContentSecond.userMenu : null;
        createTable.createTable(wb, ws, styles, 'UM', pageContent.userMenu, secondPage, 2, 1);
    }
}

module.exports.saveMessageToWorksheet = function saveMessageToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.messagePage) {
        const ws = wb.addWorksheet('My Messages Page');
        createTable.createHeader(wb, ws, localizationName, styles, 1, 1);
        const secondPage = pageContentSecond.messagePage ? pageContentSecond.messagePage : null;
        createTable.createTable(wb, ws, styles, 'MMP', pageContent.messagePage, secondPage, 2, 1);
    }
}

module.exports.saveLoginPageToWorksheet = function saveLoginPageToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.loginPage) {
        const ws = wb.addWorksheet('Login Page');
        createTable.createHeader(wb, ws, localizationName, styles, 1, 1);
        const secondPage = pageContentSecond.loginPage ? pageContentSecond.loginPage : null;
        createTable.createTable(wb, ws, styles, 'LP',pageContent.loginPage, secondPage, 2, 1);
    }
}

module.exports.saveUploadDocumentToWorksheet = function saveUploadDocumentToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    titleTextPageConverter.titleTextPageConverter(wb, styles, pageContent.uploadDocumentPage, pageContentSecond.uploadDocumentPage, localizationName);
}

module.exports.saveMobileToWorksheet = function saveMobileToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    titleTextPageConverter.titleTextPageConverter(wb, styles, pageContent.mobilePage, pageContentSecond.mobilePage, localizationName);
}


