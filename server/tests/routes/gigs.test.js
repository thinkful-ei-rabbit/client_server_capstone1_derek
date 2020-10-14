const knex = require('knex');
const app = require('../../src/app');

describe('Route: Gigs router', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'db',
      connection: TEST_DB_URL
    });
    app.set('db', db);
  });

  before('cleanup', () => db.cleanTables(db))

  afterEach('cleanup', () => db.cleanTables(db))

  after('disconnect from db', () => db.destroy())

  describe('GET /gigs', () => {});

  describe('GET /gigs/:id', () => {});

  describe('POST /gigs', () => {});

  describe('PATCH /gigs/:id', () => {});

  describe('DELETE /gigs/:id', () => {});
})