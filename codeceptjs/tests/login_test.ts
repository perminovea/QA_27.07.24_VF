import { url } from "inspector";

Feature('login');

const data = {
    "name": "alex",
    "email": "alex@gmail.com",
    "phone": "69017946032",
    "subject": "booking",
    "description": "Please make a reservation for 3 persons in 2 weeks"
};

Scenario('has current url',  ({ I }) => {
I.amOnPage('');
I.seeInCurrentUrl("https://automationintesting.online/");
});

Scenario('submit form success',  ({ I }) => {
I.amOnPage('');
I.fillField('[data-testid = ContactName]', data.name);
I.fillField('[data-testid = ContactEmail]', data.email);
I.fillField('[data-testid = ContactPhone]', data.phone);
I.fillField('[data-testid = ContactSubject]', data.subject);
I.fillField('[data-testid = ContactDescription]', data.description);
I.forceClick('Submit');
I.see( `Thanks for getting in touch ${data.name}!`)
});

Scenario('check alert submit form without name',  ({ I }) => {
I.amOnPage('');
I.fillField('[data-testid = ContactEmail]', data.email);
I.fillField('[data-testid = ContactPhone]', data.phone);
I.fillField('[data-testid = ContactSubject]', data.subject);
I.fillField('[data-testid = ContactDescription]', data.description);
I.forceClick('Submit');
I.see( `Name may not be blank`)
});

Scenario('submit form success',  ({ I }) => {
I.amOnPage('');
I.fillField('[data-testid = ContactName]', data.name);
I.fillField('[data-testid = ContactEmail]', "1");
I.fillField('[data-testid = ContactPhone]', data.phone);
I.fillField('[data-testid = ContactSubject]', data.subject);
I.fillField('[data-testid = ContactDescription]', data.description);
I.forceClick('Submit');
//pause();
//I.see(`must be a well-formed email address`);
I.see(`должно иметь формат адреса электронной почты`);
});

Scenario('check alert submit incorrect phone',  ({ I }) => {
I.amOnPage('');
I.fillField('[data-testid = ContactName]', data.name);
I.fillField('[data-testid = ContactEmail]', data.email);
I.fillField('[data-testid = ContactPhone]', data.name);
I.fillField('[data-testid = ContactSubject]', data.subject);
I.fillField('[data-testid = ContactDescription]', data.description);
I.forceClick('Submit');
I.see(`Phone must be between 11 and 21 characters.`);
});

Scenario('check alert submit incorrect subject',  ({ I }) => {
I.amOnPage('');
I.fillField('[data-testid = ContactName]', data.name);
I.fillField('[data-testid = ContactEmail]', data.email);
I.fillField('[data-testid = ContactPhone]', data.phone);
I.fillField('[data-testid = ContactSubject]', '111');
I.fillField('[data-testid = ContactDescription]', data.description);
I.forceClick('Submit');
I.see(`Subject must be between 5 and 100 characters.`);
});

Scenario('check alert submit incorrect description',  ({ I }) => {
I.amOnPage('');
I.fillField('[data-testid = ContactName]', data.name);
I.fillField('[data-testid = ContactEmail]', data.email);
I.fillField('[data-testid = ContactPhone]', data.phone);
I.fillField('[data-testid = ContactSubject]', data.subject);
I.fillField('[data-testid = ContactDescription]', '111');
I.forceClick('Submit');
I.see(`Message must be between 20 and 2000 characters.`);
});
