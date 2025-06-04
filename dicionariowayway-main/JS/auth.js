// Cadastro de usuário
function registerUser() {
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  if (!name || !email || !password) {
    alert("Preencha todos os campos.");
    return;
  }

  if(localStorage.getItem(email)) {
    alert("Este email já está cadastrado.");
    return;
  }

  localStorage.setItem(email, JSON.stringify({ name, password }));
  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}

// Login de usuário
function loginUser() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const user = JSON.parse(localStorage.getItem(email));

  if (!user || user.password !== password) {
    alert("Email ou senha incorretos.");
    return;
  }

  alert("Login realizado com sucesso!");
  localStorage.setItem("loggedUser", email);
  window.location.href = "perfil.html";
}

// Mostrar dados do usuário logado (ex: perfil)
function showUserProfile() {
  const email = localStorage.getItem("loggedUser");
  const user = JSON.parse(localStorage.getItem(email));

  if (user) {
    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = email;
  }
}

// Editar perfil do usuário logado
function editProfile() {
  const email = localStorage.getItem("loggedUser");
  if (!email) {
    alert("Usuário não está logado.");
    window.location.href = 'login.html';
    return;
  }

  const nameInput = document.getElementById('editName');
  const passwordInput = document.getElementById('editPassword');
  const msg = document.getElementById('msg');

  const newName = nameInput.value.trim();
  const newPassword = passwordInput.value.trim();

  if (!newName || !newPassword) {
    alert("Por favor, preencha o nome e a senha.");
    return;
  }

  const userDataJSON = localStorage.getItem(email);
  if (!userDataJSON) {
    alert("Dados do usuário não encontrados.");
    return;
  }

  const userData = JSON.parse(userDataJSON);
  userData.name = newName;
  userData.password = newPassword;

  localStorage.setItem(email, JSON.stringify(userData));

  msg.textContent = "Perfil atualizado com sucesso!";
  msg.style.color = "green";

  // Limpa o campo senha por segurança
  passwordInput.value = "";
}

// Logout
function logout() {
  localStorage.removeItem("loggedUser");
  window.location.href = 'index.html';
}
