function verifyExistingUsername() {
    let place = document.getElementById('nextButton')
    let details = document.createElement('button')
    let link = document.createElement('a');
    link.href = "newUser.html"
    link.appendChild(document.createTextNode('Next'))
    details.appendChild(link)
    place.appendChild(details);
}