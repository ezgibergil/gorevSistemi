document.addEventListener("DOMContentLoaded", () => {
    const taskNameInput = document.getElementById("task-name");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const totalTasks = document.getElementById("total-tasks");
    const completedTasks = document.getElementById("completed-tasks");
    const filterButtons = document.querySelectorAll(".task-filters button");

    let tasks = [];
    let currentFilter = "all"; // Varsayılan olarak "tümü" seçili

    // Görev ekleme
    addTaskButton.addEventListener("click", () => {
        const taskName = taskNameInput.value.trim();
        if (taskName === "") {
            alert("Görev adı boş olamaz!");
            return;
        }

        const task = {
            id: Date.now(),
            name: taskName,
            status: "inprogress", // Varsayılan olarak "yapılıyor"
        };

        tasks.push(task);
        taskNameInput.value = "";
        renderTasks();
    });

    // Görev durumu değiştirme
    taskList.addEventListener("change", (e) => {
        if (e.target.tagName === "SELECT") {
            const taskId = e.target.dataset.id;
            const task = tasks.find((t) => t.id == taskId);
            task.status = e.target.value;
            renderTasks();
        }
    });

    // Görev silme
    taskList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const taskId = e.target.dataset.id;
            tasks = tasks.filter((t) => t.id != taskId);
            renderTasks();
        }
    });

    // Filtreleme butonları
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter;
            renderTasks();
        });
    });

    // Görevleri ekrana yazdırma
    function renderTasks() {
        taskList.innerHTML = "";

        tasks
            .filter((task) => {
                if (currentFilter === "all") return true;
                return task.status === currentFilter;
            })
            .forEach((task) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span>${task.name} (${task.status})</span>
                    <select data-id="${task.id}">
                        <option value="pending" ${task.status === "pending" ? "selected" : ""}>Yapılacak</option>
                        <option value="inprogress" ${task.status === "inprogress" ? "selected" : ""}>Yapılıyor</option>
                        <option value="completed" ${task.status === "completed" ? "selected" : ""}>Tamamlandı</option>
                    </select>
                    <button data-id="${task.id}">Sil</button>
                `;
                taskList.appendChild(li);
            });

        updateReport();
    }

    // Raporlama güncelleme
    function updateReport() {
        totalTasks.textContent = tasks.length;
        completedTasks.textContent = tasks.filter((t) => t.status === "completed").length;
    }
});