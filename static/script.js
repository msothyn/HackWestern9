let username;

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
                } else {
                    //code for invalid username
                    document.getElementById('existingUser-status').innerText = "This does not exist! Please try again."
                }
            }))
}

function verifyNewUsername() {
    let url = '/getUsername/'
    const query = document.getElementById('newUsername').value
    username = document.getElementById('newUsername').value
    url += query

    fetch(url)
        .then(res => res.json()
            .then(data => {
                console.log(data)
                if (data.length == 0) {
                    // create entered username and add to DB 
                    addUsernames();
                } else {
                    //code for invalid username
                    document.getElementById('addUser-status').innerText = "This username is taken! Please try again."

                }
            }))
}

function addUsernames() {
    let path = '/add';

    fetch(path, {
        method: "POST",
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify({
            username: document.getElementById("newUsername").value
        })
    })
        .then(res => {
            document.getElementById('addUser-status').innerText = "Your username was successfully created!!"

            let place = document.getElementById('addUser-status')
            let details = document.createElement('button')
            let link = document.createElement('a');
            link.href = "newUserDetails.html"
            link.appendChild(document.createTextNode('Next'))
            details.appendChild(link)
            place.appendChild(details);
        })
}


