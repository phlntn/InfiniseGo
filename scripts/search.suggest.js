
function fetchSuggestions(key) 
{
	if (key == undefined || (!inArray(key, new Array(13,16,20,27,37,38,39,40)) && !isCtrl && !isCmd)) 
	{
		if ( $("#i").val() != "" && eng[current.engine].places[current.place][1] !== false ) 
		{
			current.suggestionsTimestamp = new Date().getTime();
			
			var url = eng[current.engine].places[current.place][1];
				url = url.replace("%query%", encodeURIComponent($("#i").val()));
				url = url.replace("%time%", current.suggestionsTimestamp);
			if (typeof eng[current.engine].languages == "object") 
				url = url.replace("%lang%", eng[current.engine].languages[current.language]);
	
			$.getJSON(url, function(data) { buildSuggestions(data); })
		} 
		else closeSugBox(false);
	}
}

function buildSuggestions(list) 
{
	if (list.empty) 
	{
		if(console)console.log("(1) Suggestions for '"+list.query+"' empty.");
		closeSugBox(false);
	}
	else if (
		list.engine == current.engine && 
		list.timestamp == current.suggestionsTimestamp &&
		list.query == $("#i").val()
	) {
		if(console)console.log("(2) Suggestions for '"+list.query+"' accepted.");
		
		$("#sugs").html("");
		for (sug in list.results)
		{
			sug = list.results[sug];
			$("#sugs").append("<li><a href='"+sug[1]+"'>"+sug[0]+"</a></li>");
		}
		
		$("#sugs").css({"display": "block"});	
		$("#sugs li").mousemove(function() 
		{
			$("#sugs .active").removeClass("active");
			$(this).addClass("active");
		}
		).click(function() 
		{
			applySugResult();
		});
	} 
	else 
	{
		if(console)console.log("(3) Suggestions for '"+list.query+"' discarded.");
	}
}

function prevSugResult() 
{
	if ($("#sugs").css("display") == "none") return;
	if ($("#sugs .active").length == 0) {
		$("#sugs li:last-child").addClass("active");
	} else {
		$("#sugs .active").removeClass("active").prev().addClass("active");
	}
	backupQuery();
}

function nextSugResult() 
{
	if ($("#sugs").css("display") == "none") return;
	if ($("#sugs .active").length == 0) {
		$("#sugs li:first-child").addClass("active");
	} else {
		$("#sugs .active").removeClass("active").next().addClass("active");
	}
	backupQuery();
}

var originalQuery = false;

function backupQuery() 
{
	if ($("#sugs .active").length > 0) {
		if (!originalQuery) originalQuery = $("#i").val();
		$("#i").val($("#sugs .active a").html());
	} else {
		$("#i").val(originalQuery);
		originalQuery = false;
	}
}

function closeSugBox(src) 
{
	if (src == false || src == undefined || (src.id != "i" && src.id != "sugs"))
		$("#sugs").html("").css({"display": "none"});
}

function applySugResult() 
{
	if ($("#sugs .active").length > 0) {
		$("#i").val($("#sugs .active a").html());
		closeSugBox(false);
	}
}