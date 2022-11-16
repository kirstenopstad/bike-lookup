// Business Logic
export function getBikes(location) {
  return new Promise(function(resolve,reject) {
    let request = new XMLHttpRequest();
    const url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${location}&distance=10&stolenness=proximity`;
    request.addEventListener("loadend", function() {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve([response, location]);
      } else {
        reject([this, response, location]);
      }
    });
    request.open("GET", url, true);
    request.send();
  });
}

export function bikeCount(location) {
  return new Promise(function(resolve, reject) {
    let request  = new XMLHttpRequest();
    const url = `https://bikeindex.org:443/api/v3/search/count?location=${location}&distance=10&stolenness=stolen`;
    request.addEventListener("loadend", function() {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve([response, location]);
      } else {
        reject([this, response, location]);
      }
    });
    request.open("GET", url, true);
    request.send();
  });
}