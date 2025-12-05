import MemoList from "../MemoList/MemoList";
import SideBarFooter from "../SideBarFooter/SideBarFooter";
import SideBarHeader from "../SideBarHeader/SideBarHeader";
import "./index.css";

export default function SideBar({
  memos,
  selectedMemoIndex,
  setSelectedMemoIndex,
  onAddMemo,
  onMemoDeleteClick,
  onToggle,
  isOpen,
}) {
  return (
    <div className={`SideBar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-resize-handle"></div>
      {isOpen ? (
        <>
          <SideBarHeader onToggle={onToggle} isOpen={isOpen} />
          <MemoList
            memos={memos}
            selectedMemoIndex={selectedMemoIndex}
            setSelectedMemoIndex={setSelectedMemoIndex}
            onMemoDeleteClick={onMemoDeleteClick}
          />
          <SideBarFooter onAddMemo={onAddMemo} />
        </>
      ) : (
        <button className="sidebar-toggle-collapsed" onClick={onToggle}>
          &gt;&gt;
        </button>
      )}
    </div>
  );
}
