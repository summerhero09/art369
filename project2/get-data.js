var AppScriptUrl = 'https://script.google.com/macros/s/AKfycbw_NWEx6r7dUNFob6rtxFZlGGwGeRK1rD6fog5Wk7tipR3w7r3Xvu57VWhlJuB3tsKO/exec';

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
  var currentTime2 = new Date();
  console.log(currentTime2);
  var currentTime = new Date().getTime();
  console.log(currentTime);  // Logs the Date object

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
        dateObject.setHours(dateObject.getHours() - 5);

        console.log("Date object:", dateObject);  // Logs the Date object

        // If the date string is in UTC, you can handle it by using the Date object's methods.
        // For example, if it's in UTC, use `toLocaleString` to convert to local time.
        var localDateObject = new Date(dateObject.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        console.log("Local date object:", localDateObject);

        var dateObjectTime = localDateObject.getTime();  // Get time in milliseconds
        console.log("Local date object time in milliseconds:", dateObjectTime);

        var timeDifference = currentTime - dateObjectTime;  // Difference in milliseconds
        console.log("Time difference in milliseconds:", timeDifference);

        // Check if the date is within the last 24 hours (24 hours = 86400000 milliseconds)
        if (timeDifference <= 86400000 && timeDifference >= 0) {
          console.log("yay");
          time = true;
          if (timeDifference <= 1800000 && timeDifference >= 0) {
            console.log("new");
            var newMessage = document.createElement("span");  // Create a new <span> element
            newMessage.textContent = "NEW!";  // Set the text content
            listItem.appendChild(newMessage);  // Append the <span> to the listItem
            
          }
          if (timeDifference >= 82800000 ) {
            console.log("danger");
            var dangerMessage = document.createElement("span");  // Create a new <span> element
            dangerMessage.textContent = "About to expire!";  // Set the text content
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
    playButton.textContent = "Play Cat Sounds";
    playButton.onclick = function() {
        playCat(listItem.innerHTML.length);
    }

  

  listItem.appendChild(playButton);

    // Append the <li> element to the "sheetData" element
  if (time == true)
  {
    sheetDataElement.appendChild(listItem);
  }
  
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


function playCat(length){
  const audio = new Audio('audio/meow.mp3'); // Replace with your actual audio file path
 
  for (let i = 0; i < (length / 10); i++) {
      setTimeout(() => {
          audio.play();
      }, i * 500); // Delays each play by 1 second to prevent overlap
  }
}

// Example usage:
getData(AppScriptUrl);

/*function getText (){
  var commentText = document.getElementById("comment").value;
  var name = document.getElementById("name").value;

  if (commentText.trim() === "" || name.trim() === "") {
      alert("Please enter both name and comment.");
      return;
  }

  

  // Create a new paragraph element to hold the comment
  var newComment = document.createElement("p");
  newComment.innerHTML = `${name}:${commentText}`;

  var playButton = document.createElement("button");
  playButton.textContent = "Play Cat Sounds";
  playButton.onclick = function() {
      playCat(commentText.length);
  };

  newComment.appendChild(playButton);

  // Append the new comment to the 'demo' div without erasing previous comments
  document.getElementById("demo").appendChild(newComment);

  // Clear the comment input area after submission
  document.getElementById("comment").value = "";
  document.getElementById("name").value = "";
}
function playCat(length){
  const audio = new Audio('audio/meow.mp3'); // Replace with your actual audio file path
 
  for (let i = 0; i < (length / 5); i++) {
      setTimeout(() => {
          audio.play();
      }, i * 500); // Delays each play by 1 second to prevent overlap
  }
}
</script>*/
