var webdriver = require('selenium-node-webdriver');

var driver = new webdriver.Builder().
    usingServer('http://localhost:4444/wd/hub').
    withCapabilities({
      'browserName': 'phantomjs',
      'version': '',
      'platform': 'ANY',
      'javascriptEnabled': true
    }).
    build();

driver.get('http://www.google.com').
    then(function () {
        return driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
    }).
    then(function () {
        return driver.findElement(webdriver.By.name('btnG')).click();
    }).
    then(function () {
        return driver.getTitle();
    }).
    then(function (title) {
        console.log('Title:', title);
        driver.quit();
    });
