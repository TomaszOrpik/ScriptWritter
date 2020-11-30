const docx = require('docx');
const genThreePool = require('./Utilities/GenerateThreePoolRow');

module.exports.ProfileSection = function ProfileSection(localizationName, profilePageEng, profilePageSecond) {
    
    const modules = [
        new docx.Paragraph({
            text: 'Profile',
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

    for(let i = 0; i < profilePageEng.length; i++) {
        modules.push(
            new docx.Paragraph({
                text: profilePageEng[i].title,
                alignment: docx.AlignmentType.LEFT,
                style: "TextRedStyle",
                outlineLevel: 2
            })
        );
        const myRows = [];
        myRows.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
        myRows.push(genThreePool.genThreePoolRow(
            'Title', profilePageEng[i].title, profilePageSecond[i].title
            ));
        myRows.push(genThreePool.genThreePoolRow(
            'Message', profilePageEng[i].warning, profilePageSecond[i].warning
            ));
        for(let j = 0; j < profilePageEng[i].inputs.length; j++) {
            myRows.push(genThreePool.genThreePoolRow(
                '', profilePageEng[i].inputs[j], profilePageSecond[i].inputs[j]
            ));
        }
        modules.push(
            new docx.Table({
                rows: myRows,
                width: {
                    size: 9250,
                    type: docx.WidthType.DXA
                },
                cantSplit: false,
            })
        )
    }

    return {
        children: modules
    }
}
