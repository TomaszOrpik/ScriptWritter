const electronInstaller = require('electron-winstaller');

const src = __dirname + '\\Script Writer-win32-x64';
const dest = __dirname + '\\Installer';
const icon = __dirname + '\\Images\\icon.ico';
const loadingGif = __dirname + '\\Images\\loading.gif';

create()

async function create() {
try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: src,
      outputDirectory: dest,
      authors: 'My App Inc.',
      exe: 'Script Writer.exe',
      description: 'Script generator for AON clients websites',
      setupIcon: icon,
      loadingGif: loadingGif
    });
    console.log(`Application created at: ${dest}`);
  } catch (e) {
    console.log(`Error occured: ${e.message}`);
  }
}