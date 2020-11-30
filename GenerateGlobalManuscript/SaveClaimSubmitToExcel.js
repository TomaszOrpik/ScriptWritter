const createTable = require('./Utilities/CreateTable');
const increase = require('./Utilities/IncreaseCount');

module.exports.saveClaimSubmitToWorksheet = function saveClaimSubmitToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName) {
    const submit = pageContent.claimSubmitPage;
    let nextRow = 0;
    const doubleIsSecond = isSecond && pageContentSecond.claimSubmitPage != null ? true : false;
    if (submit != null) {
        console.log('a')
        const ws = wb.addWorksheet('Claim Submit');
        createTable.createHeader(ws, localizationName, styles, 1, 1);
        /// page text
        if (submit.pageText != null) {
            let pageTextSecond = null;
            const pageText = submit.pageText;
            pageText.push(submit.loadingText);
            if (doubleIsSecond && pageContentSecond.claimSubmitPage.pageText != null) {
                pageTextSecond = pageContentSecond.claimSubmitPage.pageText;
                if (pageTextSecond.claimSubmitPage.loadingText != null) {
                    pageTextSecond.push(pageContentSecond.pageText.loadingText);
                }
            }
            createTable.createTableTitle(ws, styles, 'General Data', 2, 1);
            createTable.createTable(ws, styles, 'CSGD', submit.pageText, pageTextSecond, 3, 1);
            nextRow = submit.pageText + 4;
        }
        /// completed text
        if (submit.completedText != null) {
            let completedTextSecond = null;
            if (doubleIsSecond && pageContentSecond.claimSubmitPage.completedText != null) {
                completedTextSecond = pageContentSecond.claimSubmitPage.completedText;
            }
            createTable.createTableTitle(ws, styles, 'Claim Submitted Page', nextRow, 1);
            nextRow = nextRow + 1;
            createTable.createTable(ws, styles, 'CSSP', submit.completedText, completedTextSecond, nextRow, 1);
        }
    }
}
