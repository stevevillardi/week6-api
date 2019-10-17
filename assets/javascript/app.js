$(document).ready(function(){
    const apiKey = "xuofrQG4JGoKO0Xj7k2lMPizRYbg6zzw";
    const apiURL = "https://api.giphy.com/v1/gifs"
    let rating= "G";
    let limit= 25;
    let query= "funny";
    let trendingURL = `${apiURL}/trending?api_key=${apiKey}&limit=10&rating=${rating}`;
    let getData = [];

    function buildTrendingList(gifs){
        for(i =0 ; i < gifs.length ; i++){
            console.log(gifs[i].images.fixed_height_small_still.url);
            $("#trending-list").append(`<img class="trending-image" data-id="${i}" data-gid="${gifs[i].id}" src="${gifs[i].images.fixed_height_small_still.url}" />`);
        }
    }
    function createPreview(){
        //$("#gif-detail").empty();
        let gifID = $(this).attr("data-gid");
        let queryURL = `${apiURL}/${gifID}?api_key=${apiKey}`;


        $.ajax({
            method: "GET",
            url: queryURL
        })
        .then(function(data) {
            console.log(data)
            $("#g-detail").empty()
            $("#g-detail-img").empty()
            let title = $("<p>").text(`Title: ${data.data.title}`)
            let rating = $("<p>").text(`Rating: ${data.data.rating}`)
            let source = $("<p>").text(`GIF Source: ${data.data.source}`)
            let url = $("<p>").text(`GIPHY URL: ${data.data.url}`)
            $("#g-detail").append(title,rating,source,url)

            let image = $("<img>").attr("src",data.data.images.original.url)
            $("#g-detail-img").append(image)
            //title
            //rating
            //source
            //url
        });


        $(".bd-example-modal-lg").modal('toggle');
    }

    function loadTrendingList(){
        $.ajax({
            method: "GET",
            url: trendingURL
        })
        .then(function(data) {
            console.log(data.data);
            buildTrendingList(data.data);

            data.data.forEach(e => {
                getData.push(e);
            });

            $(".trending-image").click(createPreview);
            
            $(".trending-image").hover(function(){
                $(this).attr("src",`${getData[$(this).data("id")].images.fixed_height_small.url}`);
                $(this).css("border", "blue solid 2px");
                },
                function(){
                $(this).attr("src",`${getData[$(this).data("id")].images.fixed_height_small_still.url}`);
                $(this).css("border", "black solid 2px");
                console.log($(this).data("id"));
            });
        });
    }
    loadTrendingList()
    console.log(getData)
});