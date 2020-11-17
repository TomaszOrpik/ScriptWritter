const { dialog } = require('electron');
const e = require('express');

const options = {
    type: 'question',
    buttons: ['Continue', 'Quit'],
    defaultId: 0,
    title: 'There was an Error',
    message: 'The error occured while opening page!',
    detail: 'Document still will be generated, but text from this page will not be saved. Do you want to continue?'
};

module.exports.messageBox = function messageBox(error, failResponse) {
    console.log(error);
    dialog.showMessageBox(null, options, (response) => {
        if (response === 1) window.close();
        else return failResponse;
    })
}