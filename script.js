// Récupération des éléments
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const deleteBtn = document.getElementById("deleteBtn");
const taskList = document.getElementById("taskList");
const editModal = document.getElementById("editModal");
const closeBtn = document.querySelector(".close-btn");
const editTaskForm = document.getElementById("editTaskForm");
const editTaskInput = document.getElementById("editTaskInput");

// Fonction pour afficher/masquer la sidebar
toggleBtn.addEventListener("click", function() {
    sidebar.classList.toggle("active");
});

// Fonction pour ajouter une tâche
addTaskBtn.addEventListener("click", function() {
    const taskText = taskInput.value.trim();

    // Récupérer la valeur du statut
    const statusRadios = document.querySelectorAll('input[name="status"]');
    const status = Array.from(statusRadios).find(radio => radio.checked)?.value;

    // Récupérer la valeur de la priorité
    const priorityRadios = document.querySelectorAll('input[name="priority"]');
    const priority = Array.from(priorityRadios).find(radio => radio.checked)?.value;

    if (taskText !== "" && status && priority) {
        const li = document.createElement("li");
        li.classList.add("list-group-item");

        // Créer la checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");

        // Créer le texte de la tâche avec la classe task-text
        const taskLabel = document.createElement("span");
        taskLabel.classList.add("task-text");
        taskLabel.textContent = taskText;

        // Créer les indicateurs de statut et priorité
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
        statusRadios.forEach(radio => radio.checked = false);
        priorityRadios.forEach(radio => radio.checked = false);
    } else {
        alert("Veuillez entrer une tâche et sélectionner un statut et une priorité !");
    }
});

// Fonction pour supprimer les tâches sélectionnées
deleteBtn.addEventListener("click", function() {
    const checkboxes = document.querySelectorAll(".task-checkbox");
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkbox.parentElement.remove();
        }
    });
});

// Fonction pour afficher la fenêtre modale et remplir les champs avec les données de la tâche
taskList.addEventListener("click", function(e) {
    if (e.target && e.target.tagName === "SPAN") {
        const taskItem = e.target.closest("li");

        // Remplir les champs du formulaire avec les valeurs actuelles de la tâche
        editTaskInput.value = taskItem.querySelector(".task-text").textContent;

        // Préselectionner le statut
        const status = taskItem.getAttribute("data-status");
        document.querySelector(`input[name="editStatus"][value="${status}"]`).checked = true;

        // Préselectionner la priorité
        const priority = taskItem.getAttribute("data-priority");
        document.querySelector(`input[name="editPriority"][value="${priority}"]`).checked = true;

        // Afficher la modale
        editModal.style.display = "block";

        // Lorsque le formulaire est soumis
        editTaskForm.onsubmit = function(e) {
            e.preventDefault();

            // Mettre à jour le texte de la tâche
            taskItem.querySelector(".task-text").textContent = editTaskInput.value;
            taskItem.setAttribute("data-status", document.querySelector('input[name="editStatus"]:checked').value);
            taskItem.setAttribute("data-priority", document.querySelector('input[name="editPriority"]:checked').value);

            // Fermer la modale
            editModal.style.display = "none";
        };
    }
});

// Fonction pour fermer la modale
closeBtn.addEventListener("click", function() {
    editModal.style.display = "none";
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
