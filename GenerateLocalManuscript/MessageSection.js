const docx = require('docx');
const genThreePool = require('./Utilities/GenerateThreePoolRow');

module.exports.MessageSection = function MessageSection(localizationName, messagePageEng, messagePageSecond) {

    const modules = [
        new docx.Paragraph({
            text: 'MessageCenter',
            alignment: docx.AlignmentType.LEFT,
            style: "HeadingStyle",
            outlineLevel: 1,
            border: {
                bottom: {
                    color: "#44a6c6",
                    space: 1,
                    value: "single",
                    size: 6
                }
            }
        }),
    ];

    const myRows = [];
    myRows.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
    myRows.push(genThreePool.genThreePoolRow('Title', messagePageEng[0], messagePageSecond[0]));
    for (let i = 1; i < messagePageEng.length; i++) 
        myRows.push(genThreePool.genThreePoolRow('', messagePageEng[i], messagePageSecond[i]))

    modules.push(
        new docx.Table({
            rows: myRows,
            width: {
                size: 9250,
                type: docx.WidthType.DXA
            }
        }),
    );

    return { children: modules };
}