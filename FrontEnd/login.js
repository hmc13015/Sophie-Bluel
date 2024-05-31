document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  login(email, password)
    .then(data => {
      if (data.token) {
        // Stocker le token dans le Local Storage
        localStorage.setItem('authToken', data.token);

        // Rediriger vers la page d'accueil ou une autre page protégée
        window.location.href = 'index.html';
      } else {
        displayErrorMessage('E-mail ou mot de passe incorrect.');
      }
    })
    .catch(error => {
      console.error('Erreur de login:', error);
      displayErrorMessage('Une erreur s\'est produite. Veuillez réessayer plus tard.');
    });
});

async function login(email, password) {
  const payload = { email, password };
  console.log(payload);
  
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('La réponse du réseau n\'a pas été correcte');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Il y a eu un problème avec l\'opération de login :', error);
    throw error;
  }
}

function displayErrorMessage(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.innerText = message;
  errorMessage.style.display = 'block';
}
