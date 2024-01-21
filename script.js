// Function to fetch and display repositories
function fetchUserInformation() {
    const githubUsernameInput = document.getElementById('githubUsername');
    const githubUsername = githubUsernameInput.value.trim(); // Trim whitespace
    const accessToken = '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'; // Replace with your actual GitHub personal access token

    // Check if a username is entered
    if (!githubUsername) {
        alert('Please enter a GitHub username.');
        return;
    }

    const apiUrl = `https://api.github.com/users/${githubUsername}`;

    fetch(apiUrl, {
        headers: {
            Authorization: `token ${accessToken}`,
        },
    })
        .then(response => {
            if (response.status === 404) {
                throw new Error('User not found. Please enter a valid GitHub username.');
            }
            if (!response.ok) {
                throw new Error(`Failed to fetch user information: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(userData => {
            // Display user information
            displayUserProfile(userData);

            // Fetch repositories after fetching user information
            fetchRepositories(githubUsername, 1, 500); // Pass the githubUsername here
        })
        .catch(error => {
            console.error('Error fetching user information:', error);
            alert(`Error fetching user information: ${error.message}`);
        });
}


function displayUserProfile(user) {
    const userInfoContainer = document.getElementById('userInfo');
    userInfoContainer.innerHTML = ''; // Clear existing content

    const card = document.createElement('div');
    card.classList.add('card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // User Profile Image
    const profileImage = document.createElement('img');
    profileImage.classList.add('img-fluid', 'mb-3');
    profileImage.src = user.avatar_url;
    cardBody.appendChild(profileImage);

    // Username
    const username = document.createElement('h4');
    username.textContent = user.name || 'No Name';
    cardBody.appendChild(username);

    // GitHub Username
    const githubUsername = document.createElement('p');
    githubUsername.classList.add('text-muted');
    githubUsername.textContent = `GitHub: ${user.login}`;
    cardBody.appendChild(githubUsername);

    // Followers and Following
    const followersFollowing = document.createElement('p');
    followersFollowing.classList.add('text-muted');
    followersFollowing.textContent = `Followers: ${user.followers} | Following: ${user.following}`;
    cardBody.appendChild(followersFollowing);

    // Location
    if (user.location) {
        const location = document.createElement('p');
        location.classList.add('text-muted');
        location.textContent = `Location: ${user.location}`;
        cardBody.appendChild(location);
    }

    // Link
    const link = document.createElement('a');
    link.href = user.html_url;
    link.target = '_blank';
    link.textContent = 'GitHub Profile';
    cardBody.appendChild(link);

    // Social Links (if available)
    if (user.blog) {
        const blogLink = document.createElement('a');
        blogLink.href = user.blog;
        blogLink.target = '_blank';
        blogLink.textContent = 'Blog';
        cardBody.appendChild(blogLink);
    }

    // Append card body to card
    card.appendChild(cardBody);

    // Append card to user info container
    userInfoContainer.appendChild(card);
}

function fetchRepositories(username, page, perPage) {
    // Show loader
    document.getElementById('loader').classList.remove('d-none');

    const accessToken = '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'; // Replace with your actual GitHub personal access token
    const apiUrl = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`;

    fetch(apiUrl, {
        headers: {
            Authorization: `token ${accessToken}`,
        },
    })
        .then(response => {
            if (response.status === 404) {
                throw new Error('User not found. Please enter a valid GitHub username.');
            }
            if (!response.ok) {
                throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Hide loader
            document.getElementById('loader').classList.add('d-none');

            // Display repositories
            displayRepositories(data);
        })
        .catch(error => {
            // Handle error
            console.error('Error fetching repositories:', error);
            alert(`Error fetching repositories: ${error.message}`);
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
fetchUserInformation();
