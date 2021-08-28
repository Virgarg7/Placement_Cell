module.exports = function makeDownloadResume({ puppeteer, db }) {
    return async function downloadResume({ id }) {
        //Check Resume with given id present or not
        const response = await db.getResume({ id });
        if(!response){
            return null;
        }
        
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(`http://localhost:3000/student/resume/${id}`, { waitUntil: 'networkidle2' });
        const pdfConfig = {
            format: 'A4',
            printBackground: true,
            margin: { // Word's default A4 margins
                top: '2.54cm',
                bottom: '2.54cm',
                left: '2.54cm',
                right: '2.54cm'
            }
        };
        const pdf = await page.pdf(pdfConfig);
        await browser.close();
        return pdf
    }
}