window.onload = function () {
  show_image(0);
};
index = 0;
var arr = new Array(10).fill(0);

document.body.onkeydown = function(keypress_event){

  if (index >= 10)
  {
    // call bracket function here
  }
  
  
  var key = keypress_event.key;
  //document.getElementById("key_display").innerHTML = key;

  var number = Number(key);
  console.log(number);

  var new_element = document.createElement("h1");
  

  
  // turn key into number -> if number 
  // do values, and then respond adequately, and then change the image

  if (key <= 2) {
    new_element.innerHTML = "really? that low?";
    document.body.style.backgroundColor = "pink";
    scores[index] = key;
    index += 1;

    show_image(index);
    
  } else if (key == "g") {
    new_element.innerHTML = key;

    document.body.style.backgroundColor = "orange";
  } else {
    //new_element.innerHTML = key;

    document.body.style.backgroundColor = "rgb(255, 255, 255)";
  }
  /*document.body.append(new_element);*/


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

function search_array{

  var indexes = [];
  
  // Loop through the array and find matching values
  for (let j = 0; j < array.length; j++) {
    value = array[j];
    for (let i = j + 1; i < array.length; i++) {
      if (array[i] === value) {
        indexes.push(i); // Store the index if value matches
      }
    }
  }
  

}