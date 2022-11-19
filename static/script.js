function verifyExistingUsername() {
    let url = '/getUsername/'
    const query = document.getElementById('username').value
    url += query

    fetch(url)
        .then(res => res.json()
            .then(data => {
                if(data[0]){
                    let place = document.getElementById('nextButton')
                    let details = document.createElement('button')
                    let link = document.createElement('a');
                    link.href = "newUser.html"
                    link.appendChild(document.createTextNode('Next'))
                    details.appendChild(link)
                    place.appendChild(details);
                }else{
                    //code for invalid username
                }
            }))
}