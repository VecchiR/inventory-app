const db = require('../db/platformQueries');
const links = require('../routes/links');



async function getAllPlatforms(req, res) {
    const platforms = await db.getAllPlatforms();
    res.render("platform_views/allPlatforms", { title: "Platforms", platforms, links });
};


async function updatePlatformGet(req, res) {
    const platform = await db.getPlatform(req.params.platformId);
    res.render('platform_views/updatePlatformForm', { title:"Edit platform", platform: platform[0] });
};

function createPlatformGet(req, res) {
    res.render('platform_views/newPlatformForm', { title: 'New platform form' });
};

async function createPlatformPost(req, res) {
    const name = req.body.name;
    await db.insertPlatform(name);
    res.redirect('/platform');
};

async function updatePlatformPost(req, res) {
    const platformId = req.params.platformId;
    const name = req.body.name;
    try{    
        await db.updatePlatform(platformId, name);
    }
    catch (err){
        console.log('the error is in the try catch', err);
    }
    res.redirect('/platform');
};

async function deletePlatformPost(req, res) {
    const platformId = req.params.platformId;
    await db.deletePlatform(platformId);
    res.redirect('/platform');
};


module.exports = {
    getAllPlatforms,
    createPlatformGet,
    createPlatformPost,
    updatePlatformGet,
    updatePlatformPost,
    deletePlatformPost
}


