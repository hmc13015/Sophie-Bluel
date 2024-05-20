document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
   
    if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
      window.location.href = 'index.html';
    } else {
      const errorMessage = document.getElementById('error-message');
      errorMessage.innerText = 'E-mail ou mot de passe incorrect.';
      errorMessage.style.display = 'block';
    }
  });
  