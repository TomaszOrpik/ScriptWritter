const docx = require('docx');

module.exports.TitleSection = function TitleSection(clientName, localizationName) {
    return {
        children: [
            new docx.Paragraph({
                text: clientName,
                alignment: docx.AlignmentType.LEFT,
                style: "HeadingStyle",
                border: {
                    bottom: {
                        color: "#1E90FF",
                        space: 1,
                        value: "single",
                        size: 6
                    },
                }}),
            new docx.Paragraph({
                text: "Local Content Manuscript Document",
                alignment: docx.AlignmentType.RIGHT,
                style: "TitleStyle",
            }),
            new docx.Paragraph({
                text: localizationName,
                alignment: docx.AlignmentType.RIGHT,
                style: "SubTitle",
            }),
        ]
    }
}