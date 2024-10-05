import { createTask } from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const taskForm = document.querySelector("#task-form");

export const setupTasks = () => {
  // CREATE
  taskForm.addEventListener("submit", async (e) => {
    // Prevenir que la página se recargue
    e.preventDefault();

    // Obtener los datos del formulario
    const title = taskForm["title"].value;
    const description = taskForm["description"].value;

    // Crear una nueva tarea
    try {
      await createTask(title, description);
      // Mostrar mensaje de éxito
      showMessage("Tarea creada", "success");
      // Limpiar el formulario
      taskForm.reset();
    } catch (error) {
      // Mostrar mensaje de error
      showMessage(error.code, "error");
    }
  });
};
