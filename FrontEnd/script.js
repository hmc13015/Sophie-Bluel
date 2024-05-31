// Récupération des données des travaux
async function récupérerDonnées() {
  try {
    const reponse = await fetch('http://localhost:5678/api/works');
    if (!reponse.ok) {
      throw new Error('La réponse du réseau n\'a pas été correcte');
    }
    const data = await reponse.json();
    return data;
  } catch (erreur) {
    console.error('Il y a eu un problème lors de l\'opération de récupération :', erreur);
    throw erreur;
  }
}

// Récupération des catégories
async function récupérerCatégories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    if (!response.ok) {
      throw new Error('La réponse du réseau n\'a pas été correcte');
    }
    const data = await response.json();
    return data;
  } catch (erreur) {
    console.error('Il y a eu un problème avec l\'opération de fetch :', erreur);
    throw erreur;
  }
}

// Affichage des travaux
function afficherTravaux(data, containerId) {
  const gallery = document.getElementById(containerId);
  gallery.innerHTML = ''; 

  for (const article of data) {
    const div = document.createElement("div");
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    div.appendChild(imageElement);

    if (containerId !== 'modal-gallery') {
      const titreElement = document.createElement("p");
      titreElement.innerText = article.title;
      div.appendChild(titreElement);
    }

    gallery.appendChild(div);
  }
}

// Affichage des catégories
async function afficherCatégories() {
  try {
    const categories = await récupérerCatégories();
    const filtres = document.getElementById("filtres");

    const boutonTous = document.createElement("button");
    boutonTous.innerText = "Tous";
    boutonTous.addEventListener("click", async () => {
      const travaux = await récupérerDonnées();
      afficherTravaux(travaux, 'gallery');
      afficherTravaux(travaux, 'modal-gallery');
    });
    filtres.appendChild(boutonTous);

    for (const categorie of categories) {
      const bouton = document.createElement("button");
      bouton.innerText = categorie.name;
      bouton.addEventListener("click", async () => {
        const travaux = await récupérerDonnées();
        const travauxFiltrés = travaux.filter(travail => travail.categoryId === categorie.id);
        afficherTravaux(travauxFiltrés, 'gallery');
        afficherTravaux(travauxFiltrés, 'modal-gallery');
      });
      filtres.appendChild(bouton);
    }
  } catch (erreur) {
    console.error(erreur);
  }
}

// Initialisation
async function init() {
  try {
    const travaux = await récupérerDonnées();
    afficherTravaux(travaux, 'gallery');
    afficherTravaux(travaux, 'modal-gallery');
    await afficherCatégories();
    await afficherCatégoriesForm();
  } catch (erreur) {
    console.error(erreur);
  }
}

// Affichage des catégories dans le formulaire
async function afficherCatégoriesForm() {
  try {
    const categories = await récupérerCatégories();
    const categorySelect = document.getElementById('categoryId');

    for (const categorie of categories) {
      const option = document.createElement("option");
      option.value = categorie.id;
      option.innerText = categorie.name;
      categorySelect.appendChild(option);
    }
  } catch (erreur) {
    console.error(erreur);
  }
}

init();

// Partie modale
const modal = document.getElementById('modal');
const openModalButtons = document.querySelectorAll('.open-modal-btn'); 
const closeModalBtn = document.getElementsByClassName('close-btn')[0];

function ouvrirModale() {
  modal.style.display = 'block';
}

function fermerModale() {
  modal.style.display = 'none';
}

openModalButtons.forEach(button => {
  button.addEventListener('click', ouvrirModale);
});

closeModalBtn.addEventListener('click', fermerModale);

window.addEventListener('click', function(event) {
  if (event.target === modal) {
    fermerModale();
  }
});
