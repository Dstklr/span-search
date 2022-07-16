const processSearchQuery = function (req, res, next) {
    const query = req.params.term;
    req.searchTerms = query?.toLowerCase().replace(/\s/g, '').split('and') ?? [];
    next();
}

module.exports = processSearchQuery;