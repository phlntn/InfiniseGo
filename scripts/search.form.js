
// Creating the search box/form

function build(e, animate) 
{
	var methodFade = (animate) ? fadeDur : 0;
	
	current.engine = e;		// Just the engine's ID for reference
	e = eng[e];				// Engine object
	
	$("#title").html(titlePrefix+e.pageTitle);
	
	$("#method").stop().queue("fx",[]).animate({"opacity": 0}, methodFade);
	
	op = (idxState) ? idxFadedOpacity : 0;
	$("#engines a").stop().queue("fx",[]).removeClass("active");
	$("#"+current.engine+"_logo").addClass("active").animate({"opacity": 1}, fadeDur);
	$("#engines a:not(.active)").animate({"opacity": op}, fadeDur);
	
	if (typeof e.languages == "object") setLang(firstProp(e.languages));
	else $("#lang").fadeOut(fadeDur);
	
	closeSugBox(false);
	
	$("#i").attr("autosave", "com.infinise.go."+current.engine);
	$("#input input").focus();
	
	setTimeout(function()
	{
		$("#method").html("");
		for (place in e.places) $("#method").append("<a onclick='setPlace(this)'>"+place+"</a>");
		
		setPlace("#method a:first");
		
		$("#method").animate({"opacity": 1}, fadeDur);
	}, methodFade);
}


// Navigating between the search box options

function nextPlace() 
{
	var nextPlace = findNext(eng[current.engine].places, current.place);
	$("#method a").each(function()
	{
		if ($(this).html() == nextPlace) setPlace($(this));
	})
}

function nextLanguage() 
{
	setLang(findNext(eng[current.engine].languages, current.language));
}

function setPlace(place) 
{
	current.place = $(place).html();
	
	$("#method a").removeClass("active");
	$(place).addClass("active");
	$("#input input").focus();
	
	if (eng[current.engine].places[current.place][1] !== false)
	{
		fetchSuggestions();
		$("#i").attr("autocomplete", "off");
	} 
	else 
	{
		closeSugBox(false);
		$("#i").attr("autocomplete", "on");
	}
}

function setLang(language) 
{
	current.language = language;
	
	$("#lang").fadeIn(fadeDur).html(language);
	$("#input input").focus();
}


// Submitting the form

function doSearch()
{
	var url = eng[current.engine].places[current.place][0];
		url = url.replace("%query%", encodeURIComponent($("#i").val()));
	
	if (typeof eng[current.engine].languages == "object") 
		url = url.replace("%lang%", eng[current.engine].languages[current.language]);
	
	window.location.href = url;
	return false;
}