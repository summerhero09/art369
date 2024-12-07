window.onload = function () {
  show_image(0);
};
index = 0;
var scores = new Array(10).fill(0);
var done = false;

document.body.onkeydown = function(keypress_event){

  var new_element = document.getElementById("key_display");
  new_element.innerHTML = "";
  

  

  if (done == true)
  {
    console.log("entered true");
    var imageDiv = document.getElementById("image");
    imageDiv.innerHTML = "";
    new_element.innerHTML = "";
    return;
  }
  else if (done == false)
  {
    /*var imageDiv = document.getElementById("image");
    imageDiv.innerHTML = "";*/
    new_element.innerHTML = "";

    var key = keypress_event.key;
    var number = Number(key);
    console.log(number);

    if (index >= 9)
    {

      var imageDiv = document.getElementById("image");
      imageDiv.innerHTML = "";

      var inst = document.getElementById("inst");
      inst.innerHTML = "";1
      
      var des_element = document.getElementById("description");
      des_element.innerHTML = "Your Favorite Pokemon!";
  
      let results = search_array(scores);
      for (let i = 0; i < results.length; i++) {
        console.log(results[i]);
        var final = document.getElementById("final");
        var newDiv = document.createElement("div");
  
        // Set the div's innerHTML to a random image
        newDiv.innerHTML = images[results[i]];
        final.append(newDiv);
        console.log("appended final images");

      }
      done = true;
      
    }
    else 
    {
      if (key <= 5) {
        new_element.innerHTML = "really? that low?";
        document.body.style.backgroundColor = "pink";
        scores[index] = key;
        index += 1;
    
        show_image(index);
        
      } else if (key <= 10) {
        new_element.innerHTML = "what a high score!";
        scores[index] = key;
        index += 1;
    
        document.body.style.backgroundColor = "orange";
    
        show_image(index);
      } else {
        
        new_element.innerHTML = "Must input a number!";
      }
    }
     
    
  }
  

};





var images = [
  "<img src='images/pokemon1.png' alt='Random Image'>",
  "<img src='images/pokemon2.png' alt='Random Image'>",
  "<img src='images/pokemon3.png' alt='Random Image'>",
  "<img src='images/pokemon4.png' alt='Random Image'>",
  "<img src='images/pokemon5.png' alt='Random Image'>",
  "<img src='images/pokemon6.png' alt='Random Image'>",
  "<img src='images/pokemon7.png' alt='Random Image'>",
  "<img src='images/pokemon8.png' alt='Random Image'>",
  "<img src='images/pokemon9.png' alt='Random Image'>",
  "<img src='images/pokemon10.png' alt='Random Image'>",
];
  
function show_image(index) {
  // Get the container div
  var imageDiv = document.getElementById("image");

  // Clear previous images
  imageDiv.innerHTML = "";
  // Create a new div for the image
  var newDiv = document.createElement("div");

  // Set the div's innerHTML to a random image
  newDiv.innerHTML = images[index];
  imageDiv.append(newDiv);
  console.log("append image");
}

function search_array(array) {
  let valueToIndices = {}; // Map to store indices for each value
  let highestValue = -Infinity; // Start with the smallest possible value
  let resultIndexes = []; // To store the final result

  // Loop through the array and group indices by value
  for (let i = 0; i < array.length; i++) {
    let value = array[i];
    if (!valueToIndices[value]) {
      valueToIndices[value] = [];
    }
    valueToIndices[value].push(i);
  }

  // Find the group with the highest value and size >= 2
  for (let value in valueToIndices) {
    let indices = valueToIndices[value];
    if (indices.length >= 1 && value > highestValue) {
      highestValue = value; // Update the highest value
      resultIndexes = indices; // Update result to this group's indices
    }
  }

  return resultIndexes;
}