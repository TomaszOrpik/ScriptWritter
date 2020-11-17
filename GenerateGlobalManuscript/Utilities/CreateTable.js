
module.exports.createTable = function createTable(ws, localization, styles, name, additionalInfo, subContent, subContentSecond, row, column) {
    createTableTitle(ws, styles, name, row, column);
    createHeader(ws, styles, localization, row + 1, column);

        for(let i = 0; i < subContent.length; i++) {
            if (additionalInfo != null) {
                for (let j = 0; j < additionalInfo.length; i++) {
                    if (additionalInfo[j] === i) {
                        ws.cell(row + 2 + i, column)
                            .string(additionalInfo[j].text)
                            .style(styles[0]);
                    }
                }
            }

            ws.cell(row + 2 + i, column + 1)
                .string(subContent[i])
                .style(styles[0]);
            if (subContentSecond != null && subContent.indexOf(subContent[i]) <= subContentSecond.length) {
                ws.cell(row + 2 + i, column + 2)
                    .string(subContentSecond[i])
                    .style(styles[0]);
            }
        }
};
function createTableTitle(ws, styles, name, row, column) {
    ws.cell(row, column)
        .string('Table Name')
        .style(styles[2]);
    ws.cell(row, column + 1)
        .string(name)
        .style(styles[2]);
};

function createHeader(ws, styles, localization, row, column) {
    ws.cell(row, column)
        .string('Additional Info')
        .style(styles[1]);
    ws.cell(row, column+1)
        .string('English')
        .style(styles[1]);
    ws.cell(row, column+2)
        .string(localization)
        .style(styles[1]);

    ws.column(column).setWidth(30);
    ws.column(column+1).setWidth(30);
    ws.column(column+2).setWidth(30);
};