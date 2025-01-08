const articlesPerPage = 2; // Number of articles per page
let currentPage = 1;

// Function to fetch articles from JSON file
async function fetchArticles() {
    try {
        const response = await fetch('./assets/articles.json');
        return await response.json();
    } catch (error) {
        console.error("Error fetching articles:", error);
    }
}

// Function to render articles
function renderArticles(articles, page) {
    const start = (page - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const paginatedArticles = articles.slice(start, end);

    const articlesContainer = document.getElementById('articles-container');
    articlesContainer.innerHTML = '';

    paginatedArticles.forEach(article => {
        articlesContainer.innerHTML += `
            <div class="col-md-12 mb-4">
                <div class="card post-card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.summary}</p>
                        <a href="${article.url}" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Function to render pagination
function renderPagination(articles) {
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    // Add event listeners to pagination links
    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            currentPage = parseInt(event.target.dataset.page);
            renderArticles(articles, currentPage);
            renderPagination(articles);
        });
    });
}

// Initialize
(async function init() {
    const articles = await fetchArticles();
    if (articles) {
        renderArticles(articles, currentPage);
        renderPagination(articles);
    }
})();
