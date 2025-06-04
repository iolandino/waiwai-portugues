// Alternar entre seções na mesma página
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.style.display = 'none');
  const target = document.getElementById(sectionId);
  if (target) target.style.display = 'block';
}

// Simulação de tradução
function translate() {
  const input = document.getElementById('translateInput');
  const resultDiv = document.getElementById('translationResult');
  if (!input || !resultDiv) return;

  const word = input.value.trim().toLowerCase();
  if (!word) {
    resultDiv.textContent = "";
    alert("Digite uma palavra para traduzir.");
    return;
  }

  const dummyTranslations = {
    "universidade": "wai-universi",
    "livro": "wai-libru",
    "aula": "wai-aura"
  };

  resultDiv.textContent = dummyTranslations[word] || "Tradução não encontrada.";
}

// Sugestão de novo termo
function submitSuggestion() {
  const ptInput = document.getElementById('suggestPt');
  const waiInput = document.getElementById('suggestWai');
  if (!ptInput || !waiInput) return;

  const pt = ptInput.value.trim();
  const wai = waiInput.value.trim();

  if (!pt || !wai) {
    alert("Preencha os dois campos.");
    return;
  }

  alert("Sugestão enviada com sucesso!");
  ptInput.value = "";
  waiInput.value = "";
}

// Cadastro de usuário
function registerUser() {
  const name = document.getElementById('registerName')?.value.trim();
  const email = document.getElementById('registerEmail')?.value.trim();
  const password = document.getElementById('registerPassword')?.value.trim();

  if (!name || !email || !password) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
      alert("Este email já está cadastrado.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
  } catch (error) {
    alert("Erro ao acessar o armazenamento local.");
    console.error(error);
  }
}

// Login de usuário
function loginUser() {
  const email = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value.trim();
  const message = document.getElementById('login-message');
  if (!email || !password || !message) return;

  try {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      message.textContent = "Email ou senha incorretos.";
      message.style.color = 'red';
      return;
    }

    sessionStorage.setItem('loggedUser', JSON.stringify(user));
    message.textContent = "Login realizado com sucesso! Redirecionando...";
    message.style.color = 'green';

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  } catch (error) {
    console.error("Erro no login:", error);
  }
}

// Exibir/ocultar menu do perfil (dropdown) com acessibilidade
function toggleDropdown() {
  const dropdown = document.getElementById("dropdownMenu");
  const profilePic = document.getElementById("profilePic");
  if (!dropdown || !profilePic) return;

  const isOpen = dropdown.classList.contains("show");

  if (isOpen) {
    dropdown.classList.remove("show");
    profilePic.setAttribute("aria-expanded", "false");
  } else {
    dropdown.classList.add("show");
    profilePic.setAttribute("aria-expanded", "true");
    dropdown.focus();
  }
}

// Fecha o menu se clicar fora dele
window.addEventListener("click", function(event) {
  const profileMenu = document.querySelector(".profile-menu");
  const dropdown = document.getElementById("dropdownMenu");
  const profilePic = document.getElementById("profilePic");
  if (!profileMenu || !dropdown || !profilePic) return;

  if (!profileMenu.contains(event.target)) {
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
      profilePic.setAttribute("aria-expanded", "false");
    }
  }
});

// Navegação no dropdown via teclado e ESC para fechar
function handleDropdownKey(event) {
  const dropdown = event.currentTarget;
  const profilePic = document.getElementById("profilePic");
  if (!dropdown || !profilePic) return;

  const focusableItems = Array.from(dropdown.querySelectorAll('button[role="menuitem"]'));
  const currentIndex = focusableItems.indexOf(document.activeElement);

  switch(event.key) {
    case "Escape":
      dropdown.classList.remove("show");
      profilePic.setAttribute("aria-expanded", "false");
      profilePic.focus();
      break;
    case "ArrowDown":
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % focusableItems.length;
      focusableItems[nextIndex].focus();
      break;
    case "ArrowUp":
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + focusableItems.length) % focusableItems.length;
      focusableItems[prevIndex].focus();
      break;
  }
}

// Exibir menu personalizado se estiver logado
function showProfileMenu() {
  const profileMenu = document.getElementById('profileMenu');
  const navLinks = document.querySelector('.nav-links');
  if (profileMenu && navLinks) {
    profileMenu.style.display = 'flex';
    navLinks.style.display = 'none';
  }
}

// Mostrar dados do usuário no perfil
function showUserProfile() {
  const user = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
  if (user.name && user.email) {
    const nameElem = document.getElementById("profileName");
    const emailElem = document.getElementById("profileEmail");
    if (nameElem) nameElem.textContent = user.name;
    if (emailElem) emailElem.textContent = user.email;
  }
}

// Logout
function logout() {
  sessionStorage.removeItem('loggedUser');

  const dropdown = document.getElementById("dropdownMenu");
  const profilePic = document.getElementById("profilePic");
  if (dropdown?.classList.contains("show")) {
    dropdown.classList.remove("show");
    if (profilePic) profilePic.setAttribute("aria-expanded", "false");
  }

  window.location.href = 'login.html';
}

// Verifica login ao carregar página
document.addEventListener('DOMContentLoaded', () => {
  const loggedUser = sessionStorage.getItem('loggedUser');
  if (loggedUser) {
    showProfileMenu();
    showUserProfile();
  }

  // Adiciona listener de teclado para o dropdown se existir
  const dropdown = document.getElementById("dropdownMenu");
  if (dropdown) {
    dropdown.addEventListener("keydown", handleDropdownKey);
  }
});
