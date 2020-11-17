const createTable = require('./Utilities/CreateTable');
const titleTextPageConverter = require('./Utilities/titleTextPageConverter');

module.exports.saveFooterToWorksheet = function saveFooterToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.footer.length != null) {
        const ws = wb.addWorksheet('Footer');
        createTable.createTable(ws, localizationName, styles, 'Footer', null, pageContent.footer, pageContentSecond.footer, 1, 1);
    }
}

module.exports.saveNeedAssistanceBarToWorksheet = function saveNeedAssistanceBarToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.needAssistanceBar != null) {
        const ws = wb.addWorksheet('Need Assistance Bar');
        createTable.createTable(ws, localizationName, styles, 'Need Assistance Bar', null, pageContent.needAssistanceBar, pageContentSecond.needAssistanceBar, 1, 1);
    }
}

module.exports.saveUserMenuToWorksheet = function saveUserMenuToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.userMenu != null) {
        const ws = wb.addWorksheet('User Menu');
        createTable.createTable(ws, localizationName, styles, 'User Menu', null, pageContent.userMenu, pageContentSecond.userMenu, 1, 1);
    }
}

module.exports.saveMainMenuToWorksheet = function saveMainMenuToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.mainMenu != null) {
        const ws = wb.addWorksheet('Main Menu');
        createTable.createTable(ws, localizationName, styles, 'Main Menu', null, pageContent.mainMenu, pageContentSecond.mainMenu, 1, 1);
    }
}

module.exports.saveMessageToWorksheet = function saveMessageToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    if (pageContent.messagePage != null) {
        const ws = wb.addWorksheet('My Messages Page');
        createTable.createTable(ws, localizationName, styles, 'My Messages Page', null, pageContent.messagePage, pageContentSecond.messagePage, 1, 1);
    }
}

module.exports.saveUploadDocumentToWorksheet = function saveUploadDocumentToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    titleTextPageConverter.titleTextPageConverter(wb, styles, pageContent.uploadDocumentPage, pageContentSecond.uploadDocumentPage, localizationName);
}

module.exports.saveMobileToWorksheet = function saveMobileToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName) {
    titleTextPageConverter.titleTextPageConverter(wb, styles, pageContent.mobilePage, pageContentSecond.mobilePage, localizationName);
}


