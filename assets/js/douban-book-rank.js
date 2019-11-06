const api = "https://api.douban.com/v2/book/search";
const apikey = "0df993c66c0c636e29ecbb5344252a4a";

const MAX_BOOKS = 2048;

let books = [];

let searchURL;

let minRaters = 1;

let booksRead = 0;

function sortBooks(keywords)
{
    var progress = document.getElementById("searching-progress");
    progress.hidden = false;
    progress.value = `0`;

    var ul = document.getElementById("search-result-list");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    var minRatersInput = document.getElementById("minimum-raters-input");
    var value = parseInt(minRatersInput.value);
    if (!isNaN(value)) {
        minRaters = value;
    }

    books = [];

    searchURL = `${api}?apikey=${apikey}&q=${encodeURI(keywords)}`;
    jsonp(searchURL, "jsonpCallback");
}

function jsonp(url, callback)
{
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url + `&callback=${callback}`;
    script.async = true;
    document.body.append(script);
}

function jsonpCallback(page)
{
    const count = page['count'];
    const start = page['start'];
    const total = page['total'] > MAX_BOOKS ? MAX_BOOKS : page['total'];

    if (total == 0) return;

    if (start == 0) {
        booksRead = 0;
        for (let s = start + count; s < total; s += count) {
            jsonp(searchURL + `&start=${s}`, "jsonpCallback");
        }
    }

    page['books'].forEach(book => {
        if (book['rating']['numRaters'] >= minRaters) {
            books.push(book);
        }
    });

    booksRead += count;

    var progress = document.getElementById("searching-progress");
    progress.value = `${Math.ceil(booksRead / total * 100)}`;

    if (booksRead >= total) {
        calculateBayesian(books);
        books.sort((a, b) => {
            return b['rating']['bayesian'] - a['rating']['bayesian'];
        });
        showBooks();
    }
}

function calculateBayesian(books) {
    let allRaters = 0;
    let allScore = 0;

    for (let book of books) {
        const n = book['rating']['numRaters'];
        allRaters += n;
        allScore += n * parseFloat(book['rating']['average']);
    }

    const C = allRaters / books.length;
    const m = allScore / allRaters;

    for (let book of books) {
        const n = book['rating']['numRaters'];
        book['rating']['bayesian'] = (C * m + n * parseFloat(book['rating']['average'])) / (C + n);
    }
}

function showBooks() {
    const progress = document.getElementById("searching-progress");
    progress.hidden = true;

    const ul = document.getElementById("search-result-list");
    for (let book of books) {
        const li = document.createElement("li");
        ul.appendChild(li);

        const a = document.createElement("a");
        a.href = book['alt'];
        li.appendChild(a);

        let title = book['title'];
        if (book['subtitle'].length > 0)
            title += ": " + book['subtitle'];
        const text = document.createTextNode(`${book['rating']['bayesian'].toFixed(2)} - ${title}`);
        a.appendChild(text);
    }
}