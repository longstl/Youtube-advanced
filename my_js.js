var enterSearch = document.getElementById('keyword');
enterSearch.onkeypress = function (event) {
    if (event.keyCode != undefined && event.keyCode == 13) {
        searchYoutube();
    }
}

function searchYoutube() {
    var keyword = document.getElementById('keyword').value;
    var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q=" + keyword + "&type=video&maxResults=9&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsObject = JSON.parse(http.responseText);
            var content = '';
            for (var i = 0; i < jsObject.items.length; i++) {
                var videoItem = '<div class="col-3 tube-item">';
                videoItem +=  '<img onclick="doSomeThing(\'' + jsObject.items[i].id.videoId + '\')" class="video-thumb"' +
                    ' src="' + jsObject.items[i].snippet.thumbnails.high.url + '">';
                videoItem += '<h3>' + jsObject.items[i].snippet.title + '</h3>';
                videoItem += '</div>';
                content += videoItem;
            }
            document.getElementById('myTubes').innerHTML = content;
        }
    };
    http.open("GET", YOUTUBE_API, true);
    http.send();
}

var model = document.getElementById('myModel');
var youtubeFrame = document.getElementById('youtubeFrame');
var span = document.getElementsByClassName('close')[0];

function doSomeThing(videoId) {
    youtubeFrame.src = 'http://www.youtube.com/embed/' + videoId;
    model.style.display = 'block';
}

span.onclick = function () {
    model.style.display = 'none';
    youtubeFrame.src = '';
}
