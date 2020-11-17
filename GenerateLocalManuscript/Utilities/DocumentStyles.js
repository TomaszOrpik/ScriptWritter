module.exports.Styles = {
    TitleStyle: {
        id: "TitleStyle",
        name: "TitleStyle",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
            size: 72,
            bold: true,
            italics: false,
            color: "black",
        },
        paragraph: {
            spacing: {
                before: 6000,
            },
        },
    },
    SubTitle: {
        id: "SubTitle",
        name: "SubTitle",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
            size: 72,
            bold: true,
            italics: false,
            color: "red",
        },
        paragraph: {
            spacing: {
                before: 120,
            },
        },
    },
    HeadingStyle: {
        id: "HeadingStyle",
        name: "HeadingStyle",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
            size: 32,
            bold: true,
            color: '#1E90FF',
        },
        paragraph: {
            spacing: {
                after: 120,
            }
        }
    },
    TextStyle: {
        id: "TextStyle",
        name: "TextStyle",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
            size: 32,
            bold: false,
            color: 'black',
        },
        paragraph: {
            spacing: {
                before: 320,
                after: 320,
            }
        }
    },
    TextRedStyle: {
        id: "TextRedStyle",
        name: "TextRedStyle",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
            size: 32,
            bold: true,
            color: '#DC143C',
        },
        paragraph: {
            spacing: {
                before: 320,
                after: 320,
            }
        }
    },
    InfoTableTextStyle: {
        id: "InfoTableTextStyle",
        name: "InfoTableTextStyle",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
            size: 22,
            bold: false,
            color: 'black',
        },
        paragraph: {
            spacing: {
                after: 120,
            }
        }
    },
    InfoTableTextBoldStyle: {
        id: "InfoTableTextBoldStyle",
        name: "InfoTableTextBoldStyle",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
            size: 22,
            bold: true,
            color: 'black',
        },
        paragraph: {
            spacing: {
                after: 120,
            }
        }
    },
    InfoTableWhiteTextStyle: {
        id: "InfoTableWhiteTextStyle",
        name: "InfoTableWhiteTextStyle",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
            size: 22,
            bold: true,
            color: 'white',
        },
        paragraph: {
            spacing: {
                after: 120,
            }
        }
    }
}