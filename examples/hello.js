var wd = require('selenium-node-webdriver');

wd.build(null, function (driver) {
    driver.get('http://www.google.com').
        then(function () {
            return driver.
                findElement(wd.webdriver.By.name('q')).sendKeys('webdriver');
        }).
        then(function () {
            return driver.findElement(wd.webdriver.By.name('btnG')).click();
        }).
        then(function () {
            return driver.getTitle();
        }).
        then(function (title) {
            console.log('Title:', title);
            driver.quit();
        });
});
