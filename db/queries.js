const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function getGame(gameId) {  
  const { rows } = await pool.query(`SELECT * FROM games WHERE id = ($1)`, [gameId]);
  console.log(rows);
  return rows;
};

async function insertGame(title, release_year, min_players, max_players) {
  await pool.query("INSERT INTO games (title, release_year, min_players, max_players) VALUES ($1, $2, $3, $4)", [title, release_year, min_players, max_players]);
}




module.exports = {
  getAllGames,
  getGame,
  insertGame,
};
