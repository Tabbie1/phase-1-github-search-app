document.addEventListener('DOMContentLoaded', function () {
    let githubForm = document.getElementById('github-form');
    let userList = document.getElementById('user-list');
    let reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', function (event) {
      event.preventDefault();
      let searchTerm = document.getElementById('search').value;
      
      userList.innerHTML = '';
      reposList.innerHTML = '';

      searchUsers(searchTerm);
    });
  
    function searchUsers(searchTerm) {
      fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  
    function displayUsers(users) {
      users.forEach(user => {
        let userItem = document.createElement('li');
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" />
          <span>${user.login}</span>
          <a href="#" data-username="${user.login}">View Repositories</a>
        `;
        userList.appendChild(userItem);
  
        let viewReposLink = userItem.querySelector('a');
        viewReposLink.addEventListener('click', function (event) {
          event.preventDefault();
          let username = viewReposLink.getAttribute('data-username');
          getUserRepos(username);
        });
      });
    }
  
    function getUserRepos(username) {
        let apiUrl = `https://api.github.com/users/${username}/repos`;
      fetch(apiUrl, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        })
        .catch(error => {
          console.error(`Error fetching repositories for ${username}:`, error);
        });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        let repoItem = document.createElement('li');
        repoItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        `;
        reposList.appendChild(repoItem);
      });
    }
  });
  