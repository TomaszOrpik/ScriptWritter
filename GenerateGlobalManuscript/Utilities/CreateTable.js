
module.exports.createTable = function createTable(ws, styles, code, subContent, subContentSecond, row, column) {

    for (let i = 0;  i < subContent.length; i ++) {
        /// Refference
        ws.cell(row + i, column)
            .string(`${code}${i + 1}`)
            .style(styles[0]);
        /// Source
        ws.cell(row + i, column + 1)
            .string('X')
            .style(styles[0]);
        /// Text Type
        ws.cell(row + i, column + 2)
            .string('TO ADD')
            .style(styles[0]);
        /// Original Lang
        ws.cell(row + i, column + 3)
            .string(subContent[i])
            .style(styles[0]);
        /// Second Lang
        subContentSecond ? ws.cell(row + i, column + 4)
                            .string(subContentSecond[i])
                            .style(styles[0])
                        : ws.cell(row + i, column + 4)
                        .string('')
                        .style(styles[0]);
    }
};

module.exports.createTableTitle = function createTableTitle(ws, styles, name, row, column) {
    ws.cell(row, column)
        .string(name)
        .style(styles[1]);
};

module.exports.createHeader = function createHeader(ws, styles, localization, row, column) {
    ws.cell(row, column)
        .string('Refference')
        .style(styles[1]);
    ws.cell(row, column + 1)
        .string('Source')
        .style(styles[1]);
    ws.cell(row, column + 2)
        .string('Text Type')
        .style(styles[1]);
    ws.cell(row, column+3)
        .string('English')
        .style(styles[1]);
    ws.cell(row, column+4)
        .string(localization)
        .style(styles[1]);

    ws.column(column).setWidth(30);
    ws.column(column+1).setWidth(30);
    ws.column(column+2).setWidth(30);
    ws.column(column+3).setWidth(30);
    ws.column(column+4).setWidth(30);

    ws.row(row).Filter();
};