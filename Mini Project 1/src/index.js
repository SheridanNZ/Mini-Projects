// Newsletter - get value of email input field
document.getElementById('subscribeBtn').addEventListener('click', function() {
    const email = document.getElementById('emailInput').value;

    console.log('User Email:', email); // log email address to console

    document.getElementById('emailInput').value = ''; // clear input field after log
});
