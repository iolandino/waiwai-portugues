// Alternar entre seções na mesma página
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.style.display = 'none');
  const target = document.getElementById(sectionId);
  if (target) target.style.display = 'block';
  clearMessages();

  if (sectionId === 'cadastro') {
    loadSuggestions();
  }
}

// Exibir mensagem
function showMessage(text, isError = true) {
  const messageDiv = document.getElementById('message');
  if (!messageDiv) return;

  messageDiv.textContent = text;
  messageDiv.className = isError ? 'message error' : 'message success';
}

// Limpar mensagens
function clearMessages() {
  const messageDiv = document.getElementById('message');
  if (messageDiv) {
    messageDiv.textContent = '';
    messageDiv.className = '';
  }
}

// Simulação de tradução
function translate() {
  clearMessages();
  const input = document.getElementById('translateInput');
  const resultDiv = document.getElementById('translationResult');
  if (!input || !resultDiv) return;

  const word = input.value.trim().toLowerCase();
  if (!word || word.length < 2) {
    resultDiv.innerHTML = '';
    showMessage("Digite uma palavra com pelo menos 2 letras.");
    return;
  }

  const dummyTranslations = {
    "universidade": "wai-universi",
    "livro": "wai-libru",
    "aula": "wai-aura"
  };

  const translation = dummyTranslations[word];
  resultDiv.innerHTML = translation
    ? `<p>${translation}</p>`
    : `<p>Tradução não encontrada.</p>`;
}

// Sugestão de novo termo com localStorage
function submitSuggestion() {
  clearMessages();
  const ptInput = document.getElementById('suggestPt');
  const waiInput = document.getElementById('suggestWai');
  if (!ptInput || !waiInput) return;

  const pt = ptInput.value.trim();
  const wai = waiInput.value.trim();

  if (!pt || !wai) {
    showMessage("Preencha os dois campos.");
    return;
  }

  let suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];

  const exists = suggestions.some(s => s.pt.toLowerCase() === pt.toLowerCase());
  if (exists) {
    showMessage("Essa sugestão já foi enviada.");
    return;
  }

  const suggestion = { pt, wai };
  suggestions.push(suggestion);
  localStorage.setItem("suggestions", JSON.stringify(suggestions));

  showMessage("Sugestão salva com sucesso!", false);
  ptInput.value = "";
  waiInput.value = "";
  loadSuggestions();
}

// Carregar sugestões do localStorage
function loadSuggestions() {
  const list = document.getElementById("suggestionsList");
  if (!list) return;

  const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];

  if (suggestions.length === 0) {
    list.innerHTML = "<p>Nenhuma sugestão registrada ainda.</p>";
    return;
  }

  list.innerHTML = "<h3>Sugestões Enviadas:</h3><ul>" +
    suggestions.map(s => `<li><strong>PT:</strong> ${s.pt} — <strong>WAI:</strong> ${s.wai}</li>`).join("") +
    "</ul>";
}

// Alternar menu dropdown
function toggleDropdown() {
  const menu = document.getElementById('dropdownMenu');
  if (!menu) return;
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Fecha o menu dropdown ao clicar fora dele
document.addEventListener('click', function (event) {
  const dropdown = document.getElementById('dropdownMenu');
  const profilePic = document.querySelector('.profile-pic');
  if (dropdown && !dropdown.contains(event.target) && (!profilePic || !profilePic.contains(event.target))) {
    dropdown.style.display = 'none';
  }
});

// Logout
function logout() {
  sessionStorage.removeItem('loggedUser');
  localStorage.removeItem('persistedUser');
  window.location.href = 'login.html';
}

// Mostrar menu do perfil
function showProfileMenu() {
  const profileMenu = document.getElementById('profileMenu');
  const navLinks = document.querySelector('.nav-links');
  if (profileMenu) profileMenu.style.display = 'flex';
  if (navLinks) navLinks.style.display = 'none'; // Esconde os links Início, Cadastro, Login quando logado
}

// Modo escuro com ícone e aria-label dinâmicos
function setupDarkModeToggle() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) {
      darkModeToggle.textContent = '☀️';
      darkModeToggle.setAttribute('aria-label', 'Desativar modo escuro');
    }
  } else {
    if (darkModeToggle) {
      darkModeToggle.textContent = '🌙';
      darkModeToggle.setAttribute('aria-label', 'Ativar modo escuro');
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const enabled = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', enabled);
      darkModeToggle.textContent = enabled ? '☀️' : '🌙';
      darkModeToggle.setAttribute('aria-label', enabled ? 'Desativar modo escuro' : 'Ativar modo escuro');
    });
  }
}

// Ao carregar a página
window.onload = function () {
  const loggedUser = sessionStorage.getItem('loggedUser') || localStorage.getItem('persistedUser');
  if (loggedUser) {
    sessionStorage.setItem('loggedUser', loggedUser);
    showProfileMenu();
  }
  setupDarkModeToggle();
};
