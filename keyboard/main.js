window.onload = show_image(0);
index = 0;

document.body.onkeydown = function(keypress_event){
  var key = keypress_event.key;
  document.getElementById("key_display").innerHTML = key;

  var new_element = document.createElement("h1");
  

  // turn key into number -> if number 
  // do values, and then respond adequately, and then change the image

  if (key == "1") {
    new_element.innerHTML = "really? that low?";
    document.body.style.backgroundColor = "pink";
  } else if (key == "g") {
    new_element.innerHTML = key;

    document.body.style.backgroundColor = "orange";
  } else {
    new_element.innerHTML = key;

    document.body.style.backgroundColor = "rgb(255, 255, 255)";
  }
  document.body.append(new_element);


};





var images = [
  "<img src='images/cat1.jpg' alt='Random Image'>",
  "<img src='images/cat2.jpg' alt='Random Image'>",
  "<img src='images/cat3.jpg' alt='Random Image'>",
  "<img src='images/cat4.jpg' alt='Random Image'>",
  "<img src='images/cat5.jpg' alt='Random Image'>",
  "<img src='images/cat6.jpg' alt='Random Image'>",
  "<img src='images/cat7.jpg' alt='Random Image'>",
  "<img src='images/cat8.jpg' alt='Random Image'>",
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