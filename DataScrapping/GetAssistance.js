module.exports.getAssistance = async function getAssistance(page) {
    
    const floatingHeader = await page.evaluate(() => {
        return document.querySelector('div#floating-header');
    });
    if(floatingHeader != null) {
        return await page.evaluate(() => {
            const div = document.getElementById('floating-header').innerText;
            const text = div.split("\n");
            text.push(document.getElementById('search-box').value);
            const textFormatted = text.filter(e => e !== "");
            return textFormatted;
        })
    }
}
