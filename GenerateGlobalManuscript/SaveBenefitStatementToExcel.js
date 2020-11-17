const createTable = require('./Utilities/CreateTable');

module.exports.saveBenefitStatementToWorksheet = function saveBenefitStatementToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localizationName) {
    const statement = pageContent.benefitStatementPage;
    let statementSecond = null;
    if (isSecond && pageContentSecond.benefitStatementPage != null) {
        statementSecond = pageContentSecond.benefitStatementPage;
    }
    if (statement != null) {
        const ws = wb.addWorksheet('Benefit Statement');
        createTable.createTable(ws, localizationName, styles, 'Benefit Statement', null, statement, statementSecond, 2, 1);
    }
};