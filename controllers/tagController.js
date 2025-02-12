const db = require('../db/queries');


async function getAllTags(req, res) {
    const tags = await db.getAlltags();
    console.log(tags);
    res.render("index", { title: "Inventory App", tags });
};

async function getTag(req, res) {
    const tag = await db.gettag(req.params.tagId);
    res.render('tagDetails', { tag: tag[0] });
};

function createTagGet(req, res) {
    res.render('form', { title: 'New tag form' });
};

async function createTagPost(req, res) {
    const username = req.body.tagUser;
    const tag = req.body.tagText;
    await db.inserttag(username, tag);
    res.redirect('/');
};


module.exports = {
    getAllTags,
    getTag,
    createTagGet,
    createTagPost
}


