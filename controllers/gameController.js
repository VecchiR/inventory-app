const gamesDb = require('../db/gameQueries');
const platformsDb = require('../db/platformQueries');
const links = require('../routes/links');

async function getAllGames(req, res) {
    const games = await gamesDb.getAllGames();
    res.render("main", { title: "Mini gameboard", games, links });
};

async function getGame(req, res) {
    const game = await gamesDb.getGame(req.params.gameId);
    const gamePlatforms = await gamesDb.getGamePlatforms(req.params.gameId);
    res.render('game_views/gameDetails', { game: game[0], gamePlatforms });
};

async function updateGameGet(req, res) {
    const game = await gamesDb.getGame(req.params.gameId);
    const platforms = await platformsDb.getAllPlatforms();
    const gamePlatforms = await gamesDb.getGamePlatforms(req.params.gameId);
    res.render('game_views/updateGameForm', { title: "Edit game", game: game[0], platforms, gamePlatforms });
};

async function createGameGet(req, res) {
    const platforms = await platformsDb.getAllPlatforms();
    res.render('game_views/newGameForm', { title: 'New game form', platforms });
};

async function createGamePost(req, res) {
    const title = req.body.title;
    const release_year = req.body.release_year;
    const min_players = req.body.min_players;
    const max_players = req.body.max_players;

    try {
        const gameId = await gamesDb.insertGame(title, release_year, min_players, max_players);

        if (Array.isArray(req.body.platforms)) {
            req.body.platforms.map(async plat => await gamesDb.insertGamePlatform(gameId, Number(plat)));

        }
        else if (req.body.platforms) {
            await gamesDb.insertGamePlatform(gameId, Number(req.body.platforms));
        }

        res.redirect('/');
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error creating game");
    }
};

async function updateGamePost(req, res) {
    const gameId = req.params.gameId;
    const title = req.body.title;
    const release_year = req.body.release_year;
    const min_players = req.body.min_players;
    const max_players = req.body.max_players;
    await gamesDb.updateGame(gameId, title, release_year, min_players, max_players);


    const checkedPlatforms = [];

    if (!req.body.platforms) {
        // somethign
    }

    else if (Array.isArray(req.body.platforms)) {
        req.body.platforms.forEach(p => checkedPlatforms.push(Number(p)));
    }
    else { checkedPlatforms.push(Number(req.body.platforms)); }


    console.log(checkedPlatforms);






    // await gamesDb.test(gameId, checkedPlatforms);
    // res.redirect(`/game/${gameId}/update`);



    await gamesDb.insertGamePlatformsForUpdate(gameId, checkedPlatforms);

    res.redirect(`/game/${gameId}/update`);
    // res.redirect(`/game/${gameId}`);
};

async function deleteGamePost(req, res) {
    const gameId = req.params.gameId;
    await gamesDb.deleteGame(gameId);
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


