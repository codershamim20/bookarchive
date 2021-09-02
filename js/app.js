document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';

const searchBook = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    // Handle empty search request
    if (searchText === '') {
        
        displayError();
    }
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        // Clear Search Result
        document.getElementById('search-result').textContent = '';
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
    }
}
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';

}
// Display Search Result
const displaySearchResult = books => {
    // console.log(books);
    document.getElementById('book-numbers').textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const bookList = books;
    // console.log(bookList);
    if (bookList.length === 0) {
        displayError();
    }
    else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('book-numbers').innerText = '';
        //  each book display 
        bookList.forEach(book => {
            document.getElementById('book-numbers').innerText = `Books Found ${bookList.length}`;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div  class="card h-100 text-center">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i?book.cover_i:'N/a'}-M.jpg" class="w-50 h-50 mx-auto" alt="Book Cover Image">
                <div class="card-body">
                    <h5 class="card-title">Name: ${book.title?book.title.slice(0,50): "N/A"}</h5>
                    <p class="card-text">Author Name: ${book.author_name?book.author_name.slice(0,1):'N/A'}</p>
                    <p class="card-text">Publisher Name: ${book.publisher?book.publisher.slice(0,2):'N/A'}</p>
                    <p class="card-text">First Published: ${book.first_publish_year?book.first_publish_year:'N/A'}</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }

}
