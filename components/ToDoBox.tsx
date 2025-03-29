import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ToDoBoxProps {
  title: string;
  initialItems?: string[];
}

const ToDoBox: React.FC<ToDoBoxProps> = ({ title, initialItems = [] }) => {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const toggleItem = (index: number) => {
    const newItems = [...items];
    newItems[index] = newItems[index].startsWith("[✓] ")
      ? newItems[index].replace("[✓] ", "")
      : `[✓] ${newItems[index]}`;
    setItems(newItems);
  };

  return (
    <div
      className="bg-[#3A3A3A] text-white p-3 rounded-xl shadow-md mb-4"
      style={{ width: "350px", minWidth: "350px", maxWidth: "350px" }} // Fixed width
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-[#8664A0]">{title}</h3>
        <button
          onClick={addItem}
          className="bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-500"
        >
          +
        </button>
      </div>

      {/* Scrollable To-Do List */}
      <div className="max-h-40 overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg mb-1"
          >
            <input
              type="checkbox"
              onChange={() => toggleItem(index)}
              className="cursor-pointer"
            />
            <span className={cn("text-sm", { "line-through": item.startsWith("[✓] ") })}>
              {item.replace("[✓] ", "")}
            </span>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="w-full px-2 py-1 rounded-md bg-gray-800 text-white outline-none"
          placeholder="Add a task..."
        />
        <button
          onClick={addItem}
          className="bg-[#8664A0] text-white px-2 py-1 rounded-md hover:bg-purple-400"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ToDoBox;
