import usePopup from "@/Contexts/PopupContext";

export default function Background() {
  const {close} = usePopup();
  return <div className="popup__background" onClick={close}/>
}
