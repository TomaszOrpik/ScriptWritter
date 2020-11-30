# ScriptWritter
Node js + puppeteer app to scrap data from websites

# Introduction
App was created to speed app testing process of AON clients websites. The users inputs main data to login into website (like url address and test employee account) than app opens chromium instance of browser to scrap all the website HTML code and turn it into user friendly xslx/docx script to compare and localize translation and naming issues.

# Setup
To debug application:
1. Make sure you've got nodeJs installed by typing `node -b` in command line
2. Download or clone repository
3. run `npm install` in directory 

### Debug
For debug navigate to app directory and type `npm run start` in command line.

### Build
For build navigate to app directory and type `npm run build` in command line - This will create exe file in installer folder.

# Technologies
Technologies used in application:
[NodeJS](https://nodejs.org/en/)
[ElectronJS](https://www.electronjs.org/)
[Puppeteer](https://pptr.dev/)
[Excel4Node](https://www.npmjs.com/package/excel4node)
[Docx](https://www.npmjs.com/package/docx)

# Code Overview


# Build Status

### TODO:
1. FIX save profile to excel issue
2. Format Excel look
3. Testing on multiple clients + languages combinantions
4. add save screenshots to file

### NOTICED ISSUE:
* Missing enrollment and login page data
* benefit overview isn't saving to word
* additional info doesn't save to excel
