// spec.js
var angularHomepage = require('./AngularHomepage');

describe('Protractor Demo App', function() {
    var firstNumber = element(by.model('first'));
    var secondNumber = element(by.model('second'));
    var goButton = element(by.id('gobutton'));
    var latestResult = element(by.binding('latest'));
    var history = element.all(by.repeater('result in memory'));
    
    function add(a,b) {
        firstNumber.sendKeys(a);
        secondNumber.sendKeys(b);
        goButton.click();
    }

    beforeEach(function() {
        browser.get('http://juliemr.github.io/protractor-demo/');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Super Calculator');
    });

    it('should add one and two', function() {
        firstNumber.sendKeys(1);
        secondNumber.sendKeys(2);

        goButton.click();

        expect(latestResult.getText()).toEqual('3');
    });

    it('should add four and six', function() {
        firstNumber.sendKeys(7);
        secondNumber.sendKeys(3);

        goButton.click();
        expect(latestResult.getText()).toEqual('10');
    });
    
    it('should get history', function () {
        add(1, 2);
        add(3, 4);

        expect(history.count()).toEqual(2);
        expect(history.last().getText()).toContain('1 + 2');
        expect(history.first().getText()).toContain('7');

        add(5, 6);

        expect(history.count()).toEqual(3); // This is wrong!
    });

    it('should read the value from an input', function() {
        firstNumber.sendKeys(1);
        expect(firstNumber.getAttribute('value')).toEqual('1');
    });

    //activity without Page Object
    it('should greet the named user', function() {
        // Load the AngularJS homepage.
        browser.get('http://www.angularjs.org');

        // Find the element with ng-model matching 'yourName' - this will
        // find the <input type="text" ng-model="yourName"/> element - and then
        // type 'Julie' into it.
        element(by.model('yourName')).sendKeys('Julie');

        // Find the element with binding matching 'yourName' - this will
        // find the <h1>Hello {{yourName}}!</h1> element.
        var greeting = element(by.binding('yourName'));

        // Assert that the text element has the expected value.
        // Protractor patches 'expect' to understand promises.

        expect(greeting.getText()).toEqual('Hello Julie!');
    });

    //Example of Page Object
    it('should greet the named user', function() {
        angularHomepage.get();

        angularHomepage.setName('Julie');

        expect(angularHomepage.getGreetingText()).toEqual('Hello Julie!');
    });
});