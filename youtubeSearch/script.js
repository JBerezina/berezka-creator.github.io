$(document).ready(function(){


    var API_KEY="AIzaSyAEHX8Fv1RLEWVKWFzzk7QlB-2mb1RsvVo";

    var video= ''
  

    console.log(API_KEY)
    $("#form").submit(function(event){
        event.preventDefault()
        var search=$("#search").val()

        videoSearch(API_KEY, search, 10)
    })

    function videoSearch(key, search, maxResults){

        $("#videos").empty()

        $.get("https://www.googleapis.com/youtube/v3/search?key="+ key
        + "&type=video&part=snippet&maxResults="+ maxResults
         + "&q="+ search, function(data){
            console.log(data)

            data.items.forEach(item => {
                video =`
                <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  

                `
                $("#videos").append(video)
                
            })
        })
    }
})