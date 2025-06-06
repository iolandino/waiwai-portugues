// Obter elementos uma vez
const inputTranslate = document.getElementById('translateInput');
const resultDiv = document.getElementById('translationResult');

const inputSuggestPt = document.getElementById('suggestPt');
const inputSuggestWai = document.getElementById('suggestWai');

// Dicionário de traduções dummy
const dummyTranslations = {
  "universidade": "miyahxixakehcamhokatopo",
  "livro": "karita",
  "aula": "kehcamhokatopo"
};

// Função para traduzir termo
function translateTerm() {
  if (!inputTranslate) return;

  const word = inputTranslate.value.trim().toLowerCase();

  if (!word) {
    showTranslationMessage("Digite uma palavra para traduzir.", true);
    return;
  }

  const translation = dummyTranslations[word] || "Tradução não encontrada.";
  resultDiv.textContent = translation;
}

// Função para mostrar mensagens de tradução (erro ou sucesso)
function showTranslationMessage(message, isError = false) {
  if (!resultDiv) return;
  resultDiv.textContent = message;
  resultDiv.style.color = isError ? 'red' : 'black';
}

// Função para enviar sugestão
function submitSuggestion() {
  if (!inputSuggestPt || !inputSuggestWai) return;

  const pt = inputSuggestPt.value.trim();
  const wai = inputSuggestWai.value.trim();

  if (!pt || !wai) {
    alert("Preencha os dois campos.");
    return;
  }

  // Aqui pode ser melhorado para salvar sugestões localmente ou enviar para backend
  alert("Sugestão enviada com sucesso!");

  // Limpar campos após envio
  inputSuggestPt.value = "";
  inputSuggestWai.value = "";
}

// Opcional: Adicionar event listeners para UX melhor
document.addEventListener('DOMContentLoaded', () => {
  if (inputTranslate) {
    inputTranslate.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') translateTerm();
    });
  }
});
