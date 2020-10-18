// Scrabble Word Generator

// page elements
var twoLetterBtnEl = document.getElementById('twoLetterBtn');
var threeLetterBtnEl = document.getElementById('threeLetterBtn');
var randomLetterBtnEl = document.getElementById('randomLetterBtn');
var highScoreBtnEl = document.getElementById('highScoreBtn');
var letterContainerEl = document.getElementById('possible-letters');
var searchContentEl = document.getElementById('search-content');
var resultsContainerEl = document.getElementById('results-container');
var letterEl = document.querySelector(".letter");
var spaceEl = document.querySelector(".space");

// global page variables
var wordLength = 0;
var dropLetters = [];

// get user input area
spaceEl.textContent = "Drag Letters Here! "

// drag letters
var dragLetters = function (event) {
    event.preventDefault();
    console.log("works")
}

$(".letter").sortable({
    revert: true
});

// make letters drag
$(".letter").draggable({
    connectToSortable: ".space",
    tolerance: "pointer",
    helper: "clone",
    appendTo: ".space",
    containment: "#keyboard",
    cursor: "move",
    snap: ".space",
    revert: "invalid",
    start: function (event, ui) {
        console.log(ui);
        //clone of tile
        $(ui.helper).addClass("dragging");
        console.log("test");
    },
    stop: function (event, ui) {
        $(ui.helper).removeClass("dragging");
        console.log("stop");
        // var grid = document.createElement("div");
        // grid.id = "grid";
        // grid.className = "grid";
        // for (i=0; i<7; i++) {
        //     var row = grid.appendChild(document.createElement("div"));
        //     row.className = "row";
        //     row.id = "row" +i;
        //     console.log("well?");
        // };
    }
    //remove class
    // add grid item
});

// $(".letter").sortable({
//     revert: true
// });
//     connectWith: $(".space .letter"),
//     tolerance: "pointer",
//     helper: "clone",
//     activate: function(event) {
//         var letterVal= $(this).attr("data-letter");
//             dropLetters.push(letterVal);
//             console.log(letterVal);
// $(".space").addClass("dropZone");
// console.log("activate", this);
//   },
//       deactivate: function(event) {
//         // $(".bottom-trash").removeClass("dropover bottom-trash-drag");
//         console.log("deactivate", this);
//       },
//       over: function(event) {
//         // $(event.target).addClass("dropover-active");
//       },
//       out: function(event) {
//         // $(event.target).removeClass("dropover-active");
//         console.log("out", event.target);
//       },
// })
//pull tiles into dropzone if overlap

//make dropzone
$(".space").droppable({
    accept: ".letter",
    tolerance: "touch",
    revert: false,
    drop: function (event, ui) {
        console.log(ui);
        console.log("drop");
        var helper = ui.helper.clone(true);
        helper.appendTo(".space");
        $(ui.helper).removeClass("dragging");
        // finds object and then letter value of that object

        var dragged = ui.draggable[0].dataset.letter;
        console.log(ui.draggable[0].dataset.letter);
        //add drop letters to array
        dropLetters.push(dragged);
        console.log(dropLetters);
        $(".space").removeClass("dropZone");
    },

    over: function (event, ui) {
        $(".space").addClass("dropZone");
        console.log("over");
    },
    out: function (event, ui) {
        $(".space").removeClass("dropZone");
        console.log("out");
    },
    update: function (event) {
        console.log(this)
    }
});

//only accept so many of each letter

letterEl.addEventListener("click", dragLetters)

// event listeners to gather user input and start generator function
twoLetterBtnEl.addEventListener('click', function () {
    // get possible letters from form
    var letters = dropLetters.join('');
    // reset global variable
    var wordLength = 0;
    // set search criteria
    var wordLength = 2;
    // call word generator
    genWordList(wordLength, letters);
});

threeLetterBtnEl.addEventListener('click', function () {
    // get possible letters from form
    var letters = dropLetters.join('');
    // reset global variable
    var wordLength = 0;
    // set search criteria
    var wordLength = 3;
    // call word generator
    genWordList(wordLength, letters);
});

randomLetterBtnEl.addEventListener('click', function () {
    // get possible letters from form
    var letters = dropLetters.join('');

    // get total letter count
    letterCounter(letters);
    function letterCounter(letters) {
        // reset global variable
        wordLength = 0;
        var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var ar = alphabet.split("");
        for (var i = 0; i < letters.length; i++) {
            if (ar.indexOf(letters[i]) > -1) {
                wordLength = wordLength + 1;
            }
        }
        return wordLength;
    }
    // call word generator
    genWordList(wordLength, letters);
});

