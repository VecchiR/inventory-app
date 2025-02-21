const db = require('../db/tagQueries');
const links = require('../routes/links');



async function getAllTags(req, res) {
    const tags = await db.getAllTags();
    res.render("tag_views/allTags", { title: "Tags", tags, links });
};


async function updateTagGet(req, res) {
    const tag = await db.getTag(req.params.tagId);
    res.render('tag_views/updateTagForm', { title:"Edit tag", tag: tag[0] });
};

function createTagGet(req, res) {
    res.render('tag_views/newTagForm', { title: 'New tag form' });
};

async function createTagPost(req, res) {
    const name = req.body.name;
    await db.insertTag(name);
    res.redirect('/tag');
};

async function updateTagPost(req, res) {
    const tagId = req.params.tagId;
    const name = req.body.name;
    try{    
        await db.updateTag(tagId, name);
    }
    catch (err){
        console.log('the error is in the try catch', err);
    }
    res.redirect('/tag');
};

async function deleteTagPost(req, res) {
    const tagId = req.params.tagId;
    await db.deleteTag(tagId);
    res.redirect('/tag');
};


module.exports = {
    getAllTags,
    createTagGet,
    createTagPost,
    updateTagGet,
    updateTagPost,
    deleteTagPost
}


