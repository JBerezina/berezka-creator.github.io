
$(document).ready(function(){


    var API_KEY="AIzaSyAEHX8Fv1RLEWVKWFzzk7QlB-2mb1RsvVo";

    var video= ''
  
    var playlistId = 'PLcHIy7MhWjmgA2YfyLc9kQpYOENBB9X_y';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
    var options = {
             part: 'snippet',
             key: API_KEY,
             maxResults: 20,
             playlistId: playlistId
         }
         loadVids();
    
         function loadVids(){
             $.getJSON(URL, options, function(data){
                 console.log(data);
                 var id = data.items[0].snippet.resourceId.videoId; 
            
                 resultsLoop(data);

                 function resultsLoop(data) {

                             $.each(data.items, function(i, item){
                    
                                 var thumb = item.snippet.thumbnails.medium.url;
                                 var title=item.snippet.title;
                                 var desc = item.snippet.description.substring(0, 100);
                                 var vid=item.snippet.resourceId.videoId;
                                
                                 $('main').append(`
                                 <article class="item" data-key="${vid}">
                                         <img src="${thumb}"
                                         alt=""  class="thumb" />
                                         <div class="details">
                                             <h4>${title}</h4>
                                             <p>${desc}</p>
                                         </div>
                                         </article>
                                 `);
                             })
         }

        });
    }






    //SEARCH VIDEOS
    $("#form").submit(function(event){
        event.preventDefault()
        var search=$("#search").val()

        videoSearch(API_KEY, search, 10)
    })

    function videoSearch(key, search, maxResults){
        $("#video").empty()

        $("#videos").empty()

        $.get("https://www.googleapis.com/youtube/v3/search?key="+ key
        + "&type=video&part=snippet&maxResults="+ maxResults
         + "&q="+ search, function(data){
            
            console.log(data)

            data.items.forEach(item => {

                var thumb = item.snippet.thumbnails.medium.url;
                var title=item.snippet.title;
                var desc = item.snippet.description.substring(0, 100);
                var vid=item.id.videoId;
            

                video =`
                <article class="item" data-key="${vid}">
                    <img src="${thumb}"
                     alt=""  class="thumb" />
                     <div class="details">
                         <h4>${title}</h4>
                         <p>${desc}</p>
                     </div>
                     </article>
                `
                $("#videos").append(video)
                
            })
        })
   
   
   
    }


    $('main').on('click', 'article', function (){
                 var id = $(this).attr('data-key');
                console.log("Pushed")


                $('#video').html(`
                         <iframe width="560" height="315" 
                         src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="display: block"></iframe>  
                         `);


             });
})