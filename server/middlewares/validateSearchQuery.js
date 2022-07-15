const validateQuery = function (req, res, next) {
    const query = req.params.term;
    const result = query?.toLowerCase().replace(/\s/g, '').split('and') ?? [];
    console.log("🚀 ~ file: validateSearchQuery.js ~ line 4 ~ validateQuery ~ result", result);

    req.searchTerms = result;
    next();
}

module.exports = validateQuery;