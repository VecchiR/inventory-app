const pool = require("./pool");

async function getAllTags() {
  const { rows } = await pool.query("SELECT * FROM tags");
  return rows;
}

async function getTag(tagId) {  
  const { rows } = await pool.query(`SELECT * FROM tags WHERE id = ($1)`, [tagId]);
  return rows;
};

async function insertTag(name) {
  await pool.query("INSERT INTO tags (name) VALUES ($1)", [name]);
}

async function updateTag(tagId, name) {
  await pool.query("UPDATE tags SET name = ($2) WHERE  id = ($1)", [tagId, name]);
}

async function deleteTag(tagId) {
  await pool.query("DELETE FROM tags WHERE id = ($1)", [tagId]);
}


module.exports = {
  getAllTags,
  getTag,
  insertTag,
  updateTag,
  deleteTag
};
