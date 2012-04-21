
// Creating the search engine index
	
function indexCreate()
{
	var row = 0,
		i = 0, // Reset every row
		j = 0, // Total
		offset = 0,
		cols = Math.floor(idxWidth/idxLogoSmall[0]);
	
	for (e in eng) 
	{
		// If the offset hasn't been set yet
		// And the number of engines left to draw is <= items in the final row
		if (
			offset == 0 && 
			(numKeys(eng) - j) <= (numKeys(eng) % cols)
		) {
			offset = cols - numKeys(eng) % cols;
			offset = offset * (idxLogoSmall[0]+idxMargin) / 2;
		}
		
		$("#engines").prepend("<a id='"+e+"_logo' ref='"+e+"'><img src='engines/"+eng[e].logo+"'></a>");
		
		if (i == cols) { i=0; row++; };
		eng[e].idxPos = [
			(idxLogoSmall[0]+idxMargin)*i - idxWidth/2 + offset,
			(idxLogoSmall[1]+idxMargin)*row
		];
		i++; j++;
	}
	idxHeight = (row+1)*(idxLogoSmall[1]+idxMargin)-idxMargin;
	idxHeight = Math.max(idxHeight, idxLogoFull[1]);
	
	$("#engines a").click(function(){ build($(this).attr("ref"), true); })
	
	$("#engines a").css({
		"left": "50%",
		"bottom": "0",
		"marginLeft": -idxLogoFull[0]/2+"px"
	});
	
	$("#engines").mouseenter(function(){ indexOpen(); });
	$("#engines").mouseleave(function(){ indexClose(); });
}

var idxState = false,
	idxClear = undefined;
	
function indexOpen()
{
	idxState = true;
	clearTimeout(idxClear);
	
	$("#engines").css({
		"height": idxHeight
	});
	
	for (e in eng) 
	{
		var op = $("#"+e+"_logo").hasClass("active");
		$("#"+e+"_logo").stop().queue("fx",[]).animate({
			"marginLeft": eng[e].idxPos[0]+"px",
			"marginBottom": eng[e].idxPos[1]+"px",
			"opacity": (op) ? 1 : idxFadedOpacity,
			"width": idxLogoSmall[0],
			"height": idxLogoSmall[1],
		}, fadeDur);
	}	
}

function indexClose()
{
	idxState = false;
	
	$("#engines").css({
		"height": idxLogoFull[1]
	});
	
	$("#engines a").each(function()
	{
		var op = $(this).hasClass("active");
		$(this).stop().queue("fx",[]).animate({
			"marginLeft": -idxLogoFull[0]/2+"px",
			"marginBottom": 0,
			"opacity": (op) ? 1 : 0,
			"width": idxLogoFull[0],
			"height": idxLogoFull[1]
		}, fadeDur);
	});
	
	// Because jQuery doesn't like me
	idxClear = setTimeout(function(){ $("#engines a:not(.active)").css("opacity",0) }, fadeDur);
}

function nextEngine() 
{
	build(findNext(eng, current.engine), true);
}

