const apiKey = "xuofrQG4JGoKO0Xj7k2lMPizRYbg6zzw";
const apiURL = "https://api.giphy.com/v1/gifs"
let rating= "G";
let limit= 25;
let query= "funny";
let queryURL = `${apiURL}/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=0&rating=${rating}&lang=en`;
let trendingURL = `${apiURL}/trending?api_key=${apiKey}&limit=10&rating=${rating}`;

function getTrendingGIFS(url){
    $.ajax({
        method: "GET",
        url: url
    })
    .done(function(data) {
        console.log(data.data);
        buildTrendingList(data.data);
    });
}

function buildTrendingList(gifs){
    for(i =0 ; i < gifs.length ; i++){
        console.log(gifs[i].images.fixed_height.url);
        $("#trending-list").append(`<img id="trending-image" data-id="${gifs[i].id}" src="${gifs[i].images.fixed_height.url}" />`);
    }
}

getTrendingGIFS(trendingURL);