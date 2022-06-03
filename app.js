// Wikipedia API
const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const page_url = "href=http://en.wikipedia.org/?curid=${pageid}";

// selecting elements
const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");
const toggleBtn = document.querySelector(".toggle-btn");

console.log(formDOM, inputDOM, resultsDOM);

// event listerner for the submitting the form
formDOM.addEventListener("submit", (e) => {
  // accessing the event object
  e.preventDefault();

  //   get whatever is typed in the input
  const value = inputDOM.value;

  if (!value) {
    resultsDOM.innerHTML = `<div class="error">Please submit valid search term</div>`;
    return;
  }
  fetchPages(value);
});

const fetchPages = async (searchValue) => {
  resultsDOM.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    console.log(data);
    const results = data.query.search;
    // if the input is gibberish, then it will return the message
    if (results.length < 1) {
      resultsDOM.innerHTML = `<div class="error">No matching results, please try again...</div>`;
    }
    // invoking the results function passing in the results as the argument
    renderResults(results);
  } catch (error) {
    `<div class="error">There was an error...</div>`;
  }
};

// render the results
const renderResults = (list) => {
  console.log(list);
  const carldsList = list
    .map((item) => {
      console.log(item);
      // destructuring
      const { title, snippet, pageid } = item;
      return `
      <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>
          `;
    })
    .join("");
  resultsDOM.innerHTML = `<div class="articles">
  ${carldsList}</div>`;
};

// toggle dark mode
toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark-theme");
});
