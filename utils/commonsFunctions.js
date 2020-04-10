function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = {
    isEmpty,
    asyncForEach
};
