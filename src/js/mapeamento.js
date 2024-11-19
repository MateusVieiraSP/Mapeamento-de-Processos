const steps = [];
let lastCreatedElement = null; // Variável para armazenar o último elemento criado

// Perguntas específicas para Etapas e Subetapas
const perguntasEtapa = [
    { id: "objetivo", label: "Objetivo desta etapa *", type: "text" },
    { id: "recursosHumanos", description: "Agentes públicos envolvidos em cada etapa do processo.", label: "Recursos humanos utilizados nesta etapa *", type: "select", options: ["Agente administrativo", "Agente comunitário e de endemias", "Agente de saúde", "Agrônomo", "Analista", "Arquiteto", "Arquivista", "Assessor", "Assistente", "Auditor", "Auxiliar administrativo", "Chefe de assessoria", "Chefe de equipe", "Coordenador", "Diretor", "Enfermeiro", "Engenheiro", "Estagiário", "Fiscal de posturas municipais", "Geólogo", "Gerente de projetos", "Gestor de equipamento público", "Guarda civil metropolitano", "Inspetor de alunos", "Médico", "Motorista", "Nutricionista", "Policial", "Procurador do município", "Professor", "Residente", "Secretário municipal", "Subprefeito", "Supervisor"] },
    { id: "dadosPessoais", description: "Dado pessoal refere-se a qualquer informação relacionada a uma pessoa física identificada ou identificável, como nome, endereço, número de telefone, e-mail, data de nascimento, número de CPF ou RG. Dado pessoal sensível é uma subcategoria de dado pessoal que envolve informações sobre aspectos mais íntimos e que, se divulgadas ou mal utilizadas, podem resultar em discriminação ou violação da privacidade do indivíduo. Exemplos de dados pessoais sensíveis incluem origem racial ou étnica, opiniões políticas, convicções religiosas ou filosóficas, filiação sindical, dados genéticos ou biométricos, dados relativos à saúde, e dados sobre a vida sexual ou orientação sexual da pessoa.", label: "Quais são os dados pessoais utilizados nesta etapa *", type: "text" },
    { id: "recursosFisicos", description: "Infraestrutura física utilizada nesta etapa do processo.", label: "Recursos físicos utilizados nesta etapa", type: "checkbox", options: ["Câmera", "Computador", "Dispositivo de mídia removível", "Impressora", "Material biológico", "Mobiliário de armazenamento de documento físico", "Papel", "Scanner", "Telefone/Celular", "Webcam"] },
    { id: "recursosTecnologicos", description: "Selecione os recursos de tecnologia, como softwares, utilizados para o desenvolvimento desta subetapa", label: "Recursos tecnológicos utilizados nesta etapa", type: "checkbox", options: ["Aplicações da Adobe", "Aplicações da Google (Gmail, Google Drive, Google Meet, entre outros)", "Aplicações da Meta (WhatsApp, Facebook, Instagram, entre outros)", "Diário Oficial da Cidade (DOC)", "Microsoft Excel (ou editores de planilha similares)", "Microsoft OneDrive (ou demais aplicações em nuvem)", "Microsoft Outlook (ou provedores de e-mail similares)", "Microsoft Power BI (ou visualizadores estruturadores de dados similares)", "Microsoft Teams (ou canais de comunicação similares)", "Microsoft Word (ou editores de texto similares)", "Sistema Eletrônico de Informações (SEI!)", "Sistema Eletrônico de Informação ao Cidadão (e-Sic)", "Sistema Integrado de Gestão do Relacionamento com o Cidadão (SIGRC)", "Sistema de Orçamento e Finanças (SOF)", "Sistema de Registro de Bens dos Agentes Públicos (SISPATRI)", "Sistema Integrado para Gestão de Suprimentos e Serviços (SIGSS)", "Waran"] },
    { id: "comunicacao", description: "Descreva como são realizadas as atividades/tarefas de interação entre os agentes públicos (entende-se como agentes públicos, para os efeitos deste formulário, os cargos/funções e não os nomes dos agentes) nessa etapa do processo e como é efetuado o compartilhamento de informações e de documentos entre as etapas ou subetapas anteriores e posteriores a esta (Quem faz? O que faz? Como faz? Por onde faz? Por que faz? Se envia, para quem envia e como envia?).", label: "Comunicação e compartilhamento das informações *", label: "Comunicação e compartilhamento das informações *", type: "text" },
    { id: "taxonomia", description: "Informação é o conhecimento que pode ser documentado. Neste caso, diz respeito ao objeto/assunto das informações que são geradas ou compartilhadas. Necessariamente, serão geradas informações em todas as etapas ou subetapas.", label: "Taxonomia dos recursos informacionais (informações geradas) *", type: "text" },
    { id: "informacionais", description: "Documento é o suporte em que uma informação gerada ou compartilhada é representada a partir de diferentes expressões da percepção humana, como a escrita, a imagem, o áudio e o vídeo. Não necessariamente serão gerados documentos em todas as etapas. Caso não haja, insira (Não se aplica).", label: "Taxonomia dos recursos informacionais (documentos gerados) *", type: "text" }
];

