const db = require('../db/queries');


async function getAllGames(req, res) {
    const games = await db.getAllgames();
    console.log(games);
    res.render("main", { title: "Mini gameboard", games });
    res.end();
};

async function getGame(req, res) {
    console.log(req.params.gameId);
    const game = await db.getgame(req.params.gameId);
    console.log(game);
    res.render('gameDetails', { game: game[0] });
};

function createGameGet(req, res) {
    res.render('form', { title: 'New game form' });
};

async function createGamePost(req, res) {
    const username = req.body.gameUser;
    const game = req.body.gameText;
    await db.insertgame(username, game);
    res.redirect('/');
};


module.exports = {
    getAllGames,
    getGame,
    createGameGet,
    createGamePost
}


