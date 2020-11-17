const createTable = require('./Utilities/CreateTable');
const increase = require('./Utilities/IncreaseCount');

module.exports.saveClaimSubmitToWorksheet = function saveClaimSubmitToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName) {
    const submit = pageContent.claimSubmitPage;
    const doubleIsSecond = isSecond && pageContentSecond.claimSubmitPage != null ? true : false;
    if (submit != null) {
        let freeColumnTrack = 1;
        const ws = wb.addWorksheet('Claim Submit');
        /// page text
        if (submit.pageText != null) {
            let pageTextSecond = null;
            const pageText = submit.pageText;
            const additionalInfo = {
                positions: [submit.pageText.length + 1],
                text: ['Loading']
            }
            pageText.push(submit.loadingText);
            if (doubleIsSecond && pageContentSecond.claimSubmitPage.pageText != null) {
                pageTextSecond = pageContentSecond.claimSubmitPage.pageText;
                if (pageTextSecond.claimSubmitPage.loadingText != null) {
                    pageTextSecond.push(pageContentSecond.pageText.loadingText);
                }
            }
            createTable.createTable(ws, localizationName, styles, 'General Data', additionalInfo, submit.pageText, pageTextSecond, 1, freeColumnTrack);
            freeColumnTrack = increase.increaseColumnTrack(freeColumnTrack);
        }
        /// completed text
        if (submit.completedText != null) {
            let completedTextSecond = null;
            if (doubleIsSecond && pageContentSecond.claimSubmitPage.completedText != null) {
                completedTextSecond = pageContentSecond.claimSubmitPage.completedText;
            }
            createTable.createTable(ws, localizationName, styles, 'Claim Submitted Page', null, submit.completedText, completedTextSecond, 1, freeColumnTrack);
            freeColumnTrack = increase.increaseColumnTrack(freeColumnTrack);
        }
    }
}
