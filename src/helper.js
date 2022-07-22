export function getCarparks(locations) {
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

export function getLocation(event) {
  if (navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    const errormessage = document.getElementById("errorMessage");
    errormessage.textContent = "Geolocation is not supported by this browser.";
  }
}



