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

function afficherTravaux(data) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = ''; 

  for (const article of data) {
    const div = document.createElement("div");
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    div.appendChild(imageElement);
    const titreElement = document.createElement("p");
    titreElement.innerText = article.title;
    div.appendChild(titreElement);
    gallery.appendChild(div);
  }
}

async function afficherCatégories() {
  try {
    const categories = await récupérerCatégories();
    console.log(categories);
    const filtres = document.getElementById("filtres");

    
    const boutonTous = document.createElement("button");
    boutonTous.innerText = "Tous";
    boutonTous.addEventListener("click", async () => {
      const travaux = await récupérerDonnées();
      afficherTravaux(travaux);
    });
    filtres.appendChild(boutonTous);

    for (const categorie of categories) {
      const bouton = document.createElement("button");
      bouton.innerText = categorie.name;
      bouton.addEventListener("click", async () => {
        const travaux = await récupérerDonnées();
        const travauxFiltrés = travaux.filter(travail => travail.categoryId === categorie.id);
        afficherTravaux(travauxFiltrés);
      });
      filtres.appendChild(bouton);
    }
  } catch (erreur) {
    console.error(erreur);
  }
}

async function init() {
  try {
    const travaux = await récupérerDonnées();
    afficherTravaux(travaux);
    await afficherCatégories();
  } catch (erreur) {
    console.error(erreur);
  }
}

// Appel de la fonction d'initialisation pour afficher les données et les catégories
init();


// Partie modale
const modal = document.getElementById('modal');

const openModalBtn = document.getElementById('open-modal-btn');

const closeModalBtn = document.getElementsByClassName('close-btn')[0];

openModalBtn.onclick = function() {
  modal.style.display = 'block';
}

closeModalBtn.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
