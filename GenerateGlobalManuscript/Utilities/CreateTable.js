
module.exports.createTable = function createTable(wb, ws, styles, code, subContent, subContentSecond, row, column) {
    const styleOne = wb.createStyle({
        font: {
            color: '#000000',
            size: 12
        },
        border: {
            left: {
                style: 'medium',
                color: '#000000'
            },
            right: {
                style: 'medium',
                color: '#000000'
            },
            top: {
                style: 'medium',
                color: '#000000'
            },
            bottom: {
                style: 'medium',
                color: '#000000'
            }
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
    });
    for (let i = 0;  i < subContent.length; i ++) {
        /// Refference
        ws.cell(row + i, column)
            .string(`${code}${i + 1}`)
            .style(styleOne);
        /// Source
        ws.cell(row + i, column + 1)
            .string('X')
            .style(styleOne);
        /// Text Type
        ws.cell(row + i, column + 2)
            .string('TO ADD')
            .style(styleOne);
        /// Original Lang
        ws.cell(row + i, column + 3)
            .string(subContent[i])
            .style(styleOne);
        /// Second Lang
        subContentSecond ? ws.cell(row + i, column + 4)
                            .string(subContentSecond[i])
                            .style(styleOne)
                        : ws.cell(row + i, column + 4)
                        .string('')
                        .style(styleOne);
    }
};

module.exports.createTableTitle = function createTableTitle(ws, styles, name, row, column) {
    ws.cell(row, column)
        .string(name)
        .style(styles[1]);
};

module.exports.createHeader = function createHeader(wb, ws, styles, localization, row, column) {
    const style = wb.createStyle({
        font: {
            color: '#000000',
            size: 12
        },
        border: {
            left: {
                style: 'medium',
                color: '#000000'
            },
            right: {
                style: 'medium',
                color: '#000000'
            },
            top: {
                style: 'medium',
                color: '#000000'
            },
            bottom: {
                style: 'medium',
                color: '#000000'
            }
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
        fill: {
            type: "pattern",
            bgColor: '#000000' //main color
        }
    });
    ws.cell(row, column)
        .string('Refference')
        .style(style);
    ws.cell(row, column + 1)
        .string('Source')
        .style(style);
    ws.cell(row, column + 2)
        .string('Text Type')
        .style(style);
    ws.cell(row, column+3)
        .string('English')
        .style(style);
    ws.cell(row, column+4)
        .string(localization)
        .style(style);

    ws.column(column).setWidth(30);
    ws.column(column+1).setWidth(30);
    ws.column(column+2).setWidth(30);
    ws.column(column+3).setWidth(30);
    ws.column(column+4).setWidth(30);

    //ws.row(row).Filter();
};