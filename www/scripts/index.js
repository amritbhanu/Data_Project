// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.


function add_data() {
    
    /*AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: '',
    });*/
    AWS.config = new AWS.Config();
    AWS.config.update({
        region: 'us-west-2',
        endpoint: 'https://dynamodb.us-west-2.amazonaws.com'
    });
    //AWS.config.region = 'us-west-2';
    //AWS.config.endpoint = 'https://dynamodb.us-west-2.amazonaws.com's;
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10', region: 'us-west-2' , endpoint: 'https://dynamodb.us-west-2.amazonaws.com'});
    
    /*AWS.config.update({
        accessKeyId: "AKIAJPTX7RGSQJRJ4NXQ",
        secretAccessKey: "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",
        region: "us-west-2",
        endpoint: "https://dynamodb.us-west-2.amazonaws.com"
    });*/


    var params = {
        TableName: "Movies",
        KeySchema: [
            { AttributeName: "year", KeyType: "HASH" },  //Partition key
            { AttributeName: "title", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "year", AttributeType: "N" },
            { AttributeName: "title", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    dynamodb.createTable(params, function (err, data) {
        if (err) {
            console.log("Got error:", err.message);
            console.log("Request:");
            console.log(this.request.httpRequest);
            console.log("Response:");
            console.log(this.httpResponse);
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        
        //$('#add-data').click(loadScript("scripts/aws-sdk-2.3.3.min.js", add_data));
        $('#add-data').click(add_data);

        //getWeatherWithGeoLocation();

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();
