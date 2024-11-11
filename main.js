const username = document.getElementById('username');
const profile = document.querySelector('.profile');

async function fetchGitProfile() {
    const user = username.value;
    profile.innerHTML = "";
    if (!user) {
        alert("Please enter a username!");
        return;
    }

    // Fetching
    try {
        const response = await fetch(`https://api.github.com/users/${user}`);

        // Check if username exists
        if (!response.ok){
            if (response.status===404){
                throw new Error('User not found');
            }else if (response.status===403){
                throw new error('API exceed limit');
            }else { throw new Error(`An unexpected error occurred (${response.status})`);}
        } 

        // Displaying data 
        const data = await response.json();
        profile.innerHTML = `
            <img src="${data.avatar_url}" alt="Profile picture">
            <h2>${data.name || 'No name available'}</h2>
            <p><strong>Username:</strong> ${data.login}</p>
            <p><strong>Bio:</strong> ${data.bio || 'No bio available'}</p>
            <p><strong>Location:</strong> ${data.location || 'No location available'}</p>
            <p><strong>Public Repos:</strong> ${data.public_repos}</p>
            <p><strong>Followers:</strong> ${data.followers}</p>
            <p><strong>Following:</strong> ${data.following}</p>
            <p><a href="${data.html_url}" target="_blank">View Profile on GitHub</a></p>`;
            console.log(data);
    } catch (error) {
        profile.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}
