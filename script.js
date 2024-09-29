let toggleButton = document.getElementById("toggleButton")
// console.log(toggleButton);

let hide_items = document.getElementsByClassName("hide_items");
// console.log(hide_items);

toggleButton.addEventListener("click", () => {
    console.log("clicking....");

    for(let val of hide_items){
        // console.log(val);

        val.classList.toggle("hidden_content")
    }
})

//! API Integration

/*

    & 1. Google Cloud:

        a. search google cloud
        b. click on first link
        c. click on console
        d. click on I agree 
        e. clcik on agree and continue
        f.click on select project
        g. create a project
        h. select the same project
        i. click on navigation menu
        j. then hover on api and services
        k. click on history
        l. scroll down and youtube data api v3
        m. click on Enable
        n. click on create
        o. opt for public data
        p. after click on Next
        q. copy and paste api key


    & 2. Youtube Data API:

        a. search youtube data api
*/

let api_key = "USE YOUR OWN API KEY";
let search_http = "https://www.googleapis.com/youtube/v3/search?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

let callYoutubeDataAPI = async query => {
    console.log(query);

    let searchParamas = new URLSearchParams({
        key: api_key,
        part:"snippet",
        q:query,
        maxResults:20,
        type:"video",
        regionCode:"IN",
    });


let res = await fetch(search_http + searchParamas)
let data = await res.json();
// console.log(data);

data.items.map(item => {
    console.log(item); 
    // {videolink, channelid, channeltitle, desciption title, thumbnailink}

    getChannelIcon(item);
});


};

// ? to get channel icon based on channel Id

let getChannelIcon = async video_data =>{
    // console.log(video_data);

    let channelParams = new URLSearchParams({
        key:api_key,
        part:"snippet",
        id:video_data.snippet.channelId,
    });

    let res = await fetch(channel_http + channelParams);
    let data = await res.json();
    // console.log(data);
    video_data.channelIconImage = data.items[0].snippet.thumbnails.default.url;
    // console.log(video_data);

    appendVideoIntoContainer(video_data)
};

let main_content = document.getElementById("main_content")
main_content.innerHTML = "";

// ! To display the video

let appendVideoIntoContainer = video_data => {
    console.log(video_data);

    let {snippet, channelIconImage, id:{videoId}} = video_data
    // console.log(snippet);
    // console.log(channelIconImage);
    // console.log(videoId);


    main_content.innerHTML += `
    <a href = "https://www.youtube.com/watch?v=${videoId}">
        <main class="video_container">
                    <article class="imageBox">
                        <img src="${snippet.thumbnails.medium.url}">
                    </article>
                    <article class="infoBox">
                        <div>
                            <img src="${channelIconImage}" alt="">
                        </div>
                        <div>
                            <p>${snippet.title}<p>
                            <p class ="channekName> ${snippet.channelTitle}</p> 
                        </div>
                    </article>
                </main> ` 
}

let search_button = document.getElementById("search_button")
// console.log(search_button);

search_button.addEventListener("click" , () => {
    let user_input= document.getElementById("user_input").value;
    // console.log(user_input);
    callYoutubeDataAPI(user_input);
});
