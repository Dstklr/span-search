const validateSearchQuery = function (req, res, next) {
    const query = req.params.term;
    req.searchTerms = query?.toLowerCase().replace(/\s/g, '').split('and') ?? [];
    next();
}

const validateSpanId = function (req, res, next) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('bad input!');
    }
    next();
}

module.exports = { validateSearchQuery, validateSpanId };