highScoreBtnEl.addEventListener('click', function () {
    // get possible letters from form
    var letters = dropLetters.join('');

    // get total letter count
    letterCounter(letters);
    function letterCounter(letters) {
        // reset global variable
        wordLength = 0;
        var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var ar = alphabet.split("");
        for (var i = 0; i < letters.length; i++) {
            if (ar.indexOf(letters[i]) > -1) {
                wordLength = wordLength + 1;
            }
        }
        return wordLength;
    }

    // sort letters based on value before sending to genWordList
    // var priorityLetters = ['z','q','x','j','k','w','y','v','f','h','o','m','c','b','g','d','u','s','l','t','r','n','o','i','a','e'];
    // var lettersArray = letters.split('');
    // lettersArray.sort(function(a, b) {
    //     return priorityLetters[a] - priorityLetters[b];
    // })
    // console.log(lettersArray);
    // call word generator
    genWordList(wordLength, letters);
});

// generate all possible combinations of inputted letters
var genWordList = function (wordLength, letters) {
    // reset form container

    var results = [];
    var arrayCounter = 0;

    var generate = function (possWord) {
        for (var i = 0; i < letters.length; i++) {
            if (arrayCounter <= 11) {
                possWord += letters[i];
                if (possWord.length === wordLength) {
                    if (dict.includes(possWord)) {
                        results.push(possWord);
                        arrayCounter++;
                    }
                } else {
                    generate(possWord);
                }
                possWord = possWord.slice(0, -1);
                // break from loop to cut down on load time    
            } else {
                break;
            }
        }
    }
    generate("");

    // store user search / results
    localStorage.setItem(letters, results);

    // get data from API
    getDefData(letters, results);
    return console.log(results);
};

// function fetches definition data for each in an array of words and returns subset of data packaged as an object
var getDefData = function (letters, results) {
    // display searched letters
    if (results.length === 0) {
        searchContentEl.textContent = '';
        searchContentEl.textContent = 'No Words Found';
    } else {
        searchContentEl.textContent = '';
        searchContentEl.textContent = letters;
    }

    var wordDefArr = [];
    var imgSrcInfoArr = [];

    // generate API data for each word
    for (var i = 0; i < results.length; i++) {
        let word = results[i];
        var mwApiUrl = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'
            + results[i] + '?key=' + smkmw;
        fetch(mwApiUrl).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var def = (data[0])
                    var wordDef = {
                        word: word,
                        class: def.fl,
                        definition: def.shortdef,
                        audio: def.hwi.prs[0].sound.audio,
                        offensive: def.meta.offensive,
                    };
                    console.log(wordDef)
                    // s displayWordDefSound(wordDef)
                    // displaySoundBite(wordDef
                    wordDefArr.push(wordDef)
                    //return wordDef
                })
            } else {
                alert("Error:" + response.statusText)
            }
        });
    }

    for (var i = 0; i < results.length; i++) {
        var images = results[i];
        var pexelURL = `https://api.pexels.com/v1/search?query=${images}&per_page=1`;// ${new_words[0]}
        var API_key = "563492ad6f91700001000001294e0c620d364f5597a8efd5b7667ccf";
        //add the function to fetch url, and call it above 
        fetch(pexelURL, {
            headers: {
                // Accept: 'application/json',
                Authorization: API_key
                //credentials: 'include'
            }
        })
            .then(function (response) {
                //console.log(response);
                return response.json();
            })
            //console.log(response);// will display the array
            .then(function (response) {
                console.log(response.photos);
                // // Use 'querySelector' to get the ID of where the pic/ will be displayed
                // var responseContainerEl = document.querySelector('#images');
                // // // Create an '<img>' element
                // var pexelImg = document.createElement('img');
                // // Set that element's 'src' attribute to the 'image_url' from API response
                // pexelImg.setAttribute('src', response.photos[0].src.small);
                // responseContainerEl.appendChild(pexelImg);
                imgSrcInfoArr.push(imgSrcInfo);
            })
    }
    console.log(wordDefArr);
    console.log(imgSrcInfoArr);
}

