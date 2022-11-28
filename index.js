const puppeteer = require('puppeteer');
const jsdom = require('jsdom');

(async () => {
  try {
    // Se invoca la instancia del puppeteer y accedemos a la url que vamos a escanear
    const browser = await puppeteer.launch() ;
    const page = await browser.newPage();
    const response = await page.goto('https://www.google.com/search?q=bicicletas+mtb');
    const body = await response.text();

    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const { window: { document } } = new jsdom.JSDOM(body);

    // Seleccionamos los títulos y lo mostramos en consola
    document.querySelectorAll('h3')
      .forEach(element => console.log(element.textContent));

    // Cerramos el puppeteer
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();