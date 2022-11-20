document.getElementById('verificationButton').addEventListener('click', verifyExistingUsername);
document.getElementById('verifyNewUsername').addEventListener('click', verifyNewUsername);
document.getElementById('enterInfo').addEventListener('click', addUserInfo);

var username;

function addUsername() {
    let url = '/writeUsername/'
    const query = document.getElementById('username').value
    url += query
    fetch(url, {
        method: "POST",
        headers: { 'Content-type': "application/json" },
    })
}

function getUsername() {
    let url = '/getStoredUsername'
    fetch(url)
        .then(res => res.json()
            .then(data =>{
                username = data.username;
                addUserInfo()
            }))
}

function verifyExistingUsername() {
    let url = '/getUsername/'
    const query = document.getElementById('username').value
    username = document.getElementById('username').value;
    url += query

    fetch(url)
        .then(res => res.json()
            .then(data => {
                if (data[0]) {
                    let place = document.getElementById('nextButton')
                    let details = document.createElement('button')
                    let link = document.createElement('a');
                    link.href = "mainPage.html"
                    link.appendChild(document.createTextNode('Next'))
                    details.appendChild(link)
                    place.appendChild(details);
                    document.getElementById("verificationButton").disabled = true;
                    addUsername()
                } else {
                    //code for invalid username
                    document.getElementById('existingUser-status').innerText = "This does not exist! Please try again."
                }
            }))
}

function verifyNewUsername() {
    let url = '/getUsername/'
    const query = document.getElementById('username').value
    username = document.getElementById('username').value
    url += query

    fetch(url)
        .then(res => res.json()
            .then(data => {
                if (data.length == 0) {
                    // create entered username and add to DB 
                    addUsernames();
                    addUsername();
                } else {
                    //code for invalid username
                    document.getElementById('addUser-status').innerText = "This username is taken! Please try again."

                }
            }))
}

function addUserInfo() {
    let path = '/add';
    let daysLeft = document.getElementById("cycle").value - document.getElementById("lastPeriod").value

    fetch(path, {
        method: "POST",
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify({
            username: username,
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            avgCycle: document.getElementById("cycle").value,
            dayLeft: daysLeft,
        })
    })
        .then(res => {
            document.getElementById('addUser-status').innerText = "Your user info was successfully added!!"

            let place = document.getElementById('addUser-status')
            let details = document.createElement('button')
            let link = document.createElement('a');
            link.href = "mainPage.html"
            link.appendChild(document.createTextNode('Next'))
            details.appendChild(link)
            place.appendChild(details);
        })
}

function addUsernames() {
    let path = '/add';

    fetch(path, {
        method: "POST",
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify({
            username: document.getElementById("username").value
        })
    })
        .then(res => {
            document.getElementById('addUser-status').innerText = "Your username was successfully created!!"

            let place = document.getElementById('addUser-status')
            let details = document.createElement('button')
            let link = document.createElement('a');
            link.href = "newUserDetails.html"
            link.appendChild(document.createTextNode('Next'))
            document.getElementById("verifyNewUser").disabled=true;
            details.appendChild(link)
            place.appendChild(details);
        })
}


