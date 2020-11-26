const createTable = require('./Utilities/CreateTable');
const increase = require('./Utilities/IncreaseCount');

module.exports.saveClaimOverviewToWorksheet = function saveClaimOverviewToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName) {
    const overview = pageContent.claimOverviewPage;
    let nextRow = 0;
    let claimSecond = null;
    const doubleIsSecond = isSecond && pageContentSecond.claimOverviewPage != null ? true : false;
    if (doubleIsSecond) {
        claimSecond = pageContentSecond.claimOverviewPage;
    }
    if (overview != null) {
        const ws = wb.addWorksheet('Claim Overview');
        createTable.createHeader(ws, localizationName, styles, 1, 1);
        /// general data
        if (overview.pageText != null) {
            const pageTextSecond = null;
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
            createTable.createTableTitle(ws, styles, 'General Data', 2, 1);
            createTable.createTable(ws, styles, 'CGD', overview.pageText.tabsTitles, pageTextSecond, 3, 1);
            nextRow = overview.pageText.tabsTitles.length + 4;
        }
        /// claim details
        if (overview.claimDetails != null) {
            const pageClaimDetailsSecond = null;
            if (doubleIsSecond && claimSecond.claimDetails != null) {
                pageClaimDetailsSecond = claimSecond.claimDetails;
            }
            createTable.createTableTitle(ws, styles, 'Claim Details', nextRow, 1);
            nextRow = nextRow + 1;
            createTable.createTable(ws, styles, 'CCD', overview.claimDetails, pageClaimDetailsSecond, nextRow, 1);
            nextRow = nextRow + overview.claimDetails.length + 1;
        }
        /// my claim summary
        if (overview.myClaimSummaryText != null) {
            const pageClaimSummarySecond = null;
            if (doubleIsSecond && claimSecond.myClaimSummaryText != null) {
                pageClaimSummarySecond = claimSecond.myClaimSummaryText;
            }
            createTable.createTableTitle(ws, styles, 'My Claim Summary', nextRow, 1);
            nextRow = nextRow + 1;
            createTable.createTable(ws, styles, 'CCS', overview.myClaimSummaryText, pageClaimSummarySecond, nextRow, 1);
            nextRow = nextRow + overview.myClaimSummaryText.length + 1;
        }
        ///  my statement text
        if (overview.myStatementText != null) {
            const pageStatementTextSecond = null;
            if (doubleIsSecond && claimSecond.myStatementText != null) {
                pageStatementTextSecond = claimSecond.myStatementText;
            }
            createTable.createTableTitle(ws, styles, 'My Statement', nextRow, 1);
            nextRow = nextRow + 1;
            createTable.createTable(ws, styles, 'CMS', overview.myStatementText, pageStatementTextSecond, nextRow, 1);
        }
    }
}