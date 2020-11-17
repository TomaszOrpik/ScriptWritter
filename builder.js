const electronInstaller = require('electron-winstaller');

const src = 'C:\\Script Writer-win32-x64';
const dest = 'C:\\Installer';

create()

async function create() {
try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: src,
      outputDirectory: dest,
      authors: 'My App Inc.',
      exe: 'Script Writer.exe',
      description: 'to add'
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
}