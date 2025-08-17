function getData(key) {
    try {
        const data = localStorage.getItem(key);
        // Se 'data' for nulo (não existir), retorna nulo. Senão, faz o parse.
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Erro ao buscar dados para a chave "${key}":`, error);
        return null;
    }
}

/**
 * Salva dados no localStorage de forma segura.
 * Converte o valor fornecido para uma string JSON antes de salvar.
 * @param {string} key A chave para salvar no localStorage.
 * @param {any} value O valor a ser salvo.
 */
function setData(key, value) {
    try {
        const jsonValue = JSON.stringify(value);
        localStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error(`Erro ao salvar dados para a chave "${key}":`, error);
    }
}