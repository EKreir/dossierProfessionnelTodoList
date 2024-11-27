// Récupération des éléments
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const deleteBtn = document.getElementById("deleteBtn");
const taskList = document.getElementById("taskList");

// Fonction pour afficher/masquer la sidebar
toggleBtn.addEventListener("click", function() {
    sidebar.classList.toggle("active"); // Ajoute ou retire la classe "active" pour afficher/masquer la sidebar
});

// Fonction pour ajouter une tâche
addTaskBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim(); // Récupère le texte de la tâche

    // Récupérer la valeur du statut
    const statusRadios = document.querySelectorAll('input[name="status"]');
    const status = Array.from(statusRadios).find(radio => radio.checked)?.value;

    // Récupérer la valeur de la priorité
    const priorityRadios = document.querySelectorAll('input[name="priority"]');
    const priority = Array.from(priorityRadios).find(radio => radio.checked)?.value;

    // Si le champ n'est pas vide et un statut et priorité sont sélectionnés
    if (taskText !== "" && status && priority) {
        // Créer un nouvel élément de liste pour la tâche
        const li = document.createElement("li");
        li.classList.add("list-group-item");

        // Créer la checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");

        // Créer le texte de la tâche
        const taskLabel = document.createElement("span");
        taskLabel.textContent = taskText;

        // Créer les indicateurs de statut et priorité (petites cases colorées)
        const statusDot = document.createElement("span");
        statusDot.classList.add("status-dot");
        switch (status) {
            case "A faire":
                statusDot.style.backgroundColor = "white";
                break;
            case "En cours":
                statusDot.style.backgroundColor = "#D78D04";
                break;
            case "Fait":
                statusDot.style.backgroundColor = "#45A500";
                break;
        }

        const priorityDot = document.createElement("span");
        priorityDot.classList.add("priority-dot");
        switch (priority) {
            case "Basse":
                priorityDot.style.backgroundColor = "#A9E1A1";
                break;
            case "Moyenne":
                priorityDot.style.backgroundColor = "#F2FF66";
                break;
            case "Haute":
                priorityDot.style.backgroundColor = "#CF7373";
                break;
        }

        // Ajouter les éléments à la tâche
        li.appendChild(statusDot);
        li.appendChild(priorityDot);
        li.appendChild(checkbox);
        li.appendChild(taskLabel);

        // Ajouter les attributs data pour filtrer les tâches
        li.setAttribute("data-status", status);
        li.setAttribute("data-priority", priority);

        // Ajouter l'élément à la liste
        taskList.appendChild(li);

        // Réinitialiser l'input et la sélection
        taskInput.value = "";
        statusRadios.forEach(radio => radio.checked = false); // Réinitialiser les boutons radio du statut
        priorityRadios.forEach(radio => radio.checked = false); // Réinitialiser les boutons radio de la priorité
    } else {
        alert("Veuillez entrer une tâche et sélectionner un statut et une priorité !");
    }
});

// Fonction pour supprimer les tâches sélectionnées
deleteBtn.addEventListener("click", function() {
    // Récupérer toutes les cases à cocher
    const checkboxes = document.querySelectorAll(".task-checkbox");

    // Parcourir toutes les cases et supprimer celles qui sont cochées
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkbox.parentElement.remove(); // Supprimer l'élément parent (la tâche)
        }
    });
});

// Fonction pour filtrer les tâches par statut ou priorité
const filterTasks = (status = null, priority = null) => {
    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        const taskStatus = task.getAttribute("data-status");
        const taskPriority = task.getAttribute("data-priority");

        if ((status && taskStatus !== status) || (priority && taskPriority !== priority)) {
            task.style.display = "none";  // Masquer les tâches qui ne correspondent pas au filtre
        } else {
            task.style.display = "";  // Afficher les tâches qui correspondent au filtre
        }
    });
};

// Événements pour les liens de la barre de navigation
document.querySelectorAll(".lien-one, .lien-two, .lien-three").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const status = this.getAttribute("data-status");
        filterTasks(status, null);
    });
});

document.querySelectorAll(".lien-four, .lien-five, .lien-six").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const priority = this.getAttribute("data-priority");
        filterTasks(null, priority);
    });
});
