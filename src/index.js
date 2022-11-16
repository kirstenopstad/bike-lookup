import { getBikes, bikeCount } from '../src/js/find-bikes';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic
function getBikeData(location) {
  let promise = getBikes(location);
  promise.then(function(bikeDataArray) {
    printResults(bikeDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function getBikeCount(location) {
  let promise = bikeCount(location);
  promise.then(function(bikeCountArray) {
    printCount(bikeCountArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

// UI Logic
function replaceNull(dataPoint) {
  if (dataPoint === null) {
    return dataPoint = 'Unknown';
  } else {
    return dataPoint;
  }
}

function convertDate(utcDate) {
  if (utcDate === null) {
    return utcDate = 'Unknown';
  } else {
    let date = new Date(utcDate * 1000);
    // utcString = date.toUTCString();
    // time = utcString.slice(-11, -4);
    return date;
  }
}

function printCount(data) {
  let bikeCount = data["0"].proximity;
  let p = document.createElement('p');
  p.innerText = `There have been ${bikeCount} registered bikes stolen within 10 miles of ${data['1']}`;
  document.querySelector('#showResponse').prepend(p);
}

function printResults(data) {
  let h2 = document.createElement('h2');
  h2.innerText = `Bikes stolen within 10 miles of ${data['1']}`;
  document.querySelector('#showResponse').append(h2);
  let ul = document.createElement('ul');
  ul.setAttribute('class', 'list-group');
  let bikeList = data["0"].bikes;
  // TypeError: Cannot read properties of undefined (reading 'forEach')
  // data[0] gets to api response
  bikeList.forEach((bike, index, array) => {
    let li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    // link to stolen bike info page
    let a = document.createElement('a');
    let url = array[index].url;
    a.setAttribute('href', url);
    li.append(a);
    a.innerText = `${array[index].title}`
    let p = document.createElement('p');
    p.innerText = `Stolen From: ${replaceNull(bike.stolen_location)}
    Date Stolen: ${convertDate(bike.date_stolen)}`;
    li.append(p);
    ul.append(li);
  });
  document.querySelector('#showResponse').append(ul);
}

function printError(error) {
  document.querySelector('#showResponse').append(`There was an error accessing the weather data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`);
}

function handleFormSubmission (event) {
  event.preventDefault();
  const location = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  document.querySelector('#showResponse').innerText = null;
  getBikeData(location);
  getBikeCount(location);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener('submit', handleFormSubmission);
});