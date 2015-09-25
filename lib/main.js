// add toggle button to UI
var {
    ToggleButton
} = require("sdk/ui/button/toggle");
// global state variable for the state of this button
var globstate = false;

var button = ToggleButton({
    id: "reftoggle",
    label: "Better Twitter Auto-Refresh",
    icon: {
        "16": "./twitteraf-16.png",
        "32": "./twitteraf-32.png",
        "64": "./twitteraf-64.png"
    },
    onChange: function(state) {
        //console.log(state.label + " checked state: " + state.checked);
        // sets the global state variable to the state of the button
        globstate = state.checked;
        //console.log(globstate);

    },
    onClick: testButton

});

var notifications = require("sdk/notifications");
var self = require("sdk/self");

function testButton(state) {
    // Get the active tab's title.
    require("sdk/tabs").activeTab.reload();
    if (globstate) {
        var myIconURL = self.data.url("twitteraf-64.png");
        notifications.notify({
            title: "Twitter Auto-Refresh",
            text: "No longer auto-refreshing tweets...",
            iconURL: myIconURL,
        });
    } else {
        
        
        var myIconURL = self.data.url("twitteraf-64.png");
        notifications.notify({
            title: "Twitter Auto-Refresh",
            text: "Auto-refreshing tweets when at the top of the timeline",
            iconURL: myIconURL,

        });
    }
}



var data = require("sdk/self").data;

// Match twitter.* pages 

var pageMod = require("sdk/page-mod");


pageMod.PageMod({
    include: "*.twitter.com",
    contentScriptFile: data.url("refresh.js"),
    onAttach: function(worker) {
        //	console.log("inside pagemod: " + globstate);
        // emits the globstate variable to refresh.js
        worker.port.emit("globState", globstate);
        /* does nothing right now
        worker.port.on("globState", function(elementContent) {
            console.log(elementContent);
        }); */
    }
});