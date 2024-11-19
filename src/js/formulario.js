document.addEventListener("DOMContentLoaded", () => {
    const orgaoSelect = document.getElementById("orgao");
    const siglaInput = document.getElementById("sigla");
    const subcategoriaInput = document.getElementById("subcategoria");
    const categoriaInput = document.getElementById("categoria");
    const formularioProcesso = document.getElementById("formularioProcesso");
    const botaoAvancar = document.querySelector(".form-actions .button");

    // Inicialize `dadosFormulario` no início
    const dadosFormulario = JSON.parse(sessionStorage.getItem("dadosFormulario")) || {};

    // Verifique se todos os elementos estão presentes antes de prosseguir
    if (orgaoSelect && siglaInput && subcategoriaInput && categoriaInput && formularioProcesso && botaoAvancar) {
        
        // Carregar dados do JSON para preencher campos adicionais
        fetch("../assets/orgaos.json")
            .then(response => response.json())
            .then(data => {
                orgaoSelect.addEventListener("input", () => {
                    const orgaoSelecionado = orgaoSelect.value;
                    if (data[orgaoSelecionado]) {
                        const orgaoData = data[orgaoSelecionado];
                        siglaInput.value = orgaoData.sigla || "";
                        subcategoriaInput.value = orgaoData.subcategoria || "";
                        categoriaInput.value = orgaoData.categoria || "";
                        document.getElementById("camposAdicionais").style.display = "block";

                        // Atualiza o sessionStorage com os dados do órgão selecionado
                        dadosFormulario["sigla"] = orgaoData.sigla || "";
                        dadosFormulario["subcategoria"] = orgaoData.subcategoria || "";
                        dadosFormulario["categoria"] = orgaoData.categoria || "";
                    } else {
                        siglaInput.value = "";
                        subcategoriaInput.value = "";
                        categoriaInput.value = "";
                        document.getElementById("camposAdicionais").style.display = "none";

                        // Limpa os dados no sessionStorage se o órgão for desmarcado
                        dadosFormulario["sigla"] = "";
                        dadosFormulario["subcategoria"] = "";
                        dadosFormulario["categoria"] = "";
                    }

                    // Salva os dados atualizados no sessionStorage
                    dadosFormulario["orgao"] = orgaoSelecionado;
                    sessionStorage.setItem("dadosFormulario", JSON.stringify(dadosFormulario));
                });
            })
            .catch(error => console.error("Erro ao carregar os dados do JSON:", error));

        // Atualiza o sessionStorage em tempo real conforme os inputs são preenchidos
        formularioProcesso.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", () => {
                dadosFormulario[input.name] = input.value.trim();
                sessionStorage.setItem("dadosFormulario", JSON.stringify(dadosFormulario));
            });
        });

        // Verificar campos obrigatórios ao clicar no botão de avançar
        botaoAvancar.addEventListener("click", () => {
            let camposPreenchidos = true;

            formularioProcesso.querySelectorAll("input").forEach(input => {
                if (input.required && !input.value.trim()) {
                    console.warn(`Campo obrigatório ${input.name} está vazio.`);
                    alert("Por favor, preencha todos os campos obrigatórios.");
                    camposPreenchidos = false;
                    return;
                }
            });

            if (camposPreenchidos) {
                console.log("Todos os dados do formulário foram salvos no sessionStorage:", dadosFormulario);
                window.location.href = "mapeamento.html";
            }
        });
    } else {
        console.error("Alguns elementos de formulário não foram encontrados na página.");
    }
});
