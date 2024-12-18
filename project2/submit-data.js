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

(function() {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail
      = form.dataset.email || ""; // no email by default

    return {data: formData, honeypot: honeypot};
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }

    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Redirect to corkboard.html after submission
        window.location.href = 'corkboard.html';  // Redirect to corkboard.html

        // Commented out code to avoid displaying the thank-you message
        /*
        form.reset();
        var formElements = form.querySelector(".form-elements")
        if (formElements) {
          formElements.style.display = "none"; // Hide form
        }
        var thankYouMessage = form.querySelector(".thankyou_message");
        if (thankYouMessage) {
          thankYouMessage.style.display = "block"; // Display thank you message
        }
        */
      }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);
  }
  
  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();
