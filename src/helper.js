function getCarparks(locations) {
  let ppCode = new Set ();
  let uniques=[];
   for (let location of locations) {
        if (!ppCode.has(location.ppCode)) {
            ppCode.add(location.ppCode);
            uniques.push(location);
        }
    }
    return uniques;
}

module.exports = getCarparks;