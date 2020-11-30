const docx = require('docx');
const genThreePool = require('./Utilities/GenerateThreePoolRow');

module.exports.homeSection = function homeSection(doc, localizationName, homePageEng, homePageSecond) {

   const modules = [
       new docx.Paragraph({
           text: 'Home',
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
   if(homePageSecond)
        rows1.push(genThreePool.genThreePoolRow('Title', homePageEng.title, homePageSecond.title));
   else
        rows1.push(genThreePool.genThreePoolRow('Title', homePageEng.title, ''));
   for(let i = 0; i < homePageEng.text.length; i++) {
       if(homePageSecond) 
            rows1.push(genThreePool.genThreePoolRow('', homePageEng.text[i], homePageSecond.text[i]));
       else
            rows1.push(genThreePool.genThreePoolRow('', homePageEng.text[i], ''));
   };
   modules.push(
    new docx.Table({
        rows: rows1,
        width: {
            size: 9250,
            type: docx.WidthType.DXA
                }
        }),
    );

    modules.push(
        new docx.Paragraph({
            text: 'Slider',
            alignment: docx.AlignmentType.LEFT,
            style: "TextRedStyle",
            outlineLevel: 2
        }));
    
    const rows2 = [];
    rows2.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
    for(let i = 0; i < homePageEng.sliderText.length; i++) {
        if(!homePageSecond) {
            rows2.push(genThreePool.genThreePoolRow('Title', homePageEng.titles[i], ''));

            const blob = fetch(homePageEng.sliderText[i].image).then(r => r.blob());
            const image = docx.Media.addImage(doc, blob);
            rows2.push(new docx.TableRow({
                children: [
                    new docx.TableCell({
                        children: [new docx.Paragraph({
                            text: 'Image',
                            style: 'InfoTableTextStyle',
                            alignment: docx.AlignmentType.LEFT,
                        })],
                        margins: {
                            top: 100,
                            bottom: 100,
                            left: 100,
                            right: 100
                        },
                        width: {
                            width: 1322,
                            WidthType: docx.WidthType.DXA
                        }
                    }),
                    new docx.TableCell({
                        children: [new docx.Paragraph(image)],
                        width: {
                            width: 3964,
                            WidthType: docx.WidthType.DXA
                        }
                    }),
                    new docx.TableCell({
                        children: [],
                        width: {
                            width: 3964,
                            WidthType: docx.WidthType.DXA
                        }
                    })
                ],
                width: {
                    size: 9250,
                    type: docx.WidthType.DXA
                }
            }));
        
            rows2.push(genThreePool.genThreePoolRow('Text', homePageEng.sliderText[i].text[0], '', true))
            for(let j = 1; j < homePageEng.sliderText[i].text.length; j++) {
                rows2.push(genThreePool.genThreePoolRow('', homePageEng.sliderText[i].text[j], ''))
            }
        }

        else {
            rows2.push(genThreePool.genThreePoolRow('Title', homePageEng.titles[i], homePageSecond.titles[i], true));

            const blob = fetch(homePageEng.sliderText[i].image).then(r => r.blob());
            const image = docx.Media.addImage(doc, blob);
            rows2.push(new docx.TableRow({
                children: [
                    new docx.TableCell({
                        children: [new docx.Paragraph({
                            text: 'Image',
                            style: 'InfoTableTextStyle',
                            alignment: docx.AlignmentType.LEFT,
                        })],
                        margins: {
                            top: 100,
                            bottom: 100,
                            left: 100,
                            right: 100
                        },
                        width: {
                            width: 1322,
                            WidthType: docx.WidthType.DXA
                        }
                    }),
                    new docx.TableCell({
                        children: [new docx.Paragraph(image)],
                        width: {
                            width: 3964,
                            WidthType: docx.WidthType.DXA
                        }
                    }),
                    new docx.TableCell({
                        children: [],
                        width: {
                            width: 3964,
                            WidthType: docx.WidthType.DXA
                        }
                    })
                ],
                width: {
                    size: 9250,
                    type: docx.WidthType.DXA
                }
            }));
        
            rows2.push(genThreePool.genThreePoolRow('Text', homePageEng.sliderText[i].text[0], homePageSecond.sliderText[i].text[0]))
            for(let j = 1; j < homePageEng.sliderText[i].text.length; j++) {
                rows2.push(genThreePool.genThreePoolRow('', homePageEng.sliderText[i].text[j], homePageSecond.sliderText[i].text[j]))
            }
        }
    };
    modules.push(
        new docx.Table({
            rows: rows2,
            width: {
                size: 9250,
                type: docx.WidthType.DXA
                    }
            }),
    );

    const rows3 = [];

    rows3.push(genThreePool.genThreePoolRow('', 'English', localizationName, true));
    if(!homePageSecond) {
        for(let i = 0; i < homePageEng.modules.length; i++) {
            rows3.push(genThreePool.genThreePoolRow('Title', homePageEng.modules[i].moduleTitle, homePageSecond.modules[i].moduleTitle, true));
            for(let j = 0; j < homePageEng.modules[i].moduleText.length; j++) {
                rows3.push(new docx.TableRow({
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
                                text: homePageEng.modules[i].moduleText[j],
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
            }
        }
    } else {
        for(let i = 0; i < homePageEng.modules.length; i++) {
            rows3.push(genThreePool.genThreePoolRow('Title', homePageEng.modules[i].moduleTitle, homePageSecond.modules[i].moduleTitle, true));
            for(let j = 0; j < homePageEng.modules[i].moduleText.length; j++) {
                rows3.push(new docx.TableRow({
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
                                text: homePageEng.modules[i].moduleText[j],
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
                                text: homePageSecond.modules[i].moduleText[j],
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
            }
        }
    }

    modules.push(
        new docx.Paragraph({
            text: 'Modules',
            alignment: docx.AlignmentType.LEFT,
            style: "TextRedStyle",
            outlineLevel: 2
        }));
        modules.push(
            new docx.Table({
                rows: rows3,
                width: {
                    size: 9250,
                    type: docx.WidthType.DXA
                        }
                }),
        );

    return { children: modules };
}