const perguntasSubetapa = [
    { id: "objetivo", label: "Objetivo desta subetapa *", type: "text" },
    { id: "recursosHumanos", description: "Agentes públicos envolvidos em cada subetapa do processo.", label: "Recursos humanos utilizados nesta subetapa", type: "select", options: ["Agente administrativo", "Agente comunitário e de endemias", "Agente de saúde", "Agrônomo", "Analista", "Arquiteto", "Arquivista", "Assessor", "Assistente", "Auditor", "Auxiliar administrativo", "Chefe de assessoria", "Chefe de equipe", "Coordenador", "Diretor", "Enfermeiro", "Engenheiro", "Estagiário", "Fiscal de posturas municipais", "Geólogo", "Gerente de projetos", "Gestor de equipamento público", "Guarda civil metropolitano", "Inspetor de alunos", "Médico", "Motorista", "Nutricionista", "Policial", "Procurador do município", "Professor", "Residente", "Secretário municipal", "Subprefeito", "Supervisor"] },
    { id: "dadosPessoais", label: "Quais são os dados pessoais utilizados nesta subetapa *", description: "Dado pessoal refere-se a qualquer informação relacionada a uma pessoa física identificada ou identificável, como nome, endereço, número de telefone, e-mail, data de nascimento, número de CPF ou RG. Dado pessoal sensível é uma subcategoria de dado pessoal que envolve informações sobre aspectos mais íntimos e que, se divulgadas ou mal utilizadas, podem resultar em discriminação ou violação da privacidade do indivíduo. Exemplos de dados pessoais sensíveis incluem origem racial ou étnica, opiniões políticas, convicções religiosas ou filosóficas, filiação sindical, dados genéticos ou biométricos, dados relativos à saúde, e dados sobre a vida sexual ou orientação sexual da pessoa.", type: "text" },
    { id: "recursosFisicos", description: "Infraestrutura física utilizada nesta subetapa do processo.", label: "Recursos físicos utilizados nesta subetapa", type: "checkbox", options: ["Câmera", "Computador", "Dispositivo de mídia removível", "Impressora", "Material biológico", "Mobiliário de armazenamento de documento físico", "Papel", "Scanner", "Telefone/Celular", "Webcam"] },
    { id: "recursosTecnologicos", description: "Selecione os recursos de tecnologia, como softwares, utilizados para o desenvolvimento desta subetapa", label: "Recursos tecnológicos utilizados nesta subetapa", type: "checkbox", options: ["Aplicações da Adobe", "Aplicações da Google (Gmail, Google Drive, Google Meet, entre outros)", "Aplicações da Meta (WhatsApp, Facebook, Instagram, entre outros)", "Diário Oficial da Cidade (DOC)", "Microsoft Excel (ou editores de planilha similares)", "Microsoft OneDrive (ou demais aplicações em nuvem)", "Microsoft Outlook (ou provedores de e-mail similares)", "Microsoft Power BI (ou visualizadores estruturadores de dados similares)", "Microsoft Teams (ou canais de comunicação similares)", "Microsoft Word (ou editores de texto similares)", "Sistema Eletrônico de Informações (SEI!)", "Sistema Eletrônico de Informação ao Cidadão (e-Sic)", "Sistema Integrado de Gestão do Relacionamento com o Cidadão (SIGRC)", "Sistema de Orçamento e Finanças (SOF)", "Sistema de Registro de Bens dos Agentes Públicos (SISPATRI)", "Sistema Integrado para Gestão de Suprimentos e Serviços (SIGSS)", "Waran"] },
    { id: "comunicacao", description: "Descreva como são realizadas as atividades/tarefas de interação entre os agentes públicos (entende-se como agentes públicos, para os efeitos deste formulário, os cargos/funções e não os nomes dos agentes) nessa subetapa do processo e como é efetuado o compartilhamento de informações e de documentos entre as etapas ou subetapas anteriores e posteriores a esta (Quem faz? O que faz? Como faz? Por onde faz? Por que faz? Se envia, para quem envia e como envia?).", label: "Comunicação e compartilhamento das informações *", type: "text" },
    { id: "taxonomia", description: "Informação é o conhecimento que pode ser documentado. Neste caso, diz respeito ao objeto/assunto das informações que são geradas ou compartilhadas. Necessariamente, serão geradas informações em todas as etapas ou subetapas.", label: "Taxonomia dos recursos informacionais (informações geradas) *", type: "text" },
    { id: "informacionais", description: "Documento é o suporte em que uma informação gerada ou compartilhada é representada a partir de diferentes expressões da percepção humana, como a escrita, a imagem, o áudio e o vídeo. Não necessariamente serão gerados documentos em todas as etapas. Caso não haja, insira (Não se aplica).", label: "Taxonomia dos recursos informacionais (documentos gerados) *", type: "text" }
];

