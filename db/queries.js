const pool = require("./pool");

async function getAllgames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function getgame(gameId) {  
  const { rows } = await pool.query(`SELECT * FROM games WHERE id = ($1)`, [gameId]);
  console.log(rows);
  return rows;
};

async function insertgame(username, game) {
  await pool.query("INSERT INTO games (username, game) VALUES ($1, $2)", [username, game]);
}




module.exports = {
  getAllgames,
  getgame,
  insertgame,
};
