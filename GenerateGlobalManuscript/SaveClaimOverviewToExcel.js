const createTable = require('./Utilities/CreateTable');
const increase = require('./Utilities/IncreaseCount');

module.exports.saveClaimOverviewToWorksheet = function saveClaimOverviewToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName) {
    const overview = pageContent.claimOverviewPage;
    let claimSecond = null;
    const doubleIsSecond = isSecond && pageContentSecond.claimOverviewPage != null ? true : false;
    if (doubleIsSecond) {
        claimSecond = pageContentSecond.claimOverviewPage;
    }
    if (overview != null) {
        let freeColumnTrack = 1;
        const ws = wb.addWorksheet('Claim Overview');
        /// general data
        if (overview.pageText != null) {
            const pageTextSecond = null;
            const additionalInfo = {
                positions: [1, 2, overview.pageText.length-1, overview.pageText.length],
                text: ['Title', 'Tabs Titles', 'Loading Text', 'Page Title']
            }
            overview.pageText.tabsTitles.push(overview.loadingText);
            overview.pageText.tabsTitles.push(overview.pageText.title);
            if (doubleIsSecond && claimSecond.pageText != null) {
                pageTextSecond = claimSecond.pageText;
                if (claimSecond.loadingText != null) {
                    pageTextSecond.push(claimSecond.loadingText);
                }
                if (claimSecond.pageText.title != null) {
                  pageTextSecond.push(claimSecond.pageText.title);
                }
            }
            createTable.createTable(ws, localizationName, styles, 'General Data', additionalInfo, overview.pageText.tabsTitles, pageTextSecond, 1, freeColumnTrack);
            freeColumnTrack = increase.increaseColumnTrack(freeColumnTrack);
        }
        /// claim details
        if (overview.claimDetails != null) {
            const pageClaimDetailsSecond = null;
            const additionalInfo = {
                positions: [1, 4],
                text: ['Buttons', "Claim Details Table"]
            };
            if (doubleIsSecond && claimSecond.claimDetails != null) {
                pageClaimDetailsSecond = claimSecond.claimDetails;
            }
            createTable.createTable(ws, localizationName, styles, 'Claim Details', additionalInfo, overview.claimDetails, pageClaimDetailsSecond, 1, freeColumnTrack);
            freeColumnTrack = increase.increaseColumnTrack(freeColumnTrack);
        }
        /// my claim summary
        if (overview.myClaimSummaryText != null) {
            const pageClaimSummarySecond = null;
            if (doubleIsSecond && claimSecond.myClaimSummaryText != null) {
                pageClaimSummarySecond = claimSecond.myClaimSummaryText;
            }
            createTable.createTable(ws, localizationName, styles, 'My Claim Summary', null, overview.myClaimSummaryText, pageClaimSummarySecond, 1, freeColumnTrack);
            freeColumnTrack = increase.increaseColumnTrack(freeColumnTrack);
        }
        ///  my statement text
        if (overview.myStatementText != null) {
            const pageStatementTextSecond = null;
            if (doubleIsSecond && claimSecond.myStatementText != null) {
                pageStatementTextSecond = claimSecond.myStatementText;
            }
            createTable.createTable(ws, localizationName, styles, 'My Statement', null, overview.myStatementText, pageStatementTextSecond, 1, freeColumnTrack);
            freeColumnTrack = increase.increaseColumnTrack(freeColumnTrack);
        }
    }
}