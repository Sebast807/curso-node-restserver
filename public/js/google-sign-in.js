
function handleCredentialResponse(response) {

    const body = { id_token: response.credential };

    fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            localStorage.setItem('email', res.user.email);
        })
        .catch(console.warn)
}

//Sign out
const button = document.querySelector("#google-sign-out")

button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        localStorage.reload();
    })
}