const { countryEnum } = require('../db/enums');
const { CommunityApplication } = require('../db/community_application');
const { Router } = require('express');
const router = new Router();


router.get('/', (req, res) => {
    return res.send('dildo');
})

router.post('/', (req, res) => {
    CommunityApplication(req.body.formData)
    .save(
        (error) => {
            if (error) return res.status(422).json('fail');
            return res.json('got it brah');
        }
    );  
});

module.exports = router;