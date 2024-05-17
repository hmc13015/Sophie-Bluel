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
  // Utilisation de la fonction récupérerDonnées pour obtenir les données
  récupérerDonnées()
    .then(data => {
        console.log(data);
        const gallery = document.getElementById("gallery");

        for (const article of data ) {
            const div = document.createElement("div")
            const imageElement = document.createElement("img")
            imageElement.src = article.imageUrl
            div.appendChild(imageElement)
            const titreElement = document.createElement("p")
            titreElement.innerText = article.title
            div.appendChild(titreElement)
            gallery.appendChild(div)
      
        }
        
    })
    .catch(erreur => {
      // Gérer l'erreur
      console.error(erreur);
    });

    // Partie filtres
    fetch('http://localhost:5678/api/categories')
    .then(réponse => {
      if (!réponse.ok) {
        throw new Error('La réponse du réseau n\'a pas été correcte');
      }
      return réponse.json();
    })
    .then(données => {
      console.log(données);
      
    })
    .catch(erreur => {
      console.error('Il y a eu un problème avec l\'opération de fetch :', erreur);
    });
  
