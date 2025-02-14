const db = require('../db/gameQueries');
const links = require('../routes/links');

async function getAllGames(req, res) {
    const games = await db.getAllGames();
    res.render("main", { title: "Mini gameboard", games, links });
};

async function getGame(req, res) {
    const game = await db.getGame(req.params.gameId);
    const gamePlatforms = await db.getGamePlatforms(req.params.gameId);
    console.log(gamePlatforms);
    res.render('game_views/gameDetails', { game: game[0], gamePlatforms });
};

async function updateGameGet(req, res) {
    console.log(req.params.gameId);
    const game = await db.getGame(req.params.gameId);
    console.log(game);
    res.render('game_views/updateGameForm', { title: "Edit game", game: game[0] });
};

function createGameGet(req, res) {
    res.render('game_views/newGameForm', { title: 'New game form' });
};

async function createGamePost(req, res) {
    const title = req.body.title;
    const release_year = req.body.release_year;
    const min_players = req.body.min_players;
    const max_players = req.body.max_players;
    await db.insertGame(title, release_year, min_players, max_players);
    res.redirect('/');
};

async function updateGamePost(req, res) {
    const gameId = req.params.gameId;
    const title = req.body.title;
    const release_year = req.body.release_year;
    const min_players = req.body.min_players;
    const max_players = req.body.max_players;
    await db.updateGame(gameId, title, release_year, min_players, max_players);
    res.redirect('/');
};

async function deleteGamePost(req, res) {
    const gameId = req.params.gameId;
    await db.deleteGame(gameId);
    res.redirect('/');
};


module.exports = {
    getAllGames,
    getGame,
    createGameGet,
    createGamePost,
    updateGameGet,
    updateGamePost,
    deleteGamePost
}


