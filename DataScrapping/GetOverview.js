module.exports.getOverview = async function getOverview(page, navTitle) {
    const title = navTitle;
    let pageText = [];
    let benefits;

    pageText = await page.evaluate(() => {
        const texts = [];
        const spans = document.getElementsByClassName('filter')[0].querySelectorAll('span');
        spans.forEach(el => texts.push(el.innerText));
        const inputPlaceholder = document.getElementsByClassName('filter')[0].querySelector('input').placeholder;
        texts.push(inputPlaceholder);
        const fixedTexts = texts.filter(el => el != "");
        return fixedTexts;
    })

    benefits = await page.evaluate(() => {
        const overview = document.getElementById('overviewAccordion').getElementsByClassName('panel');
        const overviewArr = Array.from(overview);

        let overviewList = overviewArr.map(el => {
            const title = el.getElementsByClassName('group-title')[0].textContent;
            const overviewSummaryTitle = el.getElementsByClassName('overviewSummaryList')[0];
            const overviewSummaryTitleArray = Array.from(overviewSummaryTitle.children);

            let summary = overviewSummaryTitleArray.map(el => {
                el.getElementsByClassName('know-more-link')[0].click();
                const benefitTitle = 'Summary';
                const subTitle = el.getElementsByClassName('summaryTitle')[0].textContent.replace(/  +/g,'').split("\u21b5").join('');
                const text = el.getElementsByClassName('summaries')[0].textContent.replace(/  +/g,'');
                const benefitText = [];
                const selectorsRaw = document.getElementsByClassName('tab-selector')[0];
                const selectorsArr = Array.from(selectorsRaw.children);
                let selectors = selectorsArr.map(el => el.innerText);
                const panelBody = document.getElementsByClassName('pannel-body-full')[0].children;
                for (let i = 0; i < selectors.length; i++) {
                    const benefitTitle = selectors[i];
                    const text = panelBody[i].innerText;
                    benefitText.push({benefitTitle, text});
                }

                benefitText.push({benefitTitle, text});

                return { subTitle, benefitText };
                
            });
            return { title, summary };
        });
        return overviewList;
    });
    return { title, pageText, benefits};
}