const db = require('../db/queries');


async function getAllMessages(req, res) {
    const messages = await db.getAllMessages();
    console.log(messages);
    res.render("index", { title: "Mini Messageboard", messages });
};

async function getMessage(req, res) {
    const message = await db.getMessage(req.params.messageId);
    res.render('messageDetails', { message: message[0] });
};

function createMessageGet(req, res) {
    res.render('form', { title: 'New message form' });
};

async function createMessagePost(req, res) {
    const username = req.body.messageUser;
    const message = req.body.messageText;
    await db.insertMessage(username, message);
    res.redirect('/');
};


module.exports = {
    getAllMessages,
    getMessage,
    createMessageGet,
    createMessagePost
}


