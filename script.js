document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginPanel = document.getElementById('login-panel');
    const dashboard = document.getElementById('dashboard');
    const welcomeMessage = document.getElementById('welcome-message');
    const sortOptions = document.getElementById('sort-options');
    const userContainer = document.getElementById('user-container');

    function login() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        console.log(`Username: ${username}, Password: ${password}`); // Debugging log


        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('username', username);
            welcomeMessage.textContent = `Welcome ${username}`;
            loginPanel.style.display = 'none';
            dashboard.style.display = 'block';
        } else {
            alert('Invalid login details');
        }
    }

    async function fetchUsers() {
        try {
            const res = await fetch('https://api.github.com/users?per_page=10');
            let data = await res.json();

            console.log(data); 

           
            if (Array.isArray(data)) {
                
                if (sortOptions.value === 'alphabetical') {
                    data = data.sort((a, b) => a.login.localeCompare(b.login));
                }

                userContainer.innerHTML = '';

                const heading = document.createElement('h1');
                // heading.textContent = 'Top 10 GitHub Users';
                userContainer.appendChild(heading);

                data.forEach(user => {
                    const userElement = document.createElement('p');
                    const userLink = document.createElement('a');
                    userLink.href = user.html_url;
                    userLink.textContent = user.login;
                    userLink.target = '_blank';
                    userLink.style.textDecoration = 'none'; 

                    userElement.appendChild(userLink);
                    userContainer.appendChild(userElement);
                });
            } else {
                throw new Error('Unexpected data format');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            userContainer.textContent = 'An error occurred while fetching the data';
        }
    }

    function logout() {
        localStorage.removeItem('username');
        loginPanel.style.display = 'block';
        dashboard.style.display = 'none';
    }

    
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        welcomeMessage.textContent = `Welcome ${storedUsername}`;
        loginPanel.style.display = 'none';
        dashboard.style.display = 'block';
    }

    window.login = login;
    window.fetchUsers = fetchUsers;
    window.logout = logout;
});