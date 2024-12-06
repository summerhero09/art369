var AppScriptUrl = 'https://script.google.com/macros/s/AKfycbw_NWEx6r7dUNFob6rtxFZlGGwGeRK1rD6fog5Wk7tipR3w7r3Xvu57VWhlJuB3tsKO/exec';

// Function to retrieve a value from localStorage and check expiry
function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
      return null; // Item does not exist
  }
  const item = JSON.parse(itemStr);
  const now = new Date();

  // If the item has expired, remove it and return null
  if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
  }
  return item.value;
}

// Function to check login status
function checkLoginStatus() {
  const currentUser = getWithExpiry("loggedInUser");
  if (!currentUser) {
      /*alert("Session expired or not logged in. Redirecting to login page.");*/

      var messageTextElement = document.createElement("p");
      messageTextElement.className = "login";
      messageTextElement.className = "highlight";
      messageTextElement.textContent = "Not Logged In";

      var newDiv = document.createElement("div");

      var imgElement = document.createElement("img");
      imgElement.src = 'images/cat3.jpg';  // Set the source of the image
      imgElement.alt = 'Random Image';     // Set the alt text for the image
      
      imgElement.className="wrongCat";

      // Append the image to the div
      newDiv.appendChild(imgElement);

      // Append the div to the message text element
      messageTextElement.appendChild(newDiv);
      document.body.innerHTML = "";
      document.body.append(messageTextElement);

      setTimeout(function() {
        window.location.href = "password.html"; // Redirect to protected page
    }, 3000); // 2000 milliseconds = 2 seconds
  }
}

// Check login status when the page loads
window.onload = checkLoginStatus;

var pressed = false;

function animationPause(){
  var notes = document.querySelectorAll(".entry");
    console.log("called");
  if (pressed == false)
  {
    notes.forEach(note => {
        note.style.animationPlayState = "paused";
        
    });
    pressed = true;
  }
  else
  {
    notes.forEach(note => {
      note.style.animationPlayState = "running";
      
  });
  pressed = false;
  
}
}

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

function getCurrentTimeInNYC() {
  
    // Get the current time in NYC as a Date object
    var nycTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    
    // Convert the string back to a Date object
    var dateObject = new Date(nycTime);
    console.log("Current time in NYC (as Date object):", dateObject);
    
    return dateObject;  // Return the Date object
}


// this function prints the data to the HTML page.
function handleData(response) {
  var sheetDataElement = document.getElementById("sheetData");

  var time;

  response.forEach(function(item) {
    // Create a new <li> element
    var listItem = document.createElement("div");
    listItem.className = "entry";
    listItem.style.backgroundColor = randomColor();

    // Iterate over the keys of the object
    Object.keys(item).forEach(function(key) {
      // Create a new <div> element for each key-value pair
      var divKeyValue = document.createElement("div");
      divKeyValue.style.backgroundColor = listItem.style.backgroundColor;
      // Set class name as the key
      divKeyValue.className = key;    
      console.log("Timestamp found:", key);
      if (key === 'Timestamp')
      {
        //var timestamp = new Date(item[key]).getTime();  // Convert the Timestamp to milliseconds
        console.log("Timestamp found:", item[key]);
        var dateString = item[key];  // "18/11/2024 19:51:07"
        var parts = dateString.split(' ');  // Split date and time
        var dateParts = parts[0].split('/');  // Split the date part (DD/MM/YYYY)
        var timeParts = parts[1].split(':');  // Split the time part (HH:MM:SS)
        
        // Construct a new Date object (month is 0-based in JavaScript)
        var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
      
        console.log("Date object:", dateObject);  // Logs the Date object

        var localDateObject = getCurrentTimeInNYC();
        console.log("Local date object:", localDateObject);
        
        var dateObjectTime = localDateObject.getTime();  // Get time in milliseconds
        console.log("Local date object time in milliseconds:", dateObjectTime);

        var timeStampTime = dateObject.getTime();  // Get time in milliseconds
        console.log("Timestamp time gotten in milliseconds:", timeStampTime);

        var timeDifference = dateObjectTime - timeStampTime;  // Difference in milliseconds
        console.log("Time difference in milliseconds:", timeDifference);

        // Check if the date is within the last 24 hours (24 hours = 86400000 milliseconds)
        if (timeDifference <= 86400000 && timeDifference >= 0) {
          console.log("yay");
          time = true;
          if (timeDifference <= 1800000 && timeDifference >= 0) {
            console.log("new");
            var newMessage = document.createElement("span");  // Create a new <span> element
            newMessage.className = "recent";
            newMessage.textContent = "NEW!";  // Set the text content
            listItem.appendChild(newMessage);  // Append the <span> to the listItem
          }
          if (timeDifference >= 82800000 ) {
            console.log("danger");
            var dangerMessage = document.createElement("span");  // Create a new <span> element
            dangerMessage.className="danger";
            dangerMessage.textContent = "Expiring!";  // Set the text content
            listItem.appendChild(dangerMessage);  // Append the <span> to the listItem
          }
        }  
        else {
          console.log("Not within 24 hours");
          time = false;
        }
      
      }
      // Set innerHTML as the value
      divKeyValue.innerHTML = item[key];     
      // Append the <div> element for the key-value pair to the <li> item
      listItem.appendChild(divKeyValue);
    });

    var playButton = document.createElement("button");
    playButton.className = "catbutton";
    playButton.textContent = "Press Cat?";
    playButton.onclick = function() {
      const messageElement = listItem.querySelector(".message");

      // Get the text content of the message and calculate its length
      const messageText = messageElement.textContent.trim(); // Remove any extra whitespace
      
      console.log("Message text:", messageText);
      //console.log("Message length:", messageLength);
  
      playCat(messageText);
    }


    listItem.appendChild(playButton);

    if (time == true)
    {
      sheetDataElement.appendChild(listItem);
    }
  
  });
}
function randomColor() {
  var random = Math.random();
  if (random < 0.25) {
      console.log("random color: green");
      return "#c1e8de";
  }
  else if (random < 0.5) {
      console.log("random color: yellow");
      return "#e5ebb2";
  }
  else if (random < 0.75) {
      console.log("random color: red");
      return "#e8c8c1";
  }
  else {
      console.log("random color: blue");
      return "#c5d4e8";
  }
}
let isPlaying = false;

