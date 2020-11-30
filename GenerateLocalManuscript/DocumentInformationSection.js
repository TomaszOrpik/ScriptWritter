const docx = require('docx');
const dateFormat = require('dateformat');

module.exports.InfoSection = function InfoSection(revivedBy, version) {
    /// return new table
    const date = dateFormat(new Date(), "dd mmm yyyy");

    const tableRow1 = new docx.TableRow({
        children: [
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: 'Version',
                    style: 'InfoTableWhiteTextStyle'
                })],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
                shading: {
                    fill: "#44a6c6",
                    val: docx.ShadingType.PERCENT_100,
                    color: "white",
                },
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: 'Date of Change',
                    style: 'InfoTableWhiteTextStyle'
                })],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
                shading: {
                    fill: "#44a6c6",
                    val: docx.ShadingType.PERCENT_100,
                    color: "white",
                },
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: 'Document Status (Draft, Signed-off, Amended)',
                    style: 'InfoTableWhiteTextStyle'
                })],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
                shading: {
                    fill: "#44a6c6",
                    val: docx.ShadingType.PERCENT_100,
                    color: "white",
                },
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: 'Revised by',
                    style: 'InfoTableWhiteTextStyle'
                })],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
                shading: {
                    fill: "#44a6c6",
                    val: docx.ShadingType.PERCENT_100,
                    color: "white",
                },
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: 'Summary of Changes',
                    style: 'InfoTableWhiteTextStyle'
                })],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
                shading: {
                    fill: "#44a6c6",
                    val: docx.ShadingType.PERCENT_100,
                    color: "white",
                },
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: 'Change Requestor',
                    style: 'InfoTableWhiteTextStyle'
                })],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
                shading: {
                    fill: "#44a6c6",
                    val: docx.ShadingType.PERCENT_100,
                    color: "white",
                },
            }),
        ],
    });
    return {
        children: [
            new docx.Paragraph({
                text: 'Document Information',
                alignment: docx.AlignmentType.LEFT,
                style: "HeadingStyle",
                outlineLevel: 1,
                border: {
                    bottom: {
                        color: "#44a6c6",
                        space: 1,
                        value: "single",
                        size: 6
                    },
                }}),
            new docx.Paragraph({
                text: "Document Change Information",
                alignment: docx.AlignmentType.LEFT,
                style: "TextStyle",
            }),
            new docx.Table({
                rows: [
                    tableRow1,
                    GenerateRow(version,date,'draft',revivedBy,'New Document',''),
                    GenerateRow('','','','','',''),
                    GenerateRow('','','','','',''),
                    GenerateRow('','','','','',''),
                    GenerateRow('','','','','',''),
                ]
            })
        ]
    }
}

function GenerateRow(version, date, status, revised, summary, requestor) {
    return new docx.TableRow({
        children: [
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: version,
                    style: 'InfoTableTextStyle',
                    alignment: docx.AlignmentType.CENTER,
                },)],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: date,
                    style: 'InfoTableTextStyle',
                    alignment: docx.AlignmentType.CENTER,
                })],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: status,
                    style: 'InfoTableTextStyle',
                    alignment: docx.AlignmentType.CENTER,
                })],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: revised,
                    style: 'InfoTableTextStyle',
                    alignment: docx.AlignmentType.CENTER,
                })],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: summary,
                    style: 'InfoTableTextStyle',
                    alignment: docx.AlignmentType.CENTER,
                })],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
            }),
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: requestor,
                    style: 'InfoTableTextStyle',
                    alignment: docx.AlignmentType.CENTER,
                })],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
            }),
        ],
    });
}