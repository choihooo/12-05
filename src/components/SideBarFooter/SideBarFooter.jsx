import "./index.css";

export default function SideBarFooter({ onAddMemo }) {
  return (
    <div className="SideBarFooter">
      <button className="SideBarFooter__add-button" onClick={onAddMemo}>
        +
      </button>
    </div>
  );
}

