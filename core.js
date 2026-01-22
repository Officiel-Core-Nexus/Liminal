<script>
// Vérifie si l'utilisateur est connecté
function isLogged() {
  return localStorage.getItem("liminal_user") !== null;
}

// Récupère le username
function getUser() {
  return localStorage.getItem("liminal_user");
}

// Active le mode créateur
function activateCreator() {
  localStorage.setItem("liminal_creator", "true");
}

// Vérifie si mode créateur actif
function isCreator() {
  return localStorage.getItem("liminal_creator") === "true";
}

// Déconnexion
function logout() {
  localStorage.removeItem("liminal_user");
  localStorage.removeItem("liminal_email");
  localStorage.removeItem("liminal_pass");
  localStorage.removeItem("liminal_creator");
  window.location.href = "login.html";
}

// Bloque l’accès si pas connecté
function protectPage() {
  if (!isLogged()) {
    window.location.href = "login.html";
  }
}
</script>
