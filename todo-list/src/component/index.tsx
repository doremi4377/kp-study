import { useState } from "react";

function List() {
  // input value 입력값 상태관리
  const [inputValue, setInputValue] = useState("");
  // 입력된 값을 담을 리스트 상태관리
  const [list, setList] = useState<{ label: string }[]>([]);
  // 수정버튼을 눌렀을때 수정모드로 변경돠는 상태관리
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // 수정입력 후 완료버튼을 눌렀을때 값 업데이트 해주는 상태관리

  // 입력값 업데이트
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log("value", e.target.value);
  };

  // 추가 버튼을 눌렀을때 리스트에 담기
  const handleOnAddItem = () => {
    // 기존 리스트(list)에 새로운 항목을 추가하기 위해 spread 연산자(...list)를 사용
    // inputValue을 prop label 안에 넣기 위해 새로운 객체 만듬 { label: inputValue }
    const updatedList = [...list, { label: inputValue }];
    // 리스트에 값을 업데이트 해줌
    setList(updatedList);

    setInputValue("");
  };

  // 삭제 버튼 눌렀을시에 아이템 삭제
  const handleOnRemove = (index: number) => {
    // _label , 현재는    i 값으로 비교했기때문에 label 요소를 사용하지 않아 타입 경고 떠서 _ 이거 붙여서 처리
    // 삭제 버튼을 클릭한 현재 index 와 list의 i(index) 를 비교, index 값이 같으면 제거(false !=)하고 새로운 배열 생성
    const updatedList = list.filter((_label, i) => {
      console.log("i", i);
      console.log("index", index);
      return i !== index;
    });
    setList(updatedList);
  };

  // 수정버튼을 눌렀을때 UI가 변하는 로직
  const handleOnEdit = (index: number) => {
    // index 비교 값이 같으면 수정하는 UI 보여줌
    setEditIndex(index);
    // 현재의(수정하기전의) 입력값을 input에 담아서 보여줌 inputValue
    // list의 index의 레이블로 접근하여 값을 다시 업데이트 해줌
    setInputValue(list[index].label);

    // TODO fix: 입력을하는데 상위 인풋에도 값이 똑같이 찍힘
  };

  // 수정값을 입력후에 완료가 되는 로직
  const handleOnUpdate = () => {
    // TODO fix:기존 수정하기 전에 리스트도 같이 나오고 있음.. 새로운 배열을 생성해
    // const updatedList = [...list, { label: inputValue }];

    // TODO fix: 새로운 배열을 생성해서 전에 리스트는 나오지 않지만, 리스트 전체가 내가 수정한 값이 다 똑같이 업데이 됌
    // const updatedList = list.map(() => {
    //   return { label: inputValue };
    // });

    const updatedList = list.map((item, i) => {
      return i === editIndex ? { label: inputValue } : item;
    });

    // 수정된값 업데이트
    setList(updatedList);
    // input 초기화
    setInputValue("");

    // 다시 수정모드전으로 UI 변경
    setEditIndex(null);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleOnChange} />
      <button type="button" onClick={handleOnAddItem}>
        추가
      </button>

      <ul>
        {list?.map(({ label }, index) => {
          return (
            <li key={`item-${index}`}>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleOnChange}
                  />
                  <button type="button" onClick={handleOnUpdate}>
                    수정완료
                  </button>
                </>
              ) : (
                <>
                  <strong>{label}</strong>
                  <button type="button" onClick={() => handleOnEdit(index)}>
                    수정
                  </button>
                  <button type="button" onClick={() => handleOnRemove(index)}>
                    삭제
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default List;