function playCat(messageText){

  if (isPlaying) {
    console.log("Audio is already playing. Please wait.");
    return;
  }
   
  isPlaying = true;
  
  var audios = [
      'audio/meow1.mp3',
  'audio/meow2.mp3',
  'audio/meow3.m4a',
  'audio/meow4.mp3',
  'audio/meow5.mp3',
  'audio/meow6.mp3',
  'audio/meow7.mp3',
  'audio/meow8.mp3',
  'audio/meow9.m4a',
  'audio/meow10.mp3'

  ]
  function randomAudio(){
    return Math.floor(Math.random() * audios.length);
  }
  const randomIndex = randomAudio();
  const audio = new Audio(audios[randomIndex]); // Select a random audio file
  const length = messageText.length;

  console.log("Selected audio:", audios[randomIndex]);

  // Determine the total number of plays
  const isSpecialAudio = [2, 6, 8].includes(randomIndex); // Indices for meow3, meow7, and meow9
  const totalPlays = isSpecialAudio ? 1 : Math.ceil(length / 10);

  console.log("Will play", totalPlays, "time(s)");

  let playCount = 0; // Counter for the number of times audio has been played

  audio.addEventListener("ended", () => {
    playCount++;
    if (playCount < totalPlays) {
      audio.currentTime = 0; // Reset audio to the start
      audio.play(); // Play again
    } else {
      isPlaying = false; // Reset the flag once all plays are complete
    }
  });

  audio.play();

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
  
    function random_image() {
      return Math.floor(Math.random() * images.length);
    }
    
    function show_random_image() {
      // Get the container div
      var catDiv = document.getElementById("cat");
    
      // Clear previous images
      catDiv.innerHTML = "";
    
      // Create a new div for the image
      var newDiv = document.createElement("div");
    
      // Set the div's innerHTML to a random image
      newDiv.innerHTML = images[random_image()];
      
      // Get the img element
      var newImage = newDiv.firstChild;

      var messageTextElement = document.createElement("p");
      messageTextElement.className = "catmessage";
      messageTextElement.textContent = messageText; // Assign the messageText to the element
    
      // Add the img to the catDiv
      catDiv.appendChild(newImage);
      catDiv.appendChild(messageTextElement);
    
      // Add the visible class to trigger fade-in
      requestAnimationFrame(() => {
        newImage.classList.add("visible");
        messageTextElement.classList.add("visible");
      });
    
      // Remove the image after 2 seconds
      setTimeout(() => {
        newImage.classList.remove("visible");
        messageTextElement.classList.remove("visible");
        setTimeout(() => {
          catDiv.innerHTML = "";
        }, 3000); // Matches the fade-out duration
      }, 4000); // Duration to keep the image visible
  }
  show_random_image();
}

// Example usage:
getData(AppScriptUrl);


