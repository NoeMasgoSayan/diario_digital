import {
  createComments,
  onGetComments,
  deleteComments,
  updateComments,
  getComments,
} from "./firebase.js";
import { showMessage } from "./toastMessage.js";

const commentForm = document.querySelector("#comment-form");
const commentsContainer = document.querySelector("#comments-container");

// Variables para la edición
let editStatus = false;
let editId = "";
let commentsData = [];
var globalUser = null;

export const setupComments = (user) => {
  globalUser = user;
  // CREATE
  commentForm.addEventListener("submit", async (e) => {
    // Prevenir que la página se recargue
    e.preventDefault();

    // Obtener los datos del formulario
    const description = commentForm["description-comment"].value;

    // Crear una nuevo comentario
    try {
      const timeData = new Date().toLocaleString("es-PE", {
        timeZone: "America/Lima",
      });

      if (!editStatus) {
        //TODO: id de las publicaciones
        let postId = localStorage.getItem("idPost");

        // Crear comentario
        await createComments(
          description,
          user.displayName,
          user.photoURL,
          user.email,
          timeData,
          postId
        );
        // Mostrar mensaje de éxito
        showMessage("Comentario creado", "success");
        // Limpiar el formulario
      } else {
        // Actualizar tarea
        await updateComments(editId, { description, timeData });
        // Mostrar mensaje de éxito
        showMessage("Comentario actualizado", "success");

        // Cambiar el estado de edición
        editStatus = false;
        // Cambiar el id de edición
        editId = "";

        // Cambiamos lo que muestra el formulario
        commentForm["btn-agregar-comentario"].value = "Crear comentario";
      }
      // Limpiar el formulario
      commentForm.reset();
    } catch (error) {
      // Mostrar mensaje de error
      showMessage(error.code, "error");
    }
  });

  // READ
  onGetComments((querySnapshot) => {
    commentsData = [];

    querySnapshot.forEach((doc) => {
      commentsData.push(doc.data());

      let postId = localStorage.getItem("idPost");

      showComments(postId);
    });

    // UPDATE
    // Obtenemos los botones de editar
    const btnsEditar = document.querySelectorAll(".btn-editar");

    // Iteramos sobre cada botón
    btnsEditar.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        // Obtenemos el documento
        const doc = await getComments(dataset.id);
        // Obtenemos los datos
        const comment = doc.data();

        // LLenamos el formulario con los datos
        commentForm["description-comment"].value = comment.description;

        // Actualizamos el estado de edición y el id edición
        editStatus = true;
        editId = doc.id;
        // Cambiamos lo que muestra el formulario
        commentForm["btn-agregar-comentario"].value = "Guardar cambios";
      });
    });

    // DELETE
    // Obtenemos los botones eliminar
    const btnsEliminar = document.querySelectorAll(".btn-eliminar");

    // Iteramos sobre cada botón
    btnsEliminar.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteComments(dataset.id);
        showMessage("Comentario eliminado", "success");
      });
    });
  });
};

export function showComments(postId) {
  let commentsHtml = "";

  console.log(`Post id ${postId}`);

  commentsData.forEach((comment) => {
    console.log(`Post id ${postId} === ${comment.postId}`);

    if (comment.postId === postId) {
      commentsHtml += `
      <article class="comment-container border border-2 rounded-2 p-3 my-3 text-light">
        <header class="d-flex justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <img class="task-profile-picture rounded-circle" src="${
              comment.userImage ? comment.userImage : "./assets/img/perfil.png"
            }" alt="${comment.userName}" />
            <p class="m-0">${comment.userName}</p>
            <p class="m-0 gap-5">${comment.timeData}</p>
        </header>
        <hr />
        <p>${comment.description}</p>
      </article>
      `;
    }
  });

  commentsContainer.innerHTML = commentsHtml;
}
