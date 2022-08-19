const { response } = require("express")

const homeController = {
    show: async function(req, res) {
        try {
            res.send('Home page')
        }catch(err) {
            res.send(err);
        }
    }
}

module.exports = homeController;