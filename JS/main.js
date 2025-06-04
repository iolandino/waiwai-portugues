// Função para mostrar a seção especificada e esconder as outras
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  
  if (!sectionId) {
    // Se não passar sectionId, mostrar todas as seções (ou modificar conforme necessidade)
    sections.forEach(section => section.classList.remove('hidden'));
    return;
  }
  
  const targetSection = document.getElementById(sectionId);
  
  if (!targetSection) {
    console.warn(`Seção com id "${sectionId}" não encontrada.`);
    return;
  }
  
  sections.forEach(section => {
    if (section === targetSection) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });
}
