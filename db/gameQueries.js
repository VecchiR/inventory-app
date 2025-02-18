const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function getGame(gameId) {
  const { rows } = await pool.query(`SELECT * FROM games WHERE id = ($1)`, [gameId]);
  return rows;
};

async function insertGame(title, release_year, min_players, max_players) {
  const result = await pool.query("INSERT INTO games (title, release_year, min_players, max_players) VALUES ($1, $2, $3, $4) RETURNING id", [title, release_year, min_players, max_players]);
  return result.rows[0].id;
}

async function updateGame(gameId, title, release_year, min_players, max_players) {
  await pool.query("UPDATE games SET (title, release_year, min_players, max_players) = ($2, $3, $4, $5) WHERE  id = ($1)", [gameId, title, release_year, min_players, max_players]);
}

async function deleteGame(gameId) {
  await pool.query("DELETE FROM games WHERE id = ($1)", [gameId]);
}

async function getGamePlatforms(gameId) {
  const { rows } = await pool.query(`
    SELECT name 
    FROM platforms JOIN game_platforms ON (id = platform_id)
    WHERE game_id = ($1)
    `, [gameId]);
  return rows;
}

async function insertGamePlatform(gameId, platformId) {
  await pool.query("INSERT INTO game_platforms (game_id, platform_id) VALUES ($1, $2)", [gameId, platformId]);
}



module.exports = {
  getAllGames,
  getGame,
  insertGame,
  updateGame,
  deleteGame,
  getGamePlatforms,
  insertGamePlatform
};
