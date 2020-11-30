const docx = require('docx');
const genThreePool = require('./Utilities/GenerateThreePoolRow');

module.exports.overviewSection = function overviewSection(doc, localizationName, overviewEng, overviewSecond) {
    const modules = [
        new docx.Paragraph({
            text: 'Benefit Overview',
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
        })
    ];
    const rows1 = [];
    rows1.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
    if(overviewSecond === undefined) {
        rows1.push(genThreePool.genThreePoolRow('Title', overviewEng.title, '', true)); 
        for(let i = 0; i < overviewEng.pageText.length; i++) {
            rows1.push(new docx.TableRow({
                children: [
                    new docx.TableCell({
                        children: [new docx.Paragraph({
                            text: '',
                            style: 'InfoTableTextStyle',
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
                            text:  overviewEng.pageText[i],
                            style: 'InfoTableTextStyle',
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
                            text: '',
                            style: 'InfoTableTextStyle',
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
            }))
        };
        for(let i = 0; i < overviewEng.benefits.length; i++) {
            rows1.push(new docx.TableRow({
                children: [
                    new docx.TableCell({
                        children: [new docx.Paragraph({
                            text: '',
                            style: 'InfoTableTextBoldStyle',
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
                            text:  overviewEng.benefits[i].title,
                            style: 'InfoTableTextBoldStyle',
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
                            text: '',
                            style: 'InfoTableTextBoldStyle',
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
            }))
        }
    } else {
        rows1.push(genThreePool.genThreePoolRow('Title', overviewEng.title, overviewSecond.title, true)); 
        for(let i = 0; i < overviewEng.pageText.length; i++) {
            rows1.push(new docx.TableRow({
                children: [
                    new docx.TableCell({
                        children: [new docx.Paragraph({
                            text: '',
                            style: 'InfoTableTextStyle',
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
                            text:  overviewEng.pageText[i],
                            style: 'InfoTableTextStyle',
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
                            text: overviewSecond.pageText[i],
                            style: 'InfoTableTextStyle',
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
            }))
        };
        for(let i = 0; i < overviewEng.benefits.length; i++) {
            rows1.push(new docx.TableRow({
                children: [
                    new docx.TableCell({
                        children: [new docx.Paragraph({
                            text: '',
                            style: 'InfoTableTextBoldStyle',
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
                            text:  overviewEng.benefits[i].title,
                            style: 'InfoTableTextBoldStyle',
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
                            text:  overviewSecond.benefits[i].title,
                            style: 'InfoTableTextBoldStyle',
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
            }))
        }
    }
    modules.push(
        new docx.Table({
            rows: rows1,
            width: {
                size: 9250,
                type: docx.WidthType.DXA
                }
        }),
    );
    for(let j = 0; j < overviewEng.benefits.length; j++) {
        if(overviewSecond === undefined) {
            modules.push(new docx.Paragraph({
                text: overviewEng.benefits[j].title,
                alignment: docx.AlignmentType.LEFT,
                style: "TextRedStyle",
                outlineLevel: 2,
                border: {
                    bottom: {
                     color: "#44a6c6",
                     space: 1,
                     value: "single",
                     size: 6
                    }
                }
            }));
            for(let k = 0; k < overviewEng.benefits[j].summary.length; k++) {
                modules.push(new docx.Paragraph({
                    text: overviewEng.benefits[j].summary[k].subTitle,
                    alignment: docx.AlignmentType.LEFT,
                    style: "TextStyle",
                    outlineLevel: 3,
                    border: {
                        bottom: {
                         color: "#44a6c6",
                         space: 1,
                         value: "single",
                         size: 6
                        }
                    }
                }));
                const tempRows = [];
                tempRows.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
                tempRows.push(genThreePool.genThreePoolRow('Name', overviewEng.benefits[j].summary[k].subTitle, '', true));
                for(let l = 0; l < overviewEng.benefits[j].summary[k].benefitText.length; l++) {
                    tempRows.push(genThreePool.genThreePoolRow('Tab Name', overviewEng.benefits[j].summary[k].benefitText[l].benefitTitle, '', false));
                    tempRows.push(genThreePool.genThreePoolRow('Tab Content', overviewEng.benefits[j].summary[k].benefitText[l].text, '', false))
                }
                modules.push(
                    new docx.Table({
                        rows: tempRows,
                        width: {
                            size: 9250,
                            type: docx.WidthType.DXA
                        }
                    }),
                );
            }
        } else {
            modules.push(new docx.Paragraph({
                text: overviewEng.benefits[j].title,
                alignment: docx.AlignmentType.LEFT,
                style: "TextRedStyle",
                outlineLevel: 2,
                border: {
                    bottom: {
                     color: "#44a6c6",
                     space: 1,
                     value: "single",
                     size: 6
                    }
                }
            }));
            for(let k = 0; k < overviewEng.benefits[j].summary.length; k++) {
                modules.push(new docx.Paragraph({
                    text: overviewEng.benefits[j].summary[k].subTitle,
                    alignment: docx.AlignmentType.LEFT,
                    style: "TextStyle",
                    outlineLevel: 3,
                    border: {
                        bottom: {
                         color: "#44a6c6",
                         space: 1,
                         value: "single",
                         size: 6
                        }
                    }
                }));
                const tempRows = [];
                tempRows.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
                tempRows.push(genThreePool.genThreePoolRow('Name', overviewEng.benefits[j].summary[k].subTitle, overviewSecond.benefits[j].summary[k].subTitle, true));
                for(let l = 0; l < overviewEng.benefits[j].summary[k].benefitText.length; l++) {
                    tempRows.push(genThreePool.genThreePoolRow('Tab Name', overviewEng.benefits[j].summary[k].benefitText[l].benefitTitle, overviewSecond.benefits[j].summary[k].benefitText[l].benefitTitle, false));
                    tempRows.push(genThreePool.genThreePoolRow('Tab Content', overviewEng.benefits[j].summary[k].benefitText[l].text, overviewSecond.benefits[j].summary[k].benefitText[l].text, false))
                }
                modules.push(
                    new docx.Table({
                        rows: tempRows,
                        width: {
                            size: 9250,
                            type: docx.WidthType.DXA
                        }
                    }),
                );
            }
        }
    }
    return { children: modules };
}
