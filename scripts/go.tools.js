
// Returns the first property of an object
	
function firstProp(obj) 
{
	var first = true;
	for (prop in obj) {
		if (first) { return(prop) }
		first = false;
	}
}


// Returns the property following a specified property of an object

function findNext(where, now) 
{
	var isNext = false;
	var next = null;
	for (item in where) {
		if (isNext) {
			next = item;
			isNext = false;
		}
		if (item == now) isNext = true;
	}
	if (next == null) next = firstProp(where);
	return next;
}


// Returns the number of properties in an object

function numKeys(obj)
{
    var count = 0;
    for(var prop in obj)
    {
        count++;
    }
    return count;
}


// Checks if an array contains a certain value

function inArray(needle, haystack) 
{
	return ((','+haystack.toString()+',').indexOf(','+needle+',')!==-1)
}