// function takes MW api object data and packages word & class (e.g. noun, verb adjective) for DOM object display
var displayWordDefSound = function (defObject) {
    console.log(defObject)

    // resultsContainerEl.textContent = '';

    // check to see whether term is offensive
    if (!defObject.offensive) {
        // create DOM elements
        var resultLI = document.createElement('li');
        resultLI.setAttribute('class', 'col s12 m6 l3');

        // display word within result container header
        var resultHeader = document.createElement('div');
        resultHeader.setAttribute('class', 'collapsible-header');
        resultHeader.innerHTML = '<p>' + defObject.word + '</p>';

        //display image
        var pexelImg = document.createElement('img');
        pexelImg.setAttribute('src', response.photos[0].src.small);

        // display class, definitions and sound button within result container body

        // takes audio file reference and creates link for audio playback; 'subdir' uses conditions provided by MW api documentation to determine 'subdir' component of href
        var aud = defObject.audio.split('', 3)
        var regex = RegExp('[\\d\\W]')
        var subdir = ''
        if (aud[0] + aud[1] + aud[2] === 'bix') {
            subdir = 'bix'
        } else if (aud[0] + aud[1] === 'gg') {
            subdir = 'gg'
        } else if (regex.test(aud[0])) {
            subdir = 'number'
        } else {
            subdir = aud[0]
        }
        var audioLink = 'https://media.merriam-webster.com/audio/prons/en/us/ogg/' + subdir + '/' + defObject.audio + '.ogg';
        // console.log(audioLink)

        // create button element to contain sound link
        var audioBtn = document.createElement('a');
        audioBtn.setAttribute('class', 'btn-floating waves-effect waves-light red')
        audioBtn.setAttribute('href', audioLink);
        audioBtn.innerHTML = '<span><img id="audio-icon" src="assets/iconfinder_speaker-high-sound-volume-voice_3643734.png"></span>'

        // create div body element for class, audio button, and definitions
        var resultBody = document.createElement('div');
        resultBody.setAttribute('class', 'collapsible-body');
        resultBody.innerHTML = '<span>' + defObject.class + '</span>';

        // loop through each homonym and display within element for that word
        for (var i = 0; i < defObject.definition.length; i++) {
            n = i + 1
            var resultDef = document.createElement('p');
            resultDef.textContent = n + ') ' + defObject.definition[i];
            resultBody.append(resultDef);
        }

        // append content to page elements
        resultBody.append(audioBtn);
        resultLI.append(resultHeader);
        resultLI.append(resultBody);
        resultsContainerEl.append(resultLI);
        resultBody.append(pexelImg);
    } else {
        console.log("Sorry, this word cannot be displayed.");
    }

};

// var showImage = function () {
//     var pexelURL = `https://api.pexels.com/v1/search?query=${wordDef[0]}&per_page=1`;// ${new_words[0]}
//     var API_key = "563492ad6f91700001000001294e0c620d364f5597a8efd5b7667ccf";
//     //add the function to fetch url, and call it above 
//     fetch(pexelURL, {
//         headers: {
//             // Accept: 'application/json',
//             Authorization: API_key
//             //credentials: 'include'
//         }
//     })
//         .then(function (response) {
//             console.log(response);
//             return response.json();
//         })
//         //console.log(response);// will display the array
//         .then(function (response) {
//             console.log(response.photos);
//             // Use 'querySelector' to get the ID of where the pic/ will be displayed
//             var responseContainerEl = document.querySelector('#images');
//             // // Create an '<img>' element
//             var pexelImg = document.createElement('img');
//             // Set that element's 'src' attribute to the 'image_url' from API response
//             pexelImg.setAttribute('src', response.photos[0].src.small);
//             responseContainerEl.appendChild(pexelImg);


//             // Pexel credit
//             // var pexelCreditEl = document.createElement('div')
//             // pexelCreditEl.classList.add("card-body");
//             // var pexelInfoDiv = document.createElement('div');
//             // pexelInfoDiv.classList.add("card");
//             // var photographerEl = document.createElement("p");
//             // photographerEl.textContent = "Photo by: ";
//             // photographerEl.classList.add("card-text");
//             // var madeByPexelEl = document.createElement("p");
//             // madeByPexelEl.textContent = "Photos provided by Pexels";
//             // madeByPexelEl.classList.add("card-text");
//             // var logoLinkEl = document.createElement("p");
//             // logoLinkEl.textContent = "";//''"<a href="https://www.pexels.com"><img src="https://images.pexels.com/lib/api/pexels.png"/></a>';
//             // logoLinkEl.classList.add("card-text");
//             //pexelInfoDiv.setAttribute('src', response.photographer);
//             // console.log(headers.url);
//             //pexelInfoDiv.appendChild(pexelCreditEl);
//             //     pexelCreditEl.appendChild(photographerEl);
//             //     pexelCreditEl.appendChild(madeByPexelEl);
//             //     pexelCreditEl.appendChild(logoLinkEl);
//             //     pexelCreditEl.appendChild(pexelInfoDiv);})
//         })
// }
// document.getElementById("images").innerHTML = "Image";


// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
