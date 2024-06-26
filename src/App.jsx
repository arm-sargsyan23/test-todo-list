import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isActiveButton, setIsActiveButton] = useState(false);

  return (
    <div className="w-screen min-h-screen flex justify-center items-start mt-[50px]">
      <div className="w-[500px] min-h-[450px] bg-gray-300 rounded-[1rem] p-5 flex flex-col gap-8">
        <form className="w-full grid gap-3">
          <input
            className="outline-none rounded-[0.8rem] w-full h-[20px] px-4 py-6 text-lg"
            type="text"
            placeholder="Enter todo name"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          {isActiveButton ? (
            <p className="text-red-500">Please enter more than 3 words</p>
          ) : null}
          <button
            className="w-full h-[20px] px-4 py-6 rounded-[0.8rem] bg-green-500 grid content-center text-white"
            onClick={(e) => {
              if (inputValue.length >= 3) {
                e.preventDefault();
                setTodos([
                  ...todos,
                  {
                    title: inputValue,
                    id: todos.length + 1,
                    isAdded: false,
                  },
                ]);
                setInputValue("");
                setIsActiveButton(false);
              } else {
                e.preventDefault();
                setIsActiveButton(true);
              }
            }}
          >
            <p className="hover:scale-110 transition-all duration-300 ease-in-out">
              Add todo
            </p>
          </button>
        </form>
        <hr />
        <div className="w-full min-h-max grid gap-3">
          {todos?.map(({ title, id, isAdded }) => (
            <div
              key={id}
              className="w-full h-[50px] bg-green-500 text-white text-lg rounded-[0.8rem] p-4 flex items-center justify-between"
            >
              <div className="flex gap-3 items-center">
                <h3>{id}.</h3>
                <h3>{title}</h3>
              </div>
              <div className="flex gap-2">
                <div
                  onClick={() => {
                    setTodos([
                      ...todos?.map((todo) =>
                        todo.id === id ? { ...todo, isAdded: !isAdded } : todo
                      ),
                    ]);
                  }}
                  className="w-[90px] h-full bg-white text-black rounded-[0.8rem] grid place-items-center p-2 hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer"
                >
                  {isAdded ? "Added" : "No added"}
                </div>
                <div
                  onClick={() => {
                    setTodos([
                      ...todos.filter((todo) => id !== todo.id && todo),
                    ]);
                  }}
                  className="w-[90px] h-full bg-red-500 rounded-[0.8rem] grid place-items-center p-2 hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer"
                >
                  Delete
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
