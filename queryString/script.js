/*

For more on this, see https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
by Tom Igoe
*/

function setup(event) {
  // get the div into which you'll put the query string parameters:
  let paramsDiv = document.getElementById('queryParams');
  // get the query string:
  const queryString = window.location.search;
  // make it into an object:
  const query = new URLSearchParams(queryString);
// iterate over the entries, extract the key and value:
  for (var pair of query.entries()) {
    paramsDiv.innerHTML += pair[0] + ': ' + pair[1] + '<br>';
  }
  // if there's a query for 'url', say so:
  if (query.get('url') != null) {
    paramsDiv.innerHTML += 'url parameter value is: ' + query.get('url');
  }
}

window.addEventListener('DOMContentLoaded', setup);