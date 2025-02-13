const db = require('../db/queries');


async function getAllGames(req, res) {
    const games = await db.getAllGames();
    console.log(games);
    res.render("main", { title: "Mini gameboard", games });
    res.end();
};

async function getGame(req, res) {
    console.log(req.params.gameId);
    const game = await db.getGame(req.params.gameId);
    console.log(game);
    res.render('gameDetails', { game: game[0] });
};

async function updateGameGet(req, res) {
    console.log(req.params.gameId);
    const game = await db.getGame(req.params.gameId);
    console.log(game);
    res.render('updateGameForm', { title:"Edit game", game: game[0] });
};

function createGameGet(req, res) {
    res.render('newGameForm', { title: 'New game form' });
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


module.exports = {
    getAllGames,
    getGame,
    createGameGet,
    createGamePost,
    updateGameGet,
    updateGamePost
}


