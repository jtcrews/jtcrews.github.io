const API_URL = 'https://api.github.com';

window.onload = function () {
    fetchRepos('jtcrews');
}

document.getElementById('searchButton').addEventListener('click', () => {
    const username = document.getElementById('usernameInput').value;
    fetchRepos(username);
});

function fetchRepos(username) {
    fetch(`${API_URL}/users/${username}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(repos => {
            displayRepos(repos, username);
        })
        .catch(error => {
            document.getElementById('gallery').innerHTML = `<p>${error.message}</p>`;
        });
}

function displayRepos(repos, username) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    repos.forEach(repo => {
        fetchRepoInfo(repo, username);
    });
}

function fetchRepoInfo(repo, username) {
    fetch(`${API_URL}/repos/${username}/${repo.name}/commits`)
        .then(commitResponse => commitResponse.json())
        .then(commits => {
            const numCommits = commits.length;

            fetch(`${API_URL}/repos/${username}/${repo.name}/languages`)
                .then(langResponse => langResponse.json())
                .then(languages => {
                    const languageList = Object.keys(languages).join(', ');

                    buildRepoContainer(repo, numCommits, languageList);
                });
        });
}

function buildRepoContainer(repo, numCommits, languageList) {
    const gallery = document.getElementById('gallery');

    const repoContainer = document.createElement('div');
    repoContainer.className = 'repo-container';

    repoContainer.innerHTML = `
        <h3><i class="fab fa-github icon"></i><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || 'No description available'}</p>
        <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
        <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
        <p><strong>Commits:</strong> ${numCommits}</p>
        <p><strong>Languages:</strong> ${languageList || 'Not available'}</p>
        <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
    `;

    gallery.appendChild(repoContainer);
}
