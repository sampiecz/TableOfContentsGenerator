// Author: Sam Piecz
// V1
// Last Modified: 12/6/18

// Start html for table of contents
var tableOfContents =
  "<nav role='navigation' class='table-of-contents'>" +
    "<h2 class='table-of-contents-header'>Table of contents</h2>" +
    "<hr>" +
    "<ul class='toc-ul'>";

// Get all h2s & h3s -- assuming that is all we use
var h2s = document.getElementsByTagName('h2');
var h3s = document.getElementsByTagName('h3');

// Add an id to every h2 so we can jump to it later
for(var j = 0; j != h2s.length; j++)
{
    h2s[j].id = "toc-" + j;
}

// Same for h3s
for(var m = 0; m != h3s.length; m++)
{
    h3s[m].id = "sub-toc-" + m;
}

// Find every h3 inbetween every h2 so we can do a sub element
function findElementsInbetween(startElement, endElement, elementToFind)
{
    var next = startElement.nextElementSibling;

    if (next == endElement)
    {
        return arrayOfElementsToFind;
    }
    else if(next.tagName == elementToFind)
    {
        arrayOfElementsToFind.push(next);
        findElementsInbetween(next, endElement, elementToFind);
    }
    else
    {
        findElementsInbetween(next, endElement, elementToFind);
    }
}


// For every h2 check for any h3s inbetween them
// then append the proper html to the table of contents
for(var i = 0; i != h2s.length; i++)
{
    // Number for table of contents
    var enumNumber = i + 1;

    // Sub heading letters for incrementing
    var enumLetter = "abcdefghijklmnopqrstuvxyz";

    // Make link for current h2
    var link = "<span class='toc-pre-list-element'>" + enumNumber + ". " + "</span>" + "<a href='#" + h2s[i].id + "' class='toc-anchor' >" + h2s[i].innerText + "</a>";

    // Create array to store potential h3s in
    var arrayOfElementsToFind = [];

    // Get all h3s inbetween current h2 and next h2
    if (i != h2s.length - 1)
    {
      findElementsInbetween(h2s[i], h2s[i+1], "H3");
    }

    // If we didn't find any h3s inbetween current h2 and next h2
    // then we don't need a sublist
    if (arrayOfElementsToFind.length == 0)
    {
        var addToTableOfContents =
        "<li class='toc-list-element'>"
            + link +
        "</li>";

        tableOfContents += addToTableOfContents;
    }
    // If we did find h3s inbetween current h2 and next h2 we need to
    // create a sublist
    else
    {
        // Var to store sublist
        var subElements = "";

        // Start adding h3s to the sublist
        for(var k = 0; k != arrayOfElementsToFind.length; k++)
        {
            var subLink = "<span class='toc-pre-list-element'>" + enumLetter[k] + ". " + "</span>" + "<a href='#" + arrayOfElementsToFind[k].id + "' class='toc-sub-anchor' >" + arrayOfElementsToFind[k].innerText + "</a>";
            var subText = "<li class='toc-sub-list-element'>" + subLink + "</li>";
            subElements += subText;
        }

        // Add the sublist to the table of table of contents
        // We need to add the h2 first then the h3s beneath the h2
        var subAddToTableOfContents =
            "<li>" + link +
                "<ul>" + subElements + "</ul>" +
             "</li>";

        tableOfContents += subAddToTableOfContents
    }

}

// Close out our table of tableOfContents
var closeTableOfContents =
        "</ul>" +
    "</nav><hr><br><br>";

tableOfContents += closeTableOfContents;

// Special CSS for jumping to anchor tags
var styling =
    "<style>"
    + ":target:before{content:'';display:block;height:90px;margin:-90px 0 0}h2:target,h3:target{animation:highlight 1s ease}@keyframes highlight{from{background:yellow}to{background:#f8f8f8}}.toc-ul,.toc-ul ul{list-style-type:none;margin-bottom:0px}.toc-ul{margin-left:0px!important}.toc-sub-anchor{color:#007ab9}.toc-anchor{color:#025681}hr{color:white}" +
    "</style>";


// Put table of contents in the page
var arrayOfInsertionPoints = document.getElementsByClassName("putclassnamehere");
var addTableOfContentsHere = arrayOfInsertionPoints[arrayOfInsertionPoints.length - 2]
var originalInnerHTML = addTableOfContentsHere.innerHTML;
var newInnerHTML = tableOfContents + originalInnerHTML + styling;
addTableOfContentsHere.innerHTML = newInnerHTML;
