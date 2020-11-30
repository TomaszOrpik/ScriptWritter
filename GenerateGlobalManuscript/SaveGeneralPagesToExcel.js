const createTable = require('./Utilities/CreateTable');

module.exports.saveGeneralPagesToWorksheet = function saveGeneralPagesToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName) {
    const pages = pageContent.generalPages;
    let pagesSecond = null;
    if (isSecond && pageContentSecond.generalPages) {
        pagesSecond = pageContentSecond.generalPages;
        pagesSecond.generalPages.text.push(pagesSecond.generalPages.title);
    }
    if (pages) {
        const ws = wb.addWorksheet('General Pages');
        createTable.createHeader(ws, styles, localizationName, 1, 1);
        for (let i = 0; i < pages.length; i++) {
            pages.text.push(pages.title);
            createTable.createTableTitle(ws, styles, pages[i].title, i + 2, 1);
            createTable.createTable(ws, styles, `${GP}${i + 1}`, pages[i].text, pagesSecond[i].text, i + 3, 1);
        }
    }
}