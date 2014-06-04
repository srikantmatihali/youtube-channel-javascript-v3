// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms
var YT = 'undefined';

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {	
    YT = response;
	var nextPageToken = '';
	if(YT.nextPageToken!="" || YT.nextPageToken!="undefined"){
		nextPageToken = YT.nextPageToken;
	}	
    // changed: namegiving
	//console.log(YT.items);
	var itemcount = YT.items.length;
	var tempLi = '<ul>';
	for(var i=0;i<itemcount;i++){ //console.log(YT.items[i]['snippet']['thumbnails']['default']['url']);
		//tempLi +=  '<li id="" class="yt-channel-video"><a target="_blank" href="http://youtube.com/watch?v='+YT.items[i]['id']['videoId']+'" ><span class="thumb-wrap" ><img class="vid-thumb" alt=""  src="'+YT.items[i]['snippet']['thumbnails']['default']['url']+'", vid.thumb, ""/></span><div class="vid-details><span class="vid-title">'+YT.items[i]['snippet']['title']+'</span><span class="vid-views">'+YT.items[i]['snippet']['publishedAt']+'</span></div></a></li>';
		tempLi +=  '<li class="bg_color_album" ><a target="_blank" href="http://youtube.com/watch?v='+YT.items[i]['id']['videoId']+'" ><div class="paading_10"><div class="main_video_ebfc_left"><img src="'+YT.items[i]['snippet']['thumbnails']['default']['url']+'" alt="'+YT.items[i]['id']['videoId']+'" ></div><div class="main_video_ebfc_right"><p>'+YT.items[i]['snippet']['title']+'</p><span></span></div></div></a></li>';
	}
	tempLi +='</ul>'
	
	if(nextPageToken){
		var temploadmore = '<a href="#" data-token="'+nextPageToken+'" class="more_album" id="video_more" >Load More Videos</a>';
		$('#video_loadmore').html(temploadmore);
		$('#youtubeData').show();
	}else{
		var temploadmore = '<a href="#" data-token="" class="more_album" id="video_more" >Load More Videos</a>';
		$('#video_loadmore').html(temploadmore);
		$('#youtubeData').hide();
	}
	$('#youtube-channel').append(tempLi);	
	//document.getElementById('youtube-channel').innerHTML= ''+tempLi;		
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);  
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyD49-XZ2JV7Rws3KDM2T7nA56Jbi-O7djY');	
	$('#youtube-channel').empty();
	var nextpagetoken = '';
	search();
}
$(document).on("click","#video_more",function(){
	
	var nextpagetoken = $('#video_more').attr('data-token'); //console.log(nextpagetoken);
	search(nextpagetoken);
	scrollToBottom();
});
function search(nextpagetoken) { 
    // Use the JavaScript client library to create a search.list() API call.
    var qVar = 'kingfishereastbengal';	
    // changed. added: type
    var request = gapi.client.youtube.search.list({
        type: 'video',
		videoSyndicated: 'true',
		channelId: 'UCzvtDIhMWmMBudiqSf6mZ-A',
        part: 'snippet',
		pageToken: nextpagetoken,
		order: 'date',
		maxResults: 4
    });

    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
	
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}

//scroll to top
function scrolltotop(){
	$("html body").animate({ scrollTop: 0 }, "slow");
}

//scroll to bottom
function scrollToBottom(){
	$("html, body").animate({ scrollTop: $(document).height() }, "slow");
}