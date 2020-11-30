const docx = require('docx');
const FileSaver = require('file-saver');

//imports
const title = require('./Title');
const information = require('./DocumentInformationSection');
const countryInfo = require('./CountrySpecificInfoSection');
const navbar = require('./NavbarSection');
const profile = require('./ProfileSection');
const message = require('./MessageSection');
const home = require('./HomeSection');
const overview = require('./OverviewSection');

const Styles = require('./Utilities/DocumentStyles');

module.exports.createDocument = function createDocument(   
    /////przeformatować cały dokument!!!!!!!!!!!!! add + remove uninputed information + change all to pageContent
    clientName, localizationName, version, reviewedBy, pageContent, pageContentSecond, clientColor) {
    const Style = Styles.createStyles(clientColor);
    /// create new document
    const doc = new docx.Document({
        styles: {
            paragraphStyles: [
                Style.TitleStyle,
                Style.TitleStyle,
                Style.HeadingStyle,
                Style.SubTitle,
                Style.TextStyle,
                Style.InfoTableTextStyle,
                Style.InfoTableWhiteTextStyle,
                Style.TextRedStyle,
                Style.InfoTableTextBoldStyle
            ],
        },
    });

    /// add sections
    /// add title section to document
    doc.addSection(title.TitleSection(clientName, localizationName));
    /// add information section to document
    doc.addSection(information.InfoSection(reviewedBy, version));
    /// add country specific information to document
    doc.addSection(countryInfo.countryInfoSection(localizationName));
    /// add navbar information to document
    doc.addSection(navbar.navbarSection(localizationName, pageContent, pageContentSecond));
    /// add profile section to document
    //doc.addSection(profile.ProfileSection(localizationName, profilePageEng, profilePageSecond));
    /// add message section to document
    //doc.addSection(message.MessageSection(localizationName, messagePageEng, messagePageSecond));
    /// add home section to document
    doc.addSection(home.homeSection(doc, localizationName, pageContent.homePage, pageContentSecond.homePage));
    /// add overview section to document
    //doc.addSection(overview.overviewSection(doc, localizationName, pageContent.overviewPage, pageContentSecond.overviewPage));
    /// save file to desktop
    docx.Packer.toBlob(doc).then(blob => {
        FileSaver.saveAs(blob, `${clientName} ${localizationName} Local Manuscript v${version}.docx`);
    });
}
