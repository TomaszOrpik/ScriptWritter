const createTable = require('./Utilities/CreateTable');
const titleTextPageConverter = require('./Utilities/titleTextPageConverter');

module.exports.saveFooterToWorksheet = function saveFooterToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.footer) {
        const ws = wb.addWorksheet('Footer');
        createTable.createHeader(ws, localizationName, styles, 1, 1);
        createTable.createTable(ws, styles, 'FM', pageContent.footer, pageContentSecond.footer, 2, 1);
    }
}

module.exports.saveNeedAssistanceBarToWorksheet = function saveNeedAssistanceBarToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.needAssistanceBar) {
        const ws = wb.addWorksheet('Need Assistance Bar');
        createTable.createHeader(ws, localizationName, styles, 1, 1);
        createTable.createTable(ws, styles, 'NAB', pageContent.needAssistanceBar, pageContentSecond.needAssistanceBar, 2, 1);
    }
}

module.exports.saveUserMenuToWorksheet = function saveUserMenuToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.userMenu) {
        const ws = wb.addWorksheet('User Menu');
        createTable.createHeader(ws, localizationName, styles, 1, 1);
        createTable.createTable(ws, styles, 'UM', pageContent.userMenu, pageContentSecond.userMenu, 2, 1);
    }
}

module.exports.saveMessageToWorksheet = function saveMessageToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.messagePage) {
        const ws = wb.addWorksheet('My Messages Page');
        createTable.createHeader(ws, localizationName, styles, 1, 1);
        createTable.createTable(ws, styles, 'MMP', pageContent.messagePage, pageContentSecond.messagePage, 2, 1);
    }
}

module.exports.saveLoginPageToWorksheet = function saveLoginPageToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.loginPage) {
        const ws = wb.addWorksheet('Login Page');
        createTable.createHeader(ws, localizationName, styles, 1, 1);
        createTable.createTable(ws, styles, 'LP',pageContent.loginPage, pageContentSecond.loginPage, 2, 1);
    }
}

module.exports.saveUploadDocumentToWorksheet = function saveUploadDocumentToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    titleTextPageConverter.titleTextPageConverter(wb, styles, pageContent.uploadDocumentPage, pageContentSecond.uploadDocumentPage, localizationName);
}

module.exports.saveMobileToWorksheet = function saveMobileToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    titleTextPageConverter.titleTextPageConverter(wb, styles, pageContent.mobilePage, pageContentSecond.mobilePage, localizationName);
}


