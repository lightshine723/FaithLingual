const books = [

["Genesis","创世记"],
["Exodus","出埃及记"],
["Leviticus","利未记"],
["Numbers","民数记"],
["Deuteronomy","申命记"],

["Joshua","约书亚记"],
["Judges","士师记"],
["Ruth","路得记"],

["1 Samuel","撒母耳记上"],
["2 Samuel","撒母耳记下"],

];

const englishColumn =
document.getElementById("english-column");

const chineseColumn =
document.getElementById("chinese-column");

let first = null;
let second = null;
let matches = 0;

function shuffle(array){

    return [...array].sort(
        () => Math.random() - 0.5
    );

}

const englishBooks = shuffle(books);

const chineseBooks =
shuffle(
    books.map(book => ({
        english: book[0],
        chinese: book[1]
    }))
);

englishBooks.forEach(book => {

    const div = document.createElement("div");

    div.className = "item";

    div.textContent = book[0];

    div.dataset.match = book[0];

    englishColumn.appendChild(div);

});

chineseBooks.forEach(book => {

    const div = document.createElement("div");

    div.className = "item";

    div.textContent = book.chinese;

    div.dataset.match = book.english;

    chineseColumn.appendChild(div);

});

const addEvents = () => {

    const items =
    document.querySelectorAll(".item");

    items.forEach(item => {

        item.addEventListener("click", () => {

            if(item.classList.contains("correct")) return;

            if(!first){

                first = item;

                item.classList.add("selected");

            }else if(!second && item !== first){

                second = item;

                item.classList.add("selected");

                checkMatch();

            }

        });

    });

};

function checkMatch(){

    if(
        first.dataset.match ===
        second.dataset.match
    ){

        first.classList.remove("selected");
        second.classList.remove("selected");

        first.classList.add("correct");
        second.classList.add("correct");

        matches++;

        document.getElementById("score")
        .textContent =
        `Progress: ${matches} / 10`;

        if(matches === 10){

            document.getElementById("result")
            .innerHTML =
            "🎉 Congratulations! You completed all 10 books.";

        }

    }else{

        setTimeout(() => {

            first.classList.remove("selected");
            second.classList.remove("selected");

        },600);

    }

    setTimeout(() => {

        first = null;
        second = null;

    },600);

}

addEvents();