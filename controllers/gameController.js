const gamesDb = require('../db/gameQueries');
const platformsDb = require('../db/platformQueries');
const tagsDb = require('../db/tagQueries');
const links = require('../routes/links');

async function getAllGames(req, res) {
    const games = await gamesDb.getAllGames();
    res.render("main", { title: "All Games", games, links });
};

async function getGame(req, res) {
    const game = await gamesDb.getGame(req.params.gameId);
    const gamePlatforms = await gamesDb.getGamePlatforms(req.params.gameId);
    const gameTags = await gamesDb.getGameTags(req.params.gameId);
    res.render('game_views/gameDetails', { game: game[0], gamePlatforms, gameTags });
};

async function updateGameGet(req, res) {
    const game = await gamesDb.getGame(req.params.gameId);
    const platforms = await platformsDb.getAllPlatforms();
    const tags = await tagsDb.getAllTags();
    const gamePlatforms = await gamesDb.getGamePlatforms(req.params.gameId);
    const gameTags = await gamesDb.getGameTags(req.params.gameId);
    res.render('game_views/updateGameForm', { title: "Edit game", game: game[0], platforms, gamePlatforms, tags, gameTags });
};

async function createGameGet(req, res) {
    const platforms = await platformsDb.getAllPlatforms();
    const tags = await tagsDb.getAllTags();
    res.render('game_views/newGameForm', { title: 'New game form', platforms, tags });
};

async function createGamePost(req, res) {
    const title = req.body.title;
    const release_year = req.body.release_year;
    const min_players = req.body.min_players;
    const max_players = req.body.max_players;
    const image_url = req.body.image_url;

    try {
        const gameId = await gamesDb.insertGame(title, release_year, min_players, max_players, image_url);

        if (Array.isArray(req.body.platforms)) {
            req.body.platforms.map(async plat => await gamesDb.insertGamePlatform(gameId, Number(plat)));

        }
        else if (req.body.platforms) {
            await gamesDb.insertGamePlatform(gameId, Number(req.body.platforms));
        }
        
        if (Array.isArray(req.body.tags)) {
            req.body.tags.map(async tag => await gamesDb.insertGameTag(gameId, Number(tag)));

        }
        else if (req.body.tags) {
            await gamesDb.insertGameTag(gameId, Number(req.body.tags));
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
    const image_url = req.body.image_url;
    await gamesDb.updateGame(gameId, title, release_year, min_players, max_players, image_url);


    const checkedPlatforms = [];
    const checkedTags = [];


    if (Array.isArray(req.body.platforms)) {
        req.body.platforms.forEach(p => checkedPlatforms.push(Number(p)));
    }
    else if (req.body.platforms) { checkedPlatforms.push(Number(req.body.platforms)); }

    if (Array.isArray(req.body.tags)) {
        req.body.tags.forEach(t => checkedTags.push(Number(t)));
    }
    else if(req.body.tags) { checkedTags.push(Number(req.body.tags)); }


    await gamesDb.insertGamePlatformsForUpdate(gameId, checkedPlatforms);
    await gamesDb.insertGameTagsForUpdate(gameId, checkedTags);

    res.redirect(`/game/${gameId}`);
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


