$(document).ready(function(){
    const apiKey = "xuofrQG4JGoKO0Xj7k2lMPizRYbg6zzw";
    const apiURL = "https://api.giphy.com/v1/gifs"
    const topics = ["The Office","Video Games","Entertainment","Sports","Dogs","Parks and Rec"]
    let trendingURL = `${apiURL}/trending?api_key=${apiKey}&limit=15`;
    let defaultURL = `${apiURL}/search?api_key=${apiKey}&limit=30&q=The%20Office`;
    let query;
    let queryURL;
    let getData = [];
    let index =0;
    let toggle = 0;
    let selectFavorite;

    function buildGifList(gifs,div,class_name){
        for(i = index ; i < gifs.length ; i++){
            $(div).append(`<img class="${class_name}" data-id="${index}" data-gid="${gifs[i].id}" src="${gifs[i].images.fixed_height_small_still.url}" />`);
            index++
        }
    }
    function createPreview(item){
        console.log(typeof item)
        let gifID = item
        let queryURL = `${apiURL}/${gifID}?api_key=${apiKey}`;
        
        $.ajax({
            method: "GET",
            url: queryURL
        })
        .then(function(data) {
            $("#g-detail").empty()
            $("#g-detail-img").empty()
            $("#g-detail-btn").empty();

            let upRating = data.data.rating.toUpperCase();
            let title = $("<p>").html(`<span class="modal-span">Title: </span>${data.data.title}`)
            let rating = $("<p>").html(`<span class="modal-span">Rating: </span>${upRating}`)
            let source = $("<p>").html(`<span class="modal-span">GIF Source: </span><a href="${data.data.source}">${data.data.source}</a>`)
            let url = $("<p>").html(`<span class="modal-span">GIPHY URL: </span><a href="${data.data.url}">${data.data.url}</a>`)
            $("#g-detail").append(title,rating,source,url)
            
            if(toggle === 1){
                let fav = $("<button>").attr("data-gid",data.data.id).addClass("btn btn-success mt-sm-3").attr("id","remove-btn").text("Remove from Favorites")
                $("#g-detail-btn").append(fav)
            }
            else{
                let fav = $("<button>").attr("data-gid",data.data.id).addClass("btn btn-success mt-sm-3").attr("id","add-btn").text("Add to Favorites")
                $("#g-detail-btn").append(fav)
            }
            toggle = 0

            let image = $("<img>").attr("src",data.data.images.original.url)
            $("#g-detail-img").append(image)
        });


        $(".bd-example-modal-lg").modal('toggle');
    }

    function loadGifList(url,class_name){
        $.ajax({
            method: "GET",
            url: url
        })
        .then(function(data) {

            data.data.forEach(e => {
                getData.push(e);
            });

            if(class_name === "trending-image"){
                buildGifList(getData,"#trending-list",class_name);
            }
            else{
                $("#search-list").empty();
                buildGifList(getData,"#search-list",class_name);
            }
            
            $(`.${class_name}`).click(function(){
                createPreview($(this).attr("data-gid"));
            });
            
            $(`.${class_name}`).hover(function(){
                $(this).attr("src",`${getData[$(this).data("id")].images.fixed_height_small.url}`);
                $(this).css("border", "blue solid 2px");
                },
                function(){
                $(this).attr("src",`${getData[$(this).data("id")].images.fixed_height_small_still.url}`);
                $(this).css("border", "black solid 2px");
            });
        });
    }

    function buildGifButtons(){
        topics.forEach( topic => {
            let ulItem = $(".navbar-nav");
            let liItem = $("<li>");
            liItem.addClass("nav-item");
            liItem.html(`<button class="btn btn-success" data-topic="${topic}">${topic}</button>`);
            ulItem.append(liItem);
        });
    }

    function addToFavorites(gIndex){
        let favList = $("#favorite-list");
        $("#favorite-toggle").show();
        let favItem = getData[gIndex];
        $(favList).append(`<img class="favorite-image" data-id="${gIndex}" data-gid="${favItem.id}" src="${favItem.images.fixed_height_small_still.url}" />`);
    }

    $("#favorite-toggle").hide();
    loadGifList(trendingURL,"trending-image");
    loadGifList(defaultURL,"search-image");
    buildGifButtons();

    $("#search-btn").click( function(event) {
        event.preventDefault(); 
        query = $(".form-control").val();
        queryURL = `${apiURL}/search?api_key=${apiKey}&limit=30&q=${query}`;
        if(!(query)){
            alert("Enter a search term first!")
        }
        else{
            loadGifList(queryURL,"search-image");
        }
    });

    $(".nav-item").click( function() {
        query = $(this).text();
        queryURL = `${apiURL}/search?api_key=${apiKey}&limit=30&q=${query}`;
        loadGifList(queryURL,"search-image");
    });

    $(document).on("click","#add-btn",function() {
        let gid = $(this).attr("data-gid");
        let gIndex = getData.findIndex(i => i.id === gid);
        addToFavorites(gIndex);
        $(".bd-example-modal-lg").modal('toggle');
    });

    $(document).on("click",".favorite-image",function() {
        console.log($(this))
        selectFavorite = $(this)
        createPreview($(this).attr("data-gid"))
        toggle = 1
        let addBtn = $("#add-btn");
        addBtn.attr("id","remove-btn")
        addBtn.text("Remove from Favorites");
        $(".bd-example-modal-lg").modal('toggle');
    });

    $(document).on("mouseleave",".favorite-image",function(){
        $(this).attr("src",`${getData[$(this).data("id")].images.fixed_height_small_still.url}`);
        $(this).css("border", "black solid 2px");
    });

    $(document).on("mouseover",".favorite-image",function() {
        $(this).attr("src",`${getData[$(this).data("id")].images.fixed_height_small.url}`);
        $(this).css("border", "blue solid 2px");
    });

    $(document).on("click","#remove-btn",function() {
        selectFavorite.remove();
        if ($("#favorite-list")[0].childElementCount === 0){
            $("#favorite-toggle").hide();
        }
        $(".bd-example-modal-lg").modal('toggle');
    });

});