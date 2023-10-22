function parseId(id) {
    return parseInt(id.split('-')[1]);
}

module.exports = parseId;