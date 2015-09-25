var globstate = null;
// gets the globstate variable from main.js
self.port.on("globState", function(globstate) {
  
  document.documentElement.addEventListener('DOMNodeInserted', function(e){
	  //detects if there is a new tweets bar at the top of the page
  if (document.getElementsByClassName("new-tweets-bar").length) {
  		// if the button is enabled, proceed to get the scroll position 
  		if (globstate) {
			// gets the scroll position
  			var scrollPos = document.documentElement.scrollTop;
			// while the scroll position === 0 / user is a top of the page, then proceed to automatically click the new tweets bar
			while (scrollPos === 0) {
				document.getElementsByClassName('new-tweets-bar')[0].click();
				}
			}
		}
}, false);

 });
 




