//Gets the input bar
const input = document.querySelector('#fruit');
//Gets the unordered list
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];


//Searches through the fruit array for any matches
function search(str) {
	//converts the search to lowercase
	let lowerStr = str.toLowerCase();
	//filters the fruit based on whether each fruit contains the string
	let results = fruit.filter(eachFruit => eachFruit.toLowerCase().includes(lowerStr));
	return results;
}


//event handler for when the user types in the search box
function searchHandler(e) {
	//Clears the list
	clearList();
	// gets the innerText of the search box
	let query = input.value;
	//Checks if there's anything even being searched
	if(query !== ""){
		//searches through to find matching fruit
		let results = search(query);
		//Checks to see how many search results there are
		//If there are more than 5, it trims the array down to the first five results
		if (results.length > 5){
			results = results.slice(0,5);
		}
		//Shows the suggestions
		showSuggestions(results, query);
	}else{console.log("Nothing is being searched");}
}

function clearList(){
	//Checks if there are listed items
	if(suggestions.children.length > 0){
		//removes all children from the unordered list
		for (eachChild of Array.from(suggestions.children)){
			eachChild.remove();
		}
		console.log("cleared the list");
	}else{
		console.log("nothing to remove");}
}

//updates the dropdown with search results
function showSuggestions(results, inputVal) {
	//populates the dropdown menu
	for (eachResult of results){
		let sugg = document.createElement('li');
		//Sets the inner text to be the result with the part containing the query to be bold
		sugg.innerHTML = boldSuggestion(eachResult, inputVal);

		//Mouseover listener to highlight each search result
		sugg.addEventListener('mouseover', highlightSuggestion);
		//Mouseout listener to un-highlight each result
		sugg.addEventListener('mouseout', unhighlightSuggestion);

		suggestions.appendChild(sugg);
	}
}

function boldSuggestion(fruit, query){
	//Sets the fruit/query to lowerCase for indexOf
	let fruitLower = fruit.toLowerCase();
	let queryLower = query.toLowerCase();
	//gets starting position of the query in the fruit string
	let firstIndx = fruitLower.indexOf(queryLower);
	//gets the ending position of the query in the fruit string
	let lastIndx = firstIndx + query.length;
	//Slices the fruit into three strings
	let firstStr = fruit.slice(0,firstIndx);
	let boldStr = fruit.slice(firstIndx,lastIndx);
	let lastStr = fruit.slice(lastIndx);
	//Returns all three added together with bold tags
	return firstStr + "<b>" + boldStr + "</b>" + lastStr;
	
}

//fills the search bar with the result the user clicks on
function useSuggestion(e) {
	// gets the target of the users click
	let targetLI = e.target;
	//Checks if the user clicked on the bold section
	if (targetLI.tagName == "B"){
		//sets the target to the parent element
		targetLI = targetLI.parentElement;
	}
	//populates the search bar innerText with the suggestion innerText
	input.value = targetLI.innerText;
	//Clears the search list
	clearList();
}

//highlights the search suggestion the user is over
function highlightSuggestion(e){
	let targetLI = e.currentTarget;
	targetLI.style.backgroundColor = "chocolate";
}

//unhighlights the suggestion the user moused over
function unhighlightSuggestion(e){
	let targetLI = e.currentTarget;
	targetLI.style.backgroundColor = "";
}

//Key listener for the search bar
input.addEventListener('keyup', searchHandler);
//Click listener for each search result
suggestions.addEventListener('click', useSuggestion);
