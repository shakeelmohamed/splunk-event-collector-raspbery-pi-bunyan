var bunyan = require("bunyan");
var splunkBunyan = require("splunk-bunyan-logger");

var config = require("./config.json");

var splunkStream = splunkBunyan.createStream(config);

splunkStream.on("error", function(err, context) {
    console.log("Error", err, "Context", context);
});

var Logger = bunyan.createLogger({
    name: "Raspberry Pi logger",
    streams: [
        splunkStream
    ]
});

var event = {
    greeting: "Hello from the land of ARM processors!",
    host: "raspberry-pi",
    number: 0
};

console.log("Starting to send events every 5s");
setInterval(function() {
    console.log("\tsending...");
    event.number++;
    Logger.info(event, "Raspberry Pi Status Report");
}, 2000);
