const xl = require('excel4node');
const electron = require('electron');
const dialog = require('electron').remote.dialog;

const createWorksheets = require('./CreateWorksheets');
const saveGeneralPagesToExcel = require('./SaveGeneralPagesToExcel');
const saveBenefitStatementToExcel = require('./SaveBenefitStatementToExcel');
const saveClaimOverviewToExcel = require('./SaveClaimOverviewToExcel');
const saveClaimSubmitToWorksheet = require('./SaveClaimSubmitToExcel');
const saveProfilePageToExcel = require('./SaveProfilePageToExcel');

const addStyles = require('./Utilities/AddStyles');

module.exports.createExcel = function CreateExcel(clientName, localizationName, version, pageContent, pageContentSecond, clientColor) {
    const desktopPath = (electron.app || electron.remote.app).getPath('desktop'); //to remove?
    const name = `/${clientName} ${localizationName} Local Manuscript v${version}.xlsx`;
    const wb = new xl.Workbook();
    const isSecond = pageContentSecond != null ? false : true;
    /// Styles definitions
    const styles = addStyles.addStyles(wb, clientColor);

    ///1.login2.BenefitOverview - stringi3.Enrollent4.Profile5.Footer6.Claims7.TRS8.OtherPages

    /// create Login Page worksheet
    createWorksheets.saveLoginPageToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName);
    /// create Forgot Password worksheet
    ///CODE
    /// create Benefit Overview strings worksheet
    ///CODE TO ADD(TYLKO STRINGI)
    /// create Need Assistance Bar worksheet
    createWorksheets.saveNeedAssistanceBarToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName);
    /// create User Menu worksheet
    createWorksheets.saveUserMenuToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName);
    /// create Main Menu worksheet
    //createWorksheets.saveMainMenuToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName); ///idzie do local
    /// create Footer worksheet
    createWorksheets.saveFooterToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName);
    /// create Profile Page worksheet
    //saveProfilePageToExcel.saveProfileToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName); //ERROR ///TO DO (Cannot read 0 of undefined)
    /// create Message Page worksheet
    createWorksheets.saveMessageToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName);
    /// create Home Page worksheet
    ///CODE ...LEAVE FOR NOW SINCE IT'S TO BIG FOR EXCEL idzie do local
    /// create overview Page worksheet
    ///CODE ...LEAVE FOR NOW SINCE IT'S TO BIG FOR EXCEL idzie do local
    /// create Claim Overview Worksheet
    saveClaimOverviewToExcel.saveClaimOverviewToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName);
    /// create Claim Submit Worksheet
    saveClaimSubmitToWorksheet.saveClaimSubmitToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName);
    /// create Upload Document worksheet
    //createWorksheets.saveUploadDocumentToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName); //ERROR ///TO DO
    /// create Mobile Page worksheet
    //createWorksheets.saveMobileToWorksheet(wb, styles, pageContent, pageContentSecond, localizationName); //ERROR ///TO DO
    /// create Wellbeing Page worksheet
    ///CODE
    /// create Enrollment Page worksheet
    ///CODE TO ADD NOW
    /// create Benefit Statement Worksheet
    //saveBenefitStatementToExcel.saveBenefitStatementToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName); ///TO DO
    /// create Trs Page worksheet
    ///CODE
    /// create general Pages worksheets
    saveGeneralPagesToExcel.saveGeneralPagesToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName); ///NOT FINISH CHECK NOTES IN FILE

    const path = dialog.showSaveDialogSync(null, {
        defaultPath: desktopPath+name
    });

    wb.write(path);
}