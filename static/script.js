var username;
var cycle;
var nameOfPerson;
var age;
var avgCycle;

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
            .then(data => {
                username = data.username;
                addUserInfo()
            }))
}

function getUsernameAndDay() {
    let url = '/getStoredUsername'
    fetch(url)
        .then(res => res.json()
            .then(data => {
                username = data.username;
                averageCycle()
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
            document.getElementById('enterInfo').disabled = true;
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
            document.getElementById("verifyNewUsername").disabled = true;
            details.appendChild(link)
            place.appendChild(details);
        })
}

function dayCount(daysLeft) {
    document.getElementById('periodMain').innerText = `Your period is in ${daysLeft} days`
    document.getElementById('mainBtn').disabled = true;
}

function updateUserInfo() {
    let daysAgo;
    let path = '/add';

    if (document.getElementById("daysAgo").value == "") {
        daysAgo = 0
    } else {
        daysAgo = document.getElementById("daysAgo").value
    }

    let daysLeft = cycle - daysAgo

    fetch(path, {
        method: "POST",
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify({
            username: username,
            name: nameOfPerson,
            age: age,
            avgCycle: cycle,
            dayLeft: daysLeft,
        })
    })

    dayCount(daysLeft)

}

function averageCycle() {
    let url = '/getDayCount/'
    url += username
    fetch(url)
        .then(res => res.json()
            .then(data => {
                cycle = data[0].avgCycle
                nameOfPerson = data[0].name
                age = data[0].age
                updateUserInfo()
            })
        )
}