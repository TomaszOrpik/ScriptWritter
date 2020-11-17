const createTable = require('./CreateTable');

module.exports.titleTextPageConverter = function titleTextPageConverter(wb, styles, page, pageSecond, localization) {
    if (page != null) {
        const additionalInfo = {
            positions: ['Text', 'Title'],
            text: [1, page.text.length + 1]
        };
        page.text.push(page.title);
        const ws = wb.addWorksheet(page.title);
        if (pageSecond != null) {
            pageSecond.text.push(pageSecond.title);
        }
        createTable.createTable(ws, localization, styles, page.title, additionalInfo, page.text, pageSecond.text, 1, 1);
    }
}