module.exports.formatText = function formatText(text) {
    const textFormattedA = text.replace('	','');
    const textFormattedB = textFormattedA.replace('                    ', '');
    const textFormattedC = textFormattedB.replace('                                    ', '');
    const textFormattedD = textFormattedC.replace('                        ', '');
    const textArr = textFormattedD.split("\n");
    const textFilOne = textArr.filter(el => el != "");
    const textFillTwo = textFilOne.filter(el => el != " ");
    const textFillA = textFillTwo.filter(el => el != "");
    const texxtFillB = textFillA.filter(el => el !== " ")
    const textFillC = texxtFillB.filter(el => el !== "   ");
    const textFillD = textFillC.filter(el => el !== "    ");
    const textFillE = textFillD.filter(el => el !== "                            ");
    const textFillF = textFillE.filter(el => el !== "                        ");
    const textFillG = textFillF.filter(el => el !== "                    ");
    const textFillH = textFillG.filter(el => el !== "                        *");
    const textFillI = textFillH.filter(el => el !== "  ");
    const textFillJ = textFillI.filter(el => el !== "        ");
    const textFillK = textFillJ.filter(el => el !== "            ");
    const textFillL = textFillK.filter(el => el !== "             ");
    const textFillM = textFillL.filter(el => el !== "                ");
    const textFillN = textFillM.filter(el => el !== "                            *");
    const textFillO = textFillN.filter(el => el != "         ");
    const textFillP = textFillO.filter(el => el != "             ");
    const textFillR = textFillP.filter(el => el !== "                      ");
    const textFillS = textFillR.filter(el => el !== "                                ");
    const textFillT = textFillS.filter(el => el !== "                   ");
    const textFillU = textFillT.filter(el => el !== "             ");
    const textFillV = textFillU.filter(el => el !== "*");
    
    return textFillV;
}