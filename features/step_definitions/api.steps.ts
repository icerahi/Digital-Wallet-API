import { Given, When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app';
import mongoose from 'mongoose';
import { envVars } from '../../src/config/env';

let response: any;
let userData: any;
let token: string;

BeforeAll(async function () {
  // Connect to the test database
  const dbUrl = envVars.DB_URL || 'mongodb://localhost:27017/digital-wallet-test';
  await mongoose.connect(dbUrl);
  await mongoose.connection.db?.dropDatabase(); // Clean db for tests
});

AfterAll(async function () {
  await mongoose.disconnect();
});

Given('a new user with phone {string} and password {string}', function (phone, password) {
  userData = {
    fullname: 'Test User',
    phone: phone,
    password: password,
    role: 'USER'
  };
});

When('the user registers', async function () {
  response = await request(app)
    .post('/api/v1/users/register')
    .send(userData);
});

Then('the response status should be {int}', function (status) {
  expect(response.status).to.equal(status);
});

Then('the user should be registered', function () {
  expect(response.body.success).to.be.true;
  expect(response.body.data.phone).to.equal(userData.phone);
});

Then('a wallet should be automatically provisioned', async function () {
  // Query the db directly to verify post-save hook worked
  const Wallet = mongoose.model('Wallet'); // get the compiled model
  const wallet = await Wallet.findOne({ owner: response.body.data._id });
  expect(wallet).to.not.be.null;
  expect(wallet.balance).to.equal(50); // Mongoose default is likely 50
});

Given('the external API endpoint is available', function () {
  // No-op for given, assume server is running
});

When('the user requests the currency rates', async function () {
  response = await request(app)
    .get('/api/v1/external/currency-rates');
});

Then('the response should contain exchange rate data', function () {
  expect(response.body.data).to.exist;
  expect(response.body.data.from).to.equal('USD');
});

Then('the response should include HATEOAS links', function () {
  expect(response.body.links).to.be.an('array');
  expect(response.body.links[0].href).to.include('/api/v1/external/currency-rates');
});
