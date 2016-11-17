burdenBidderApp.filter('countdown', function() {

    // In the return function, we must pass in a single parameter which will be the data we will work on.
    // We have the ability to support multiple other parameters that can be passed into the filter optionally
    return function(createdDate) {

        var output;

        var currentTime = Date.now();
        var hour = 3600000;
        var interval = currentTime - createdDate;
        var timeLeft = hour - interval;
        var seconds = Math.floor((timeLeft / 1000) % 60);
        var minutes = Math.floor((timeLeft / (60 * 1000)) % 60);

        output = minutes + ':';
        if(seconds.toString().length == 1) {
            seconds = '0' + seconds;
        }
        output += seconds;

        return output;

    }

});