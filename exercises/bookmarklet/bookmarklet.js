alert("Take your time to finish reading this page!");

const links = document.querySelectorAll('a');
var x = 0;

links.forEach(link => {
    link.addEventListener('click', event => {
        
        event.preventDefault();
        x += 1;
    if (x == 1)
    {
    alert("Are you sure you're done reading this page?!");
    links.forEach(link => {
        link.style.color = "rgb(255,0,0)";
    });
} else if (x == 2)
    {
        alert("Are you REALLYYYY sure you're done reading this page?");
        links.forEach(link => {
            link.style.color = "rgb(229,235,52)";
        });
    }
    else if (x == 3)
    {
        alert("Fine, I will let you pass");
        links.forEach(link => {
            link.style.color = "rgb(0,128,0)";
        });
    }
     
        // After 3 clicks, allow navigation
        if (x >= 3) {
            window.location.href = link.href;
        }
    });
});