import React from 'react';
import $ from "jquery";

const FindProducts = ({addToSearchResults, printableSearchResults }) => {

    var searchResultsArray = [];
    var selectedFiles = [];
    function printSearch() {
        for (var i = 0; i < searchResultsArray.length; i++) {
            addElement(searchResultsArray[i]);
        }
    }

    function addElement(entry) {
        var title = entry.title;
        var url = entry.url;
        var price = entry.price;
        var thumbnail = entry.img;
        // create a new div element
        const newDiv = document.createElement("li");
        newDiv.style.listStyle = "none";
        newDiv.style.marginBottom = "5px";
        newDiv.style.marginTop = "5px"
        newDiv.style.padding = "10px";
        newDiv.style.border = "1px solid #ccc";
        newDiv.style.backgroundColor = "#f5f5f5";
        newDiv.style.display = "flex";
        newDiv.style.alignItems = "center";
        newDiv.addEventListener("click", function () {
            if (newDiv.style.backgroundColor == "green") {
                newDiv.style.backgroundColor = "#f5f5f5";
                selectedFiles.splice(selectedFiles.indexOf(entry), 1);
            }
            else {
                newDiv.style.backgroundColor = "green";
                selectedFiles.push(entry);
                console.log(selectedFiles);
            }
        });
        // and give it some content
        const newImage = document.createElement("img");
        newImage.src = thumbnail;
        var newUrl = document.createElement('a');
        var newTitle = document.createTextNode(title);
        newUrl.appendChild(newTitle);
        newUrl.title = title;
        newUrl.href = url;
        const newPrice = document.createTextNode("Price:" + price);

        // add the text node to the newly created div
        newDiv.appendChild(newImage);
        newDiv.appendChild(newUrl);
        newDiv.appendChild(newPrice);

        document.getElementById("ItemList").appendChild(newDiv);
    }

    function submitProducts() {
        for (var i = 0; i < selectedFiles.length; i++) {
            var curFile = selectedFiles[i];
            console.log("submitting " + curFile.title);
            addToSearchResults(curFile);
            
            console.log("the big list " + printableSearchResults);
            console.log("submitted " + curFile.title);
        }
        clearSelected();
    }

    function clearSelected() {
        var listElements = document.getElementsByTagName("li");
        for (var i = 0; listElements[i]; i++) {
            $(listElements[i]).css("backgroundColor", "#f5f5f5");
        }
        selectedFiles = [];
    }

    function searchResult(title, url, price, thumbnail, newRating) {
        this.title = title;
        this.url = url;
        this.price = price;
        this.rating = newRating;
        this.img = thumbnail;
        this.inCart = false;
        this.printSearch = printSearch;
        this.searchResultsArray = searchResultsArray;
        this.selectedFiles = selectedFiles;
    }

    async function fetchData() {

        var searchValue = document.theform.newname.value;
        var tempValue = searchValue.replace(" ", "%20");
        const url = 'https://ebay-search-result.p.rapidapi.com/search/' + tempValue;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '78dd261cbfmsh71b5eaace843d52p157ce2jsn16bbad60a967',
                'X-RapidAPI-Host': 'ebay-search-result.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json(); // Parse the JSON response
            const resultsArray = result.results;

            // Loop through the resultsArray and extract the title for each item
            for (const item of resultsArray) {
                var temp = new searchResult(item.title, item.url, item.price, item.image, item.rating);
                searchResultsArray.push(temp);
            }
            printSearch();
        } catch (error) {
            console.error(error);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchData();
            event.preventDefault(); // Prevent the form submission
        }
    };

    const handleClick = () => {
        fetchData();
    };

    const handleSubmitClick = () => {
        submitProducts();
    };


    return (
        <div>
            <h1>Item Finder</h1>
            <form name="theform">
                Name:
                <input type="text" name="newname" id="inputField" size="20" onKeyDown={handleKeyDown} />
                <input type="button" name="addname" id="button" value="Add" onClick={handleClick} />
                <input type="button" name="submitFiles" id="button" value="Submit Selection" onClick={handleSubmitClick} />
                <br></br>
                <ul id='ItemList'></ul>
            </form>
        </div>
    );



}
export default FindProducts;