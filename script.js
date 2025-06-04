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

  alert(`Sugestão enviada:\nPortuguês: ${pt}\nWai Wai: ${wai}`);
  ptInput.value = "";
  waiInput.value = "";
}
