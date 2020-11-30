const createTable = require('./CreateTable');

module.exports.titleTextPageConverter = function titleTextPageConverter(wb, styles, page, pageSecond, localization) {
    if (page) {
        page.text.push(page.title);
        const ws = wb.addWorksheet(page.title);
        if (pageSecond) {
            pageSecond.text.push(pageSecond.title);
        }
        createTable.createTable(ws, styles, page.title.substring(0, 3).toLocaleUpperCase(), page.text, pageSecond.text, 1, 1);
    }
}