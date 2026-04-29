import Swal from "sweetalert2";

export const alert = ({
  title = "",
  text = "",
  icon = "info",
  confirmButtonText = "OK"
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    backdrop: false
  });
};

export const confirm = ({
  title = "¿Estás seguro?",
  text = "Esta acción no se puede revertir",
  confirmButtonText = "Sí",
  cancelButtonText = "Cancelar",
  icon = "warning"
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    focusCancel: true,
    confirmButtonColor: "#d33",
    backdrop: false
  });
};