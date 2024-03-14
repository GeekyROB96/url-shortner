const shortid = require('shortid');

const URL = require('../models/url');

async function handleGenerateNewShortUrl(req,res){

    const shortID = shortid.generate().substring(0, 7);


    if(!req.body.url) return res.status(400).json({error : 'No URL provided'});

    await URL.create({
        shortId:shortID,
        redirectURL :req.body.url,
        visitHistory:[],
    });

    return res.json({id:shortID});



}


async function handleGetAnalytics(req,res){
    const shortId  = req.params.shortId;

    const result = await URL.findOne({shortId});

    try{
        return res.json({totalClicks: result.visitHistory.length,
            analytics : result.visitHistory})
    }
    catch(err){
        res.json( { error : "Something  Went Wrong!!" })
    }
    
}

module.exports = {
    handleGenerateNewShortUrl:handleGenerateNewShortUrl,
    handleGetAnalytics:handleGetAnalytics

}