// TODO: refactor code style architecture 🏗
const router = require("express").Router();
const UrlModel = require("../../DB/model/url.model");
const { BASEURL } = require("../../../env");
const shortid = require("shortid");
const validUrl = require("valid-url");

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const longUrl = body.longUrl;
    if (validUrl.isUri(longUrl)) {
      const check = await UrlModel.findOne({ longUrl });
      if (check) return res.status(200).json({ result: check }).end();
      const urlCode = shortid.generate();
      const shortUrl = BASEURL + urlCode;
      const savedObject = { urlCode, longUrl, shortUrl };
      const newUrl = new UrlModel(savedObject);
      await newUrl.save();
      return res.status(201).json({ result: newUrl }).end();
    }
    return res.status(400).send().end();
  } catch (e) {
    console.error(e);
    return res.status(400).send().end();
  }
});

router.get("/:urlCode", async (req, res) => {
  try {
    const { urlCode } = req.params;
    const checkUrl = await UrlModel.findOne({ urlCode });
    if (!checkUrl) return res.status(400).send().end();
    return res.redirect(checkUrl.longUrl);
  } catch (e) {
    console.error(e);
    return res.status(400).send().end();
  }
});

module.exports = router;
