const createTable = require('./Utilities/CreateTable');

module.exports.saveGeneralPagesToWorksheet = function saveGeneralPagesToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName) {
    const pages = pageContent.generalPages;
    let pagesSecond = null;
    if (isSecond && pageContentSecond.generalPages.length !== 0) {
        pagesSecond = pageContentSecond.generalPages;
    }
    if (pages.length !== 0) {
        const ws = wb.addWorksheet('General Pages');
        createTable.createHeader(ws, styles, localizationName, 1, 1);
        for (let i = 0; i < pages.length; i++) {
            //add title to array
            createTable.createTableTitle(ws, styles, pages[i].title, i + 2, 1);
            createTable.createTable(ws, styles, `${GP}${i + 1}`, pages[i].text, pagesSecond[i].text, i + 3, 1);
        }
    }
}