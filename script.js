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

function showMessage(text, isError = true) {
  const messageDiv = document.getElementById('message');
  if (!messageDiv) return;

  messageDiv.textContent = text;
  messageDiv.className = isError ? 'message error' : 'message success';
}

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

  const suggestion = { pt, wai };
  let suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
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
