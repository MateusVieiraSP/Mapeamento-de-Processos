document.addEventListener("DOMContentLoaded", () => {
    const etapas = JSON.parse(sessionStorage.getItem("etapas")) || [];
});

async function exportToExcel() {
    const dadosFormulario = JSON.parse(sessionStorage.getItem("dadosFormulario")) || {};
    const etapas = JSON.parse(sessionStorage.getItem("etapas")) || [];

    if (!dadosFormulario || Object.keys(dadosFormulario).length === 0) {
        alert("Não há dados do formulário disponíveis para exportação.");
        return;
    }

    if (etapas.length === 0) {
        alert("Não há etapas disponíveis para exportação.");
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const formularioSheet = workbook.addWorksheet("Formulário");

    formularioSheet.columns = [
        { header: "Nome do Responsável pelo Preenchimento", key: "responsavel", width: 40 },
        { header: "Nome do Superior Hierárquico", key: "superior", width: 40 },
        { header: "Nome do Órgão ou da Entidade", key: "orgao", width: 40 },
        { header: "Sigla", key: "sigla", width: 20 },
        { header: "Categoria", key: "categoria", width: 20 },
        { header: "Subcategoria", key: "subcategoria", width: 20 },
        { header: "Nome do Setor", key: "setor", width: 40 },
        { header: "Nome do Processo", key: "nomeProcesso", width: 40 },
        { header: "Objetivo do Processo", key: "objetivoProcesso", width: 50 }
    ];

    formularioSheet.addRow({
        responsavel: dadosFormulario.responsavel || "",
        superior: dadosFormulario.superior || "",
        orgao: dadosFormulario.orgao || "",
        sigla: dadosFormulario.sigla || "",
        categoria: dadosFormulario.categoria || "",
        subcategoria: dadosFormulario.subcategoria || "",
        setor: dadosFormulario.setor || "",
        nomeProcesso: dadosFormulario.nomeProcesso || "",
        objetivoProcesso: dadosFormulario.objetivoProcesso || ""
    });

    formularioSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            cell.font = { name: 'Calibri', size: 11, bold: rowNumber === 1 };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            if (rowNumber === 1) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'A6CAF0' } // Azul claro para o cabeçalho
                };
            } else {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'E8F4FA' } // Azul muito suave para as linhas de dados
                };
            }
        });
    });

    const mapeamentoSheet = workbook.addWorksheet("Mapeamento");
    mapeamentoSheet.columns = [
        { header: "Nome da Etapa/Subetapa", key: "nome", width: 30 },
        { header: "Pergunta", key: "pergunta", width: 50 },
        { header: "Resposta", key: "resposta", width: 50 }
    ];

    function processarEtapa(sheet, tipo, etapa, parentType = null, level = 0) {
        let currentType = tipo;

        if (parentType && parentType !== "Etapa") {
            currentType = "Subetapa";
        }

        const prefix = "  ".repeat(level);
        sheet.addRow({ nome: prefix + etapa.name });

        if (etapa.questions) {
            addPerguntasERespostas(sheet, etapa.questions);
        }

        if (etapa.substeps) {
            etapa.substeps.forEach((substep) =>
                processarEtapa(sheet, substep.type, substep, currentType, level + 1)
            );
        }
    }

    function addPerguntasERespostas(sheet, perguntas) {
        perguntas.forEach((pergunta) => {
            const resposta = Array.isArray(pergunta.answer)
                ? pergunta.answer.join(", ")
                : pergunta.answer || "";

            sheet.addRow({
                nome: "",
                pergunta: pergunta.label,
                resposta: resposta
            });
        });
    }

    etapas.forEach((etapa) => processarEtapa(mapeamentoSheet, "Etapa", etapa));

    mapeamentoSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
            cell.font = { name: 'Calibri', size: 11, bold: rowNumber === 1 };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
            if (rowNumber === 1) {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'A6CAF0' } // Azul claro para o cabeçalho
                };
            } else {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'E8F4FA' } // Azul muito suave para as linhas de dados
                };
            }
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ProcessData.xlsx";
    anchor.click();
    window.URL.revokeObjectURL(url);
}

document.getElementById("exportButton").addEventListener("click", exportToExcel);
