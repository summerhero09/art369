var AppScriptUrl = 'https://script.google.com/macros/s/AKfycbzfPwJ-DFePrSc8Ap6f_OoGHUgSp8EDyTkQurt_Y4wYdsYrgajCJjtDFMEx7-ZgEyFG6A/exec';

function getData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Request was successful
        var response = JSON.parse(xhr.responseText);
        // Handle the response data here
         handleData(response);
         console.log(response);
      } else {
        // Request failed
        console.error('Request failed:', xhr.status);
      }
    }
  };
  xhr.send();
}

// this function prints the data to the HTML page.
function handleData(response) {
  var sheetDataElement = document.getElementById("sheetData");

  response.forEach(function(item) {
    // Create a new <li> element
    var listItem = document.createElement("li");
    listItem.className = "entry";
    listItem.style.backgroundColor = randomColor();

    // Iterate over the keys of the object
    Object.keys(item).forEach(function(key) {
      // Create a new <div> element for each key-value pair
      var divKeyValue = document.createElement("div");
      // Set class name as the key
      divKeyValue.className = key;
      // Set innerHTML as the value
      divKeyValue.innerHTML = item[key];
      // Append the <div> element for the key-value pair to the <li> item
      listItem.appendChild(divKeyValue);
    });

    // Append the <li> element to the "sheetData" element
    sheetDataElement.appendChild(listItem);
  });
}
function randomColor() {

    var random = Math.random();
    if (0 < random < 0.25){
      return "#B3E5FC";


    }
    else if (0.25 < random < 0.5){
      return "#C1A4A4";
    }
    else if (0.5 < random < 0.75){
      return "#FFF9C4";
    }
    else if (0.75 < random < 1.0){
      return "#FFCDD2";
    }


}


// Example usage:
getData(AppScriptUrl);


