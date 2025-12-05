import MemoItem from "../MemoItem/MemoItem";
import "./index.css";

export default function MemoList({
  memos,
  selectedMemoIndex,
  setSelectedMemoIndex,
  onMemoDeleteClick,
}) {
  return (
    <div>
      {memos.map((memo, index) => (
        <MemoItem
          key={index}
          onMemoItemClick={() => setSelectedMemoIndex(index)}
          isSelected={selectedMemoIndex === index}
          onMemoDeleteClick={() => onMemoDeleteClick(index)}
        >
          {memo.title}
        </MemoItem>
      ))}
    </div>
  );
}

