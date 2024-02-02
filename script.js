// Function to fetch and display repositories
function fetchUserInformation() {
    const githubUsernameInput = document.getElementById('githubUsername');
    const githubUsername = githubUsernameInput.value.trim(); // Trim whitespace

    // Check if a username is entered
    if (!githubUsername) {
        alert('Please enter a GitHub username.');
        return;
    }

    const apiUrl = `https://api.github.com/users/${githubUsername}`;

    fetch(apiUrl)
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
            fetchRepositories(githubUsername, 1, 10); // Default perPage is 10
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
    githubUsername.innerHTML = `<i class="fab fa-github"></i> ${user.login}`;
    cardBody.appendChild(githubUsername);

    // Followers and Following
    const followersFollowing = document.createElement('p');
    followersFollowing.classList.add('text-muted');
    followersFollowing.innerHTML = `<i class="fa fa-users"></i> ${user.followers} followers - ${user.following} following`;
    cardBody.appendChild(followersFollowing);

    // Location
    if (user.location) {
        const location = document.createElement('p');
        location.classList.add('text-muted');
        location.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> ${user.location}`;
        cardBody.appendChild(location);
    }
    // Append card body to card
    card.appendChild(cardBody);

    // Append card to user info container
    userInfoContainer.appendChild(card);
}

function fetchRepositories(username, page, perPage) {
    // Show loader
    document.getElementById('loader').classList.remove('d-none');

    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;

    fetch(apiUrl)
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

function changePerPage() {
    const githubUsername = document.getElementById('githubUsername').value.trim();
    const perPage = document.getElementById('perPage').value;
    fetchRepositories(githubUsername, 1, perPage);
}

// Initial fetch (on page load)
// fetchUserInformation();  // Uncomment this line if you want to fetch user information on page load
