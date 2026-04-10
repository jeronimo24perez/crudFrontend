import M from "materialize-css";

export const Alert = (message, classes = "") => {
    M.toast({
        html: message,
        classes, // estilos opcionales
        displayLength: 3000
    });
};

export default Alert