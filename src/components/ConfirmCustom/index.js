import { faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const confirmCustom = (title, message, onYes, onNo) => {
    confirmAlert({
        title: title,
        message: message,

        buttons: [
            {
                label: "Yes",
                onClick: () => onYes(),
            },
            {
                label: "No",
                onClick: () => {
                    if (onNo) onNo();
                    else return;
                },
            },
        ],
    });
};

export { confirmCustom };
