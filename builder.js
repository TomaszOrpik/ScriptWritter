const electronInstaller = require('electron-winstaller');

const src = __dirname + '\\Script Writer-win32-x64';
const dest = __dirname + '\\Installer';

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
    console.log(`Application created at: ${dest}`);
  } catch (e) {
    console.log(`Error occured: ${e.message}`);
  }
}