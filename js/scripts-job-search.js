document.addEventListener("DOMContentLoaded", () => {
    const resultsContainer = document.getElementById("search-results");
    const searchInput = document.getElementById("search-input");

    // Function to display jobs dynamically
    function displayJobs(jobs) {
        resultsContainer.innerHTML = "";

        if (jobs.length === 0) {
            resultsContainer.innerHTML = "<p>No jobs found matching your search.</p>";
            return;
        }

        jobs.forEach(job => {
            resultsContainer.innerHTML += `
                <div class="col-md-4">
                    <div class="card job-card">
                        <div class="card-body">
                            <h5 class="card-title">${job.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${job.location}</h6>
                            <p class="card-text">${job.description}</p>
                            <a href="${job.url}" class="btn btn-primary" target="_blank">View Details</a>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // Function to fetch jobs from JSON file
    async function fetchJobs() {
        try {
            const response = await fetch("data/jobs_data.json");
            const jobs = await response.json();

            // Add event listener for search input
            searchInput.addEventListener("input", () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredJobs = jobs.filter(job =>
                    job.title.toLowerCase().includes(searchTerm) ||
                    job.location.toLowerCase().includes(searchTerm) ||
                    job.description.toLowerCase().includes(searchTerm)
                );
                displayJobs(filteredJobs);
            });

            // Initial display of all jobs
            displayJobs(jobs);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            resultsContainer.innerHTML = "<p>Failed to load jobs. Please try again later.</p>";
        }
    }

    // Call fetchJobs on page load
    fetchJobs();
});