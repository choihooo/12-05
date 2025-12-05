import MemoContainer from "./components/MemoContainer/MemoContainer";
import SideBar from "./components/SideBar/SideBar";
import "./App.css";
import { useState, useCallback } from "react";
import { localStorageSetItem } from "./lib/storage";

export default function App() {
  const [memos, setMemos] = useState(
    JSON.parse(localStorage.getItem("memos")) || []
  );
  const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);
  const [isSideBarOpen, setIsSideBarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // useCallback 모든 상태가 다 들어가면 오히려 독임
  const handleMemoChange = useCallback(
    (newMemo) => {
      setMemos((prevMemos) => {
        const newMemos = [...prevMemos];
        newMemos[selectedMemoIndex] = newMemo;

        localStorageSetItem("memos", newMemos);

        return newMemos;
      });

      // const newMemos = [...memos];
      // newMemos[selectedMemoIndex] = newMemo;
      // setMemos(newMemos);

      // localStorageSetItem("memos", newMemos);
    },
    [selectedMemoIndex]
  );

  const handleAddMemo = useCallback(() => {
    const now = new Date().getTime();
    const newMemo = {
      title: "Untitled",
      content: "",
      createAt: now,
      updateAt: now,
    };
    setMemos([...memos, newMemo]);
    // 여기서 memos state가 업데이트하기 전이니 memos.length를 사용하는거죠
    setSelectedMemoIndex(memos.length);

    localStorageSetItem("memos", [...memos, newMemo]);
  }, [memos]);

  const handleDeleteMemo = useCallback(
    (deleteMemoIndex) => {
      setMemos((prevMemos) => {
        const newMemos = [...prevMemos];
        newMemos.splice(deleteMemoIndex, 1);
        localStorageSetItem("memos", newMemos);
        return newMemos;
      });

      // 삭제한 메모가 현재 선택된 메모라면, 선택된 메모 인덱스를 0으로 설정
      if (deleteMemoIndex === selectedMemoIndex) {
        setSelectedMemoIndex(0);
      } else if (deleteMemoIndex < selectedMemoIndex) {
        // 삭제한 메모가 현재 선택된 메모보다 앞에 있다면, 선택된 메모 인덱스를 1 감소
        setSelectedMemoIndex(selectedMemoIndex - 1);
      }

      // const newMemo = memos.filter((memo, index) => index !== deleteMemoIndex);
      // setMemos(newMemo);

      // localStorageSetItem("memos", newMemo);
      // // 삭제한 메모가 현재 선택된 메모라면, 선택된 메모 인덱스를 0으로 설정
      // if (deleteMemoIndex === selectedMemoIndex) {
      //   setSelectedMemoIndex(0);
      // } else if (deleteMemoIndex < selectedMemoIndex) {
      //   // 삭제한 메모가 현재 선택된 메모보다 앞에 있다면, 선택된 메모 인덱스를 1 감소
      //   setSelectedMemoIndex(selectedMemoIndex - 1);
      // }
    },
    [selectedMemoIndex]
  );

  const toggleSideBar = () => {
    setIsSideBarOpen((prev) => {
      const newValue = !prev;
      localStorageSetItem("sidebarOpen", newValue);
      return newValue;
    });
  };

  return (
    <div className="App">
      <SideBar
        memos={memos}
        selectedMemoIndex={selectedMemoIndex}
        setSelectedMemoIndex={setSelectedMemoIndex}
        onAddMemo={handleAddMemo}
        onMemoDeleteClick={handleDeleteMemo}
        onToggle={toggleSideBar}
        isOpen={isSideBarOpen}
      />
      <MemoContainer
        memo={memos[selectedMemoIndex]}
        onMemoChange={handleMemoChange}
      />
    </div>
  );
}
