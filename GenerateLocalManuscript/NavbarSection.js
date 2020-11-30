const docx = require('docx');
const genThreePool = require('./Utilities/GenerateThreePoolRow');

module.exports.navbarSection = function navbarSection(localizationName, pageContent, pageContentSecond) {

    const userMenuRows = [];
    userMenuRows.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
    for (let i = 0; i<userMenu.length; i++) {
        const translation = pageContentSecond.userMenu[i] ? pageContentSecond.userMenu[i] : " ";
        userMenuRows.push(genThreePool.genThreePoolRow('', pageContent.userMenu[i], translation, false));
    }
    
    const mainMenuRows = [];
    mainMenuRows.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
    for (let i = 0; i<mainMenu.length; i++) {
        const translation = pageContentSecond.mainMenu[i] ? pageContentSecond.mainMenu[i] : " ";
        mainMenuRows.push(genThreePool.genThreePoolRow('', pageContent.mainMenu[i], translation, false));
    }

    const footerRows = [];
    footerRows.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
    for (let i = 0; i < footer.length; i++) {
        const translation = pageContentSecond.footer[i] ? pageContentSecond.footer[i] : " ";
        footerRows.push(genThreePool.genThreePoolRow('', pageContent.footer[i], translation, false));
    }

    return {
        children: [
            new docx.Paragraph({
                text: 'Navigation Items',
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
            new docx.Paragraph({
                text: 'Need Assistance Navigation Bar',
                alignment: docx.AlignmentType.LEFT,
                style: "TextRedStyle",
                outlineLevel: 2
            }),
            new docx.Table({
                rows: [
                    genThreePool.genThreePoolRow('', 'English', localizationName, true),
                    genThreePool.genThreePoolRow(
                        'Button', needAssistanceBar[0].text, needAssistanceBar[0].translation, false
                    ),
                    genThreePool.genThreePoolRow(
                        '', needAssistanceBar[1].text, needAssistanceBar[1].translation, false
                    ),
                    genThreePool.genThreePoolRow(
                        '', needAssistanceBar[2].text, needAssistanceBar[2].translation, false
                    ),
                    genThreePool.genThreePoolRow(
                        '', needAssistanceBar[3].text, needAssistanceBar[3].translation, false
                    ),
                    genThreePool.genThreePoolRow(
                        '', needAssistanceBar[4].text, needAssistanceBar[4].translation, false
                    )
                ],
                width: {
                    size: 9250,
                    type: docx.WidthType.DXA
                }
            }),
            new docx.Paragraph({
                text: 'User Menu Navigation',
                alignment: docx.AlignmentType.LEFT,
                style: "TextRedStyle",
                outlineLevel: 2
            }),
            new docx.Table({
                rows: userMenuRows,
                width: {
                    size: 9250,
                    type: docx.WidthType.DXA
                }
            }),
            new docx.Paragraph({
                text: 'Main Navigation',
                alignment: docx.AlignmentType.LEFT,
                style: "TextRedStyle",
                outlineLevel: 2
            }),
            new docx.Table({
                rows: mainMenuRows,
                width: {
                    size: 9250,
                    type: docx.WidthType.DXA
                }
            }),
            new docx.Paragraph({
                text: 'Footer Navigation',
                alignment: docx.AlignmentType.LEFT,
                style: "TextRedStyle",
                outlineLevel: 2
            }),
            new docx.Table({
                rows: footerRows,
                width: {
                    size: 9250,
                    type: docx.WidthType.DXA
                }
            }),
        ]
    }
};