function getData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Erro ao buscar dados para a chave "${key}":`, error);
        return null;
    }
}

function setData(key, value) {
    try {
        const jsonValue = JSON.stringify(value);
        localStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error(`Erro ao salvar dados para a chave "${key}":`, error);
    }
}