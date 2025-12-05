import "./index.css";

export default function SideBarHeader({ onToggle, isOpen }) {
  return (
    <div className="SideBarHeader">
      <span>SideBarHeader</span>
      <button className="sidebar-toggle-btn" onClick={onToggle}>
        &lt;&lt;
      </button>
    </div>
  );
}
