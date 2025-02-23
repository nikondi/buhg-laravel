import React from "react";
import usePopup from "@/Contexts/PopupContext";

export default function Close() {
  const {close} = usePopup();

  return <button
    className="popup__close-btn"
    onClick={close}
    aria-label="Закрыть"
  ></button>
}
