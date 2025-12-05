// MemoContainer.jsx
import "./index.css";

export default function MemoContainer({ memo, onMemoChange }) {
  // memo가 undefined일때의 조건부 렌더링을 해줍니다.
  if (!memo) {
    return (
      <div className="MemoContainer__empty">
        <h1>메모가 없습니다.</h1>
        <h2>새로운 메모를 추가해주세요.</h2>
      </div>
    );
  }

  return (
    <div className="MemoContainer">
      <div>
        <input
          type="text"
          className="MemoContainer__title"
          value={memo.title}
          onChange={(e) => {
            onMemoChange({
              ...memo,
              title: e.target.value,
              updateAt: new Date().getTime(),
            });
          }}
        />
      </div>
      <div>
        <textarea
          className="MemoContainer__content"
          value={memo.content}
          onChange={(e) => {
            onMemoChange({
              ...memo,
              content: e.target.value,
              updateAt: new Date().getTime(),
            });
          }}
        />
      </div>
    </div>
  );
}

