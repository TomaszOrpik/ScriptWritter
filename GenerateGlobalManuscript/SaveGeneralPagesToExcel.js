const createTable = require('./Utilities/CreateTable');

module.exports.saveGeneralPagesToWorksheet = function saveGeneralPagesToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName) {
    const pages = pageContent.generalPages;
    const additionalInfo = {
        positions: [1],
        text: ['title']
    };
    let pagesSecond = null;
    if (isSecond && pageContentSecond.generalPages.length !== 0) {
        pagesSecond = pageContentSecond.generalPages;
    }
    if (pages.length !== 0) {
        for (let i = 0; i < pages.length; i++) {
            const ws = wb.addWorksheet(pages.title);
            createTable.createTable(ws, localizationName, styles, pages.title, additionalInfo, pages, pages, pagesSecond);
        }
    }
}