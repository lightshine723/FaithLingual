const books = [
["Genesis", "创世记"],
["Exodus", "出埃及记"],
["Leviticus", "利未记"],
["Numbers", "民数记"],
["Deuteronomy", "申命记"],
["Joshua", "约书亚记"],
["Judges", "士师记"],
["Ruth", "路得记"],
["1 Samuel", "撒母耳记上"],
["2 Samuel", "撒母耳记下"]
];

const englishColumn = document.getElementById("english-column");
const chineseColumn = document.getElementById("chinese-column");
const score = document.getElementById("score");
const result = document.getElementById("result");

let first = null;
let second = null;
let matches = 0;

function shuffle(array) {
return [...array].sort(() => Math.random() - 0.5);
}

const englishBooks = shuffle(books);

const chineseBooks = shuffle(
books.map(book => ({
english: book[0],
chinese: book[1]
}))
);

englishBooks.forEach(book => {
const div = document.createElement("div");

div.classList.add("item");
div.textContent = book[0];
div.dataset.match = book[0];

englishColumn.appendChild(div);

});

chineseBooks.forEach(book => {
const div = document.createElement("div");

div.classList.add("item");
div.textContent = book[1] || book.chinese;
div.dataset.match = book.english;

chineseColumn.appendChild(div);

});

function drawLine(item1, item2) {

const svg = document.getElementById("lines");

const svgRect = svg.getBoundingClientRect();

const rect1 = item1.getBoundingClientRect();
const rect2 = item2.getBoundingClientRect();

const x1 =
    rect1.left +
    rect1.width -
    svgRect.left;

const y1 =
    rect1.top +
    rect1.height / 2 -
    svgRect.top;

const x2 =
    rect2.left -
    svgRect.left;

const y2 =
    rect2.top +
    rect2.height / 2 -
    svgRect.top;

const line = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
);

line.setAttribute("x1", x1);
line.setAttribute("y1", y1);

line.setAttribute("x2", x2);
line.setAttribute("y2", y2);

line.setAttribute("stroke", "black");
line.setAttribute("stroke-width", "4");

svg.appendChild(line);

}

function checkMatch() {

if (first.dataset.match === second.dataset.match) {

    first.classList.remove("selected");
    second.classList.remove("selected");

    first.classList.add("correct");
    second.classList.add("correct");

    drawLine(first, second);

    matches++;

    score.textContent = `Progress: ${matches} / 10`;

    if (matches === 10) {

        result.innerHTML =
            "🎉 恭喜！你已成功完成本次挑战，并掌握创世记至撒母耳记下的书卷中英文名称！<br><br>" +
            "🎉 Congratulations! You have successfully mastered the Chinese and English names of the Bible books from Genesis to 2 Samuel.";
    }

} else {

    setTimeout(() => {

        first.classList.remove("selected");
        second.classList.remove("selected");

    }, 600);
}

setTimeout(() => {

    first = null;
    second = null;

}, 600);

}

function addEvents() {

const items = document.querySelectorAll(".item");

items.forEach(item => {

    item.addEventListener("click", () => {

        if (item.classList.contains("correct")) return;

        if (!first) {

            first = item;
            item.classList.add("selected");

        } else if (!second && item !== first) {

            second = item;
            item.classList.add("selected");

            checkMatch();
        }
    });
});

}

addEvents();