// Função para inicializar perguntas com base no tipo
function initializeQuestions(tipo) {
    const perguntas = tipo === "etapa" ? perguntasEtapa : perguntasSubetapa;
    return perguntas.map(q => ({ ...q, answer: q.type === "checkbox" ? [] : (q.type === "select" ? {} : "") }));
}

function saveStepsToSessionStorage() {
    sessionStorage.setItem("etapas", JSON.stringify(steps));
}

// Verifica se há etapas e desabilita/habilita o botão "saveAndNextButton"
function checkStepsAndToggleButton() {
    const saveButton = document.getElementById("saveAndNextButton");
    if (steps.length > 0) {
        saveButton.disabled = false; // Habilita o botão se houver pelo menos uma etapa
    } else {
        saveButton.disabled = true; // Desabilita o botão se não houver etapas
    }
}

// Chamada ao criar uma etapa
function createStep() {
    const stepName = document.getElementById("stepName").value.trim();
    if (!stepName) {
        alert("Insira um nome para a Etapa");
        return;
    }

    const step = { id: Date.now(), name: stepName, questions: initializeQuestions("etapa"), substeps: [], type: "etapa" };
    steps.push(step);
    saveStepsToSessionStorage();
    console.log("Estrutura de steps após criar etapa:", JSON.stringify(steps, null, 2)); // Log para verificação

    document.getElementById("stepName").value = "";
    updateSelectors();
    renderSteps();
    checkStepsAndToggleButton(); // Verifica e atualiza o botão

    lastCreatedElement = document.querySelector("#stepsTree li.step-item:last-child");
    updateScrollToStepSelector(); // Atualiza o seletor com a nova etapa
}

// Verificação inicial quando a página é carregada
document.addEventListener("DOMContentLoaded", () => {
    renderSteps();
    checkStepsAndToggleButton(); // Verifica o estado do botão ao carregar a página
});

