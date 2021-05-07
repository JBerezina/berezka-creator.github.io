$(document).ready(function(){

    var key = 'AIzaSyBBF7_kHouQt-er1grk-v4t4iU9YbFdaY8';
    var playlistId = 'PLcHIy7MhWjmgA2YfyLc9kQpYOENBB9X_y';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    }
    loadVids();

    function loadVids(){
        $.getJSON(URL, options, function(data){
            console.log(data);
            var id = data.items[0].snippet.resourceId.videoId; 
            

            mainVid(id);
        }) 
    }
   
    function mainVid() {
        
        $('#video').html(`
        <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/"+id title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
        `);
    }

    function resultsLoop(data) {

        var thumb = data.items[0].snippet.thumbnails.medium.url;
        $('main').html(`
        <article>
                <img src="${thumb}"
                alt=""  class="thumb" />
                <div class="details">
                    <h4>Title</h4>
                    <p>I am a description</p>
                </div>
                </article>
        `)

    }
})