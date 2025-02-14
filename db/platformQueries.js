const pool = require("./pool");

async function getAllPlatforms() {
  const { rows } = await pool.query("SELECT * FROM platforms");
  return rows;
}

async function getPlatform(platformId) {  
  const { rows } = await pool.query(`SELECT * FROM platforms WHERE id = ($1)`, [platformId]);
  console.log(rows);
  return rows;
};

async function insertPlatform(name) {
  await pool.query("INSERT INTO platforms (name) VALUES ($1)", [name]);
}

async function updatePlatform(platformId, name) {
  await pool.query("UPDATE platforms SET name = ($2) WHERE  id = ($1)", [platformId, name]);
} // well, LOOK AT THIS...nice huh

async function deletePlatform(platformId) {
  await pool.query("DELETE FROM platforms WHERE id = ($1)", [platformId]);
}


module.exports = {
  getAllPlatforms,
  getPlatform,
  insertPlatform,
  updatePlatform,
  deletePlatform
};
