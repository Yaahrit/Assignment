// Function to fetch and display repositories
function fetchRepositories(page, perPage) {
    // Show loader
    document.getElementById('loader').classList.remove('d-none');

    // Replace 'YOUR_GITHUB_USERNAME' with the actual GitHub username
    const githubUsername = 'luv-jeri';
    const apiUrl = `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`;

    // Fetch repositories from GitHub API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Hide loader
            document.getElementById('loader').classList.add('d-none');

            // Display repositories
            displayRepositories(data);
        })
        .catch(error => {
            // Handle error
            console.error('Error fetching repositories:', error);
            // Hide loader
            document.getElementById('loader').classList.add('d-none');
        });
}

// Function to display repositories in the form of Bootstrap cards
function displayRepositories(repositories) {
    const repoList = document.getElementById('repoList');
    repoList.innerHTML = ''; // Clear existing list

    repositories.forEach(repo => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = repo.name;

        const cardDescription = document.createElement('p');
        cardDescription.classList.add('card-text');
        cardDescription.textContent = repo.description || 'No description available.';

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDescription);
        card.appendChild(cardBody);

        repoList.appendChild(card);
    });
}


// Function to handle change in repositories per page
function changePerPage() {
    const perPage = document.getElementById('perPage').value;
    fetchRepositories(1, perPage);
}

// Initial fetch (on page load)
fetchRepositories(1, 10);