const apiKey = "1d67ebfcafcb4e3d9ba83b6b75f7f031";
const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=everything&from=2024-09-28&sortBy=popularity&apiKey=1d67ebfcafcb4e3d9ba83b6b75f7f031`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error getting news", error);
    return [];
  }
}



function getDate() {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  
  const date = document.getElementById('dateData');
  date.innerText = `${formattedDate}`;
}


searchButton.addEventListener("click", async () => {
  const query = searchField.valuetrim()
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query)
      displayBlogs(articles)
      
    } catch (error) {
      console.log("Error fetching news",error);
    }
  }
})

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-09-28&sortBy=popularity&apiKey=1d67ebfcafcb4e3d9ba83b6b75f7f031`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error getting news", error);
    return [];
  }
}


function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage)
      return; 
    else {
      const blogCard = document.createElement("div");
      blogCard.classList.add("blog-card");
      const img = document.createElement("img");
      img.src = article.urlToImage;
      img.alt = article.title;
      const title = document.createElement("h2");
      const TruncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." :
        article.title;
      title.textContent = TruncatedTitle;
      const description = document.createElement("p");
      const TruncatedDes = article.description.length > 120 ? article.description.slice(0, 120) + "..." :
        article.description;
      description.textContent = TruncatedDes;
      blogCard.appendChild(img);
      blogCard.appendChild(title);
      blogCard.appendChild(description);
      blogCard.addEventListener('click', () => {
        window.open(article.url, "_blank");
      })
      blogContainer.appendChild(blogCard);
  
    }
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();
    getDate();
    displayBlogs(articles);
    
  } catch (error) {
    console.log("error",error);
  }
})();
