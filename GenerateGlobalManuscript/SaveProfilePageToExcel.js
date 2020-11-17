const createTable = require('./Utilities/CreateTable');
const increase = require('./Utilities/IncreaseCount');

module.exports.saveProfileToWorksheet = function saveProfileToWorksheet(wb, styles, pageContent, isSecond, pageContentSecond, localization) {
    const profile = pageContent.profilePage;
    if (profile != null) {
        let freeColumnTrack = 1;
        const ws = wb.addWorksheet('Profile');
        const profileSecond = isSecond ? pageContentSecond.profilePage : null;
        for (let i = 0; i < profile.length; i++) {
            const additionalInfo = {
                positions: [1, profile[i].inputs.length+1, profile[i].inputs.length+2],
                text: ['Input', 'Warning', 'Title']
            }
            profile[i].inputs.push(profile[i].warning);
            profile[i].inputs.push(profile[i].title);
            if (profileSecond != null) {
                profileSecond[i].inputs.push(profileSecond[i].warning);
                profileSecond[i].inputs.push(profileSecond[i].title);
            }
            createTable.createTable(ws, localization, styles, profile[i].title, additionalInfo, profile[i].inputs, profileSecond[i].inputs, 1, freeColumnTrack);
            freeColumnTrack = increase.increaseColumnTrack(freeColumnTrack);
        }
    }
}