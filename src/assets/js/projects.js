const projectsData = {
    projects_mateus: [
        {
            id: 'p1_m',
            title: 'Projeto A (Mateus)',
            description: 'Descrição',
            link: '#',
            image: '/img/projects/p1_m.png'
        }
        ],
    projects_luiz: [
        {
            id: 'p2_l',
            title: 'Projeto Luiz',
            description: 'descrição',
            link: 'link do github',
            image: '/img/projects/p2_l.png'
        }
    ]
};

setData('projects_mateus', projectsData.projects_mateus);
setData('projects_luiz', projectsData.projects_luiz);

function renderProjects(storageKey, containerId) {
    const container = document.getElementById(containerId);
    const projects = getData(storageKey) || [];

    if (projects.length === 0) {
        container.innerHTML = '<p>Nenhum projeto para ser exibido.</p>';
        return;
    }

    projects.forEach(project => {
        const projectCard = document.createElement('div');
    })
}