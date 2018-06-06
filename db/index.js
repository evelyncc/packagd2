const { Pool } = require('pg');
// pools will use environment variables
// for connection information

const local = {
  user: 'evelynchan',
  host: 'localhost',
  database: 'packagd',
};

const pool = new Pool(local);

pool.connect();

module.exports = pool;
