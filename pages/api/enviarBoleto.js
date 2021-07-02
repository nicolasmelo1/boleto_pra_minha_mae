const puppeteer = require('puppeteer')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async (req, res) => {

    const browser = await puppeteer.launch({ headless: false, args: ['--disable-dev-shm-usage', '--no-sandbox'] })
    try {
        const page = await browser.newPage()

        await page.setDefaultNavigationTimeout(0); 

        console.log('Making login...')
        // Realiza login
        await page.goto('https://wwws.bradescosaude.com.br/PCBS-LoginSaude/td/inicioLoginEmpresaSaude.do');
        await page.focus('.ceicnpj')
        await page.keyboard.type('53.319.869/0001-60')
        await page.focus('.password')
        await page.keyboard.type('a756211b')
        await page.click('#btnAcessar')
        await page.waitForNavigation({ waitUntil: 'networkidle0' })
        console.log('Finished login, entering carne de pagamento...')

        //Entrou no carne de pagamento
        await page.evaluate(() => {
            document.querySelector('#linkBoleto').click()
        })
        console.log('Now entering carne...')

        await page.waitForNavigation({ waitUntil: 'networkidle0' })
        await sleep(5000)
        await page.evaluate(() => {
            const input = document.querySelector('#fatura_acesso').contentWindow.document.querySelector('tr[id="679917"]').querySelector('input')
            input.checked = true
            
            document.querySelector('#fatura_acesso').contentWindow.document.querySelector('#btn_confirmar').click();
        });
        console.log('Selected account now clicking boleto to download...')
        page.on('console', consoleObj => console.log(consoleObj.text()));
        await sleep(5000)
        /*page.on('request', async request => {
            const newPage = await browser.newPage()
            await newPage.goto(request._url);
        });*/
        await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: '../'});

        await page.evaluate(() => {
            document.querySelector('#fatura_acesso').contentWindow.document.querySelector('.link_download').click()
        });
        console.log('downloaded boleto')
    } finally {
        browser.close()
    }
    res.status(200).json({ name: 'John Doe' })
}
  