// Evento de clique do botão "saveAndNextButton"
document.getElementById("saveAndNextButton").addEventListener("click", (event) => {
    if (steps.length === 0) {
        event.preventDefault(); // Impede a navegação se não houver etapas
        alert("Por favor, crie pelo menos uma etapa antes de prosseguir para o download.");
    } else {
        saveStepsToSessionStorage();
        window.location.href = "export.html"; // Redireciona para a página correta de exportação
    }
});

function createSubstep() {
    const substepName = document.getElementById("substepName").value.trim();
    const selectedStepId = document.getElementById("stepSelector").value;

    if (!substepName || !selectedStepId) {
        return alert("Insira o nome da Subetapa e selecione uma Etapa");
    }

    const step = findNodeById(steps, selectedStepId);
    if (!step) {
        return alert("Etapa não encontrada. Selecione uma etapa válida.");
    }

    const substep = { id: Date.now(), name: substepName, questions: initializeQuestions("subetapa"), substeps: [], type: "subetapa" };
    step.substeps.push(substep);
    saveStepsToSessionStorage();
    console.log("Estrutura de steps após criar subetapa:", JSON.stringify(steps, null, 2)); // Log para verificação

    document.getElementById("substepName").value = "";
    updateSelectors();
    renderSteps();

    lastCreatedElement = document.querySelector("#stepsTree li.substep-item:last-child");
    updateScrollToStepSelector(); // Atualiza o seletor com a nova subetapa
}

function createLinkedStep() {
    const linkedName = document.getElementById("stepName").value.trim();
    const linkedToId = document.getElementById("linkToSelector").value;

    if (!linkedName) return alert("Insira um nome para a nova Etapa ou Subetapa");

    const newNode = { id: Date.now(), name: linkedName, questions: initializeQuestions(), substeps: [], type: "etapa" };

    if (linkedToId) {
        const parentNode = findNodeById(steps, linkedToId);
        if (parentNode && parentNode.substeps) {
            newNode.type = "subetapa"; // Marca como subetapa quando atrelada
            parentNode.substeps.push(newNode); // Adiciona como subetapa do elemento pai
        } else {
            alert("A etapa ou subetapa selecionada para atrelar não foi encontrada.");
        }
    } else {
        steps.push(newNode); // Adiciona como uma nova etapa principal se não houver etapa para atrelar
    }

    saveStepsToSessionStorage();
    console.log("Estrutura de steps após criar etapa atrelada:", JSON.stringify(steps, null, 2));

    document.getElementById("stepName").value = "";
    updateSelectors();
    renderSteps();
    updateScrollToStepSelector(); // Atualiza o seletor para incluir a nova etapa/subetapa
}

function findNodeById(nodes, id) {
    for (const node of nodes) {
        if (node.id == id) return node;
        if (node.substeps) {  // Verifica se existem subetapas
            const found = findNodeById(node.substeps, id);
            if (found) return found;
        }
    }
    return null;
}

function updateSelectors() {
    const stepSelector = document.getElementById("stepSelector");
    const linkToSelector = document.getElementById("linkToSelector");

    stepSelector.innerHTML = '<option value="">Selecione uma Etapa para Atrelar</option>';
    linkToSelector.innerHTML = '<option value="">Não Atrelar</option>';

    steps.forEach(step => {
        addOptionToSelector(stepSelector, step, true);
        addOptionToSelector(linkToSelector, step, true);
    });
}

function addOptionToSelector(selector, node, includeSubsteps = false, parentPath = "") {
    const option = document.createElement("option");
    option.value = node.id;
    option.textContent = parentPath ? `${parentPath} > ${node.name}` : node.name;
    selector.appendChild(option);

    if (includeSubsteps && node.substeps) {
        node.substeps.forEach(substep => addOptionToSelector(selector, substep, includeSubsteps, `${option.textContent}`));
    }
}

function renderSteps() {
    const stepsTree = document.getElementById("stepsTree");
    stepsTree.innerHTML = "";
    steps.forEach(step => {
        const stepElement = createStepElement(step);
        stepsTree.appendChild(stepElement);
    });
}

function createStepElement(step) {
    const stepItem = document.createElement("li");
    stepItem.className = "step-item";
    stepItem.setAttribute("data-id", step.id); // Atribui ID para rolar diretamente
    stepItem.innerHTML = `<h4>${step.name}</h4>`;

    // Renderiza perguntas da etapa
    const questionsList = document.createElement("ul");
    step.questions.forEach(q => questionsList.appendChild(createQuestionElement(q)));
    stepItem.appendChild(questionsList);

    const substepsList = document.createElement("ul");
    step.substeps.forEach(substep => {
        const substepElement = createSubstepElement(substep);
        substepsList.appendChild(substepElement);
    });
    stepItem.appendChild(substepsList);

    return stepItem;
}

function createSubstepElement(substep) {
    const substepItem = document.createElement("li");
    substepItem.className = "substep-item";
    substepItem.setAttribute("data-id", substep.id); // Atribui ID único para rolagem
    substepItem.innerHTML = `<h5>${substep.name}</h5>`;

    const questionsList = document.createElement("ul");
    substep.questions.forEach(q => questionsList.appendChild(createQuestionElement(q)));
    substepItem.appendChild(questionsList);

    const subSubstepsList = document.createElement("ul");
    substep.substeps.forEach(subSubstep => {
        const subSubstepElement = createSubstepElement(subSubstep);
        subSubstepsList.appendChild(subSubstepElement);
    });
    substepItem.appendChild(subSubstepsList);

    return substepItem;
}

function createQuestionElement(question) {
    const questionGroup = document.createElement("li");
    questionGroup.className = "questions-group";

    // Cria o rótulo do campo
    const label = document.createElement("label");
    label.className = "question-label";
    label.innerText = question.label;
    questionGroup.appendChild(label);

    // Verifica se há uma descrição e a adiciona abaixo do rótulo
    if (question.description) {
        const description = document.createElement("small");
        description.className = "question-description";
        description.innerText = question.description;
        questionGroup.appendChild(description);
    }

    // Criação do campo de entrada conforme o tipo
    if (question.type === "text") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = question.answer;
        input.oninput = () => question.answer = input.value;
        questionGroup.appendChild(input);
    } else if (question.type === "select") {
        const selectContainer = document.createElement("div");
        selectContainer.className = "multi-select-container";

        question.options.forEach(opt => {
            const optionButton = document.createElement("button");
            optionButton.className = "option-button";
            optionButton.innerText = opt;
            optionButton.onclick = (event) => {
                event.preventDefault();
                if (!question.answer[opt]) {
                    question.answer[opt] = 1; // Quantidade padrão = 1
                }
                renderTagWithQuantity(selectContainer, question, opt);
            };
            selectContainer.appendChild(optionButton);
        });

        // Renderiza todas as opções previamente selecionadas
        Object.keys(question.answer).forEach(opt => {
            if (question.answer[opt] > 0) {
                renderTagWithQuantity(selectContainer, question, opt);
            }
        });

        questionGroup.appendChild(selectContainer);
    } else if (question.type === "checkbox") {
        const checkboxContainer = document.createElement("div");
        checkboxContainer.className = "checkbox-container";

        question.options.forEach(opt => {
            const checkboxLabel = document.createElement("label");
            checkboxLabel.className = "checkbox-label";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = opt;
            checkbox.checked = question.answer.includes(opt);
            checkbox.onchange = () => {
                if (checkbox.checked) {
                    question.answer.push(opt);
                } else {
                    question.answer = question.answer.filter(v => v !== opt);
                }
            };

            const optionText = document.createElement("span");
            optionText.innerText = opt;

            checkboxLabel.appendChild(checkbox);
            checkboxLabel.appendChild(optionText);
            checkboxContainer.appendChild(checkboxLabel);
        });

        questionGroup.appendChild(checkboxContainer);
    }

    return questionGroup;
}

// Função para renderizar a tag com campo de quantidade
function renderTagWithQuantity(container, question, option) {
    let tagContainer = container.querySelector(`.tag-container[data-option="${option}"]`);
    if (!tagContainer) {
        tagContainer = document.createElement("div");
        tagContainer.className = "tag-container";
        tagContainer.setAttribute("data-option", option);

        // Cria o rótulo da tag
        const tagLabel = document.createElement("span");
        tagLabel.className = "tag-label";
        tagLabel.innerText = option;
        tagContainer.appendChild(tagLabel);

        // Cria o campo de entrada de quantidade
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = "1";
        quantityInput.value = question.answer[option] || 1;
        quantityInput.className = "quantity-input";
        quantityInput.oninput = () => {
            const value = parseInt(quantityInput.value);
            if (!isNaN(value) && value > 0) {
                question.answer[option] = value;
                saveStepsToSessionStorage();
            } else {
                delete question.answer[option];
                tagContainer.remove();
                saveStepsToSessionStorage();
            }
        };
        tagContainer.appendChild(quantityInput);

        // Botão para remover a tag
        const removeButton = document.createElement("button");
        removeButton.className = "remove-tag-button";
        removeButton.innerText = "x";
        removeButton.onclick = (event) => {
            event.preventDefault();
            delete question.answer[option];
            tagContainer.remove();
            saveStepsToSessionStorage();
        };
        tagContainer.appendChild(removeButton);

        container.appendChild(tagContainer);
    } else {
        // Atualiza o valor da quantidade se o campo já existir
        const quantityInput = tagContainer.querySelector(".quantity-input");
        if (quantityInput) {
            quantityInput.value = question.answer[option];
        }
    }
}

// Atualiza a lista de etapas e subetapas no seletor
function updateScrollToStepSelector() {
    const scrollToStepSelector = document.getElementById("scrollToStepSelector");
    scrollToStepSelector.innerHTML = '<option value="">Selecione uma Etapa/Subetapa</option>'; // Opção padrão

    steps.forEach(step => {
        addOptionToScrollSelector(scrollToStepSelector, step);
    });
}

// Adiciona opções de etapas e subetapas ao seletor com estrutura hierárquica
function addOptionToScrollSelector(selector, node, parentPath = "", level = 0) {
    const option = document.createElement("option");
    option.value = node.id;
    option.textContent = `${" ".repeat(level * 2)}${parentPath ? parentPath + " > " : ""}${node.name}`;
    option.title = node.name; // Exibe o nome completo ao passar o mouse
    selector.appendChild(option);

    // Adiciona subetapas recursivamente com o nível de indentação
    if (node.substeps && node.substeps.length > 0) {
        node.substeps.forEach(substep => addOptionToScrollSelector(selector, substep, `${parentPath ? parentPath + " > " : ""}${node.name}`, level + 1));
    }
}

// Evento para rolar até o item selecionado no seletor
document.getElementById("scrollToStepSelector").addEventListener("change", (event) => {
    const selectedId = event.target.value;
    if (selectedId) {
        const targetNode = findNodeById(steps, selectedId);
        if (targetNode) {
            const element = document.querySelector(`[data-id="${targetNode.id}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                element.classList.add("highlight");
                setTimeout(() => element.classList.remove("highlight"), 1200); // Destaque temporário
                event.target.value = ""; // Redefine o seletor após a navegação
            }
        }
    }
});

// Botão "Voltar ao Topo" para rolar até o topo da página
document.getElementById("scrollToTopButton").addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Event listeners
document.getElementById("createStepBtn").addEventListener("click", (event) => {
    event.preventDefault();
    createStep();
});
document.getElementById("createSubstepBtn").addEventListener("click", (event) => {
    event.preventDefault();
    createSubstep();
});
document.getElementById("createLinkedStepBtn").addEventListener("click", (event) => {
    event.preventDefault();
    createLinkedStep();
});
document.getElementById("saveAndNextButton").addEventListener("click", (event) => {
    event.preventDefault();
    saveStepsToSessionStorage();
    window.location.href = "export.html"; // Redireciona para a página correta de exportação
});

renderSteps();