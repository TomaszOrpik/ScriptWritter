const docx = require('docx');
const FileSaver = require('file-saver');

//imports


const Styles = require('./Utilities/DocumentStyles');

module.exports.createDocument = function createDocument(
    clientName, localizationName, version, revivedBy, currencyName, curFormatName, dateName,
    pageContent, pageContentSecond
) {
    /// create new document
    const doc = new docx.Document({
        styles: {
            paragraphStyles: [
                Styles.Styles.TitleStyle,
                Styles.Styles.TitleStyle,
                Styles.Styles.HeadingStyle,
                Styles.Styles.SubTitle,
                Styles.Styles.TextStyle,
                Styles.Styles.InfoTableTextStyle,
                Styles.Styles.InfoTableWhiteTextStyle,
                Styles.Styles.TextRedStyle,
                Styles.Styles.InfoTableTextBoldStyle
            ],
        },
    });
    /*
        global manuscript data:
        local manuscript data:
    */
    /// add sections
    ///CODE
    /// save file to desktop
    docx.Packer.toBlob(doc).then(blob => {
        FileSaver.saveAs(blob, `${clientName} ${localizationName} Local Manuscript v${version}.docx`);
    });
}

/// create global manuscript
///CODE (AS NEW FILE)