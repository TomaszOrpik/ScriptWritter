const docx = require('docx');

module.exports.genThreePoolRow = function genThreePoolRow(val1, val2, val3, isBold) {
    let bolded = 'InfoTableTextStyle';
    if (isBold) bolded = 'InfoTableTextBoldStyle';

    return new docx.TableRow({
        children: [
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: val1,
                    style: bolded,
                    alignment: docx.AlignmentType.LEFT,
                },)],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
                width: {
                    width: 1322,
                    WidthType: docx.WidthType.DXA
                }
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: val2,
                    style: bolded,
                    alignment: docx.AlignmentType.LEFT,
                },)],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
                width: 3964,
                WidthType: docx.WidthType.DXA
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: val3,
                    style: bolded,
                    alignment: docx.AlignmentType.LEFT,
                },)],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
                width: 3964,
                WidthType: docx.WidthType.DXA
            }),
        ],
        width: {
            size: 9250,
            type: docx.WidthType.DXA
        }
    })
}