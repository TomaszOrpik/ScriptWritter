const docx = require('docx');

module.exports.countryInfoSection = function countryInfoSection(localizationName) {
    return {
        children: [
            new docx.Paragraph({
                text: 'Country Specific Values',
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
                    text: 'Country Specific Values',
                    alignment: docx.AlignmentType.LEFT,
                    style: "TextStyle"
                }),
                new docx.Table({
                    rows: [
                        generateRow('Field Name', 'Value', true),
                        generateRow('Language', localizationName, false),
                        generateRow('Currency Symbol', "", false),
                        generateRow('Currency Format', "", false),
                        generateRow('Date Format', "", false),
                        generateRow('Maximum Number of Days in the past an event can be declared', "", false),
                        generateRow('Inlegible Population', "", false),
                    ]
                })
        ]
    }
};

function generateRow(leftValue, rightValue, isBold) {
    let bolded = 'InfoTableTextStyle';
    if (isBold) bolded = 'InfoTableTextBoldStyle';
    return new docx.TableRow({
        children: [
            new docx.TableCell({
                children: [new docx.Paragraph({
                    text: leftValue,
                    style: bolded,
                    alignment: docx.AlignmentType.LEFT,
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
                    text: rightValue,
                    style: bolded,
                    alignment: docx.AlignmentType.LEFT
                },)],
                margins: {
                    top: 100,
                    bottom: 100,
                    right: 100,
                    left: 100,
                },
            })
        ]
    })
}