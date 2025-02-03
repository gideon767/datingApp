const getUsers = () => {
    return JSON.parse(localStorage.getItem('users')) || [];
}

const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
}

const addUser = () => {
    let name = document.getElementById('name').value;
    let age = parseInt(document.getElementById('age').value);
    let gender = document.getElementById('gender').value;
    let interests = document.getElementById('interests').value.split(',').map(i => i.trim().toLowerCase());
    
    if (!name || isNaN(age) || interests.length === 0) {
        alert("Please fill all fields correctly.");
        return;
    }
    
    let users = getUsers();
    users.push({ name, age, gender, interests });
    saveUsers(users);
    alert(`${name} added successfully!`);
}

const findMatch = () => {
    document.getElementById("matches").innerHTML = "";
    let users = getUsers();
    if (users.length < 2) {
        alert("Not enough users to make a match.");
        return;
    }
    
    let results = "<h3>Match Results</h3>";
    let matchedUsers = [];
    
    for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
            let user1 = users[i];
            let user2 = users[j];
            
            if (user1.gender !== user2.gender) {
                let commonInterests = user1.interests.filter(interest => user2.interests.includes(interest));
                let ageDifference = Math.abs(user1.age - user2.age);
                
                if (commonInterests.length >= 1 && ageDifference <= 10) {
                    results += `<p>${user1.name} and ${user2.name} are a great match! 🎉</p>`;
                    matchedUsers.push(user1, user2);
                }
            }
        }
    }

    if (matchedUsers.length === 0) {
        results += "<p>No perfect matches found. Try adding more details or inviting more users.</p>";
    }
    document.getElementById("matches").innerHTML = results;
}

const deleteUser = () => {
    let name = prompt("Enter the name of the user to delete:");
    if (!name) return;
    let users = getUsers();
    let filteredUsers = users.filter(user => user.name.toLowerCase() !== name.toLowerCase());
    if (users.length === filteredUsers.length) {
        alert("User not found.");
    } else {
        saveUsers(filteredUsers);
        alert("User deleted successfully.");
    }
}