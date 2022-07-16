const cacheProvider = require('../services/cacheService');
const verifyCache = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cachedValue = await cacheProvider.get(id);

        if (cachedValue) {
            return res.status(200).json(cachedValue);
        }
        return next();
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = { verifyCache }