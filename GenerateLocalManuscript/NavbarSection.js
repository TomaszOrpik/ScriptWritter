const docx = require('docx');
const genThreePool = require('./Utilities/GenerateThreePoolRow');

module.exports.navbarSection = function navbarSection(localizationName, pageContent, pageContentSecond) {

    const userMenuRows = [];
    userMenuRows.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
    for (let i = 0; i<pageContent.userMenu.length; i++) {
        const translation = pageContentSecond.userMenu ? pageContentSecond.userMenu[i] : " ";
        userMenuRows.push(genThreePool.genThreePoolRow('', pageContent.userMenu[i], translation, false));
    }
    
    const mainMenuRows = [];
    mainMenuRows.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
    for (let i = 0; i<pageContent.mainMenu.length; i++) {
        const translation = pageContentSecond.mainMenu ? pageContentSecond.mainMenu[i] : " ";
        mainMenuRows.push(genThreePool.genThreePoolRow('', pageContent.mainMenu[i], translation, false));
    }

    const footerRows = [];
    footerRows.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
    for (let i = 0; i < pageContent.footer.length; i++) {
        const translation = pageContentSecond.footer ? pageContentSecond.footer[i] : " ";
        footerRows.push(genThreePool.genThreePoolRow('', pageContent.footer[i], translation, false));
    }

    const needAssistanceRows = [];
    needAssistanceRows.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
    for (let i = 0; i < pageContent.needAssistanceBar.length; i++) {
        const translation = pageContentSecond.needAssistanceBar ? pageContentSecond.needAssistanceBar[i] : " ";
        needAssistanceRows.push(genThreePool.genThreePoolRow('', pageContent.needAssistanceBar[i], translation, false));
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
                rows: needAssistanceRows,
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