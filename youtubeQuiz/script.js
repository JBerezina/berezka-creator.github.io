$(document).ready(function(){

    var key = 'AIzaSyBBF7_kHouQt-er1grk-v4t4iU9YbFdaY8';
    var playlistId = 'PLcHIy7MhWjmgA2YfyLc9kQpYOENBB9X_y';
    var URL = 'https://www.googleapis.com/youtube/v3/playlists';

    var options = {
        part: 'snippet',
        key: 'AIzaSyBBF7_kHouQt-er1grk-v4t4iU9YbFdaY8',
        maxResults: 20,
        playlistId: playlistId
    }
    loadVids();

    function loadVids(){
        $.getJSON(URL, options, function(data){
            console.log(data)
        })
        
    }


})