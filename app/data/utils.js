// @flow

import Promise from 'bluebird';
import sqlite from 'sqlite';

async function testDB() {
  const db = await sqlite.open(':memory:', { Promise });

  await db.run('CREATE TABLE lorem (info TEXT)');

  const stmt = await db.prepare('INSERT INTO lorem VALUES (?)');
  for (let i = 0; i < 10; i += 1) {
    stmt.run(`Ipsum ${i}`);
  }
  await stmt.finalize();

  await db.each('SELECT rowid AS id, info FROM lorem', (...args) => {
    console.log(...args);
  });

  db.close();
}

// This will eventually have multiple exports.
// eslint-disable-next-line import/prefer-default-export
export { testDB };
