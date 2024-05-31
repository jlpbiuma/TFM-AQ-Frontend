import React, { useState, useRef, useEffect } from "react";

const MultiSelectComboBox = ({
  items,
  selectedItems,
  setSelectedItems,
  idField,
  descriptionField,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(items);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const containerRef = useRef(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelectItem = (item) => {
    const selectedItem = items.find((i) => i[idField] === item);
    if (selectedItem && !selectedItems.includes(selectedItem[idField])) {
      setSelectedItems([...selectedItems, selectedItem[idField]]);
    }
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter((i) => i !== itemId));
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((highlightedIndex + 1) % filteredItems.length);
      scrollHighlightedItemIntoView();
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex(
        (highlightedIndex - 1 + filteredItems.length) % filteredItems.length
      );
      scrollHighlightedItemIntoView();
    } else if (event.key === "Enter") {
      handleSelectItem(filteredItems[highlightedIndex][idField]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const scrollHighlightedItemIntoView = () => {
    if (listRef.current && listRef.current.children[highlightedIndex]) {
      listRef.current.children[highlightedIndex].scrollIntoView({
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && listRef.current) {
      scrollHighlightedItemIntoView();
    }
  }, [highlightedIndex, isOpen]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  return (
    <div className="relative w-80" ref={containerRef}>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded">
        {selectedItems.map((itemId) => {
          const selectedItem = items.find((i) => i[idField] === itemId);
          return (
            <span
              key={itemId}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center"
            >
              {selectedItem[descriptionField]}
              <button
                className="ml-2 text-blue-500 hover:text-blue-700"
                onClick={() => handleRemoveItem(itemId)}
              >
                x
              </button>
            </span>
          );
        })}
      </div>
      <input
        ref={inputRef}
        type="text"
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Select items..."
        className="w-full px-2 py-1 mt-2 border border-gray-300 rounded focus:outline-none"
        value={selectedItems
          .map((itemId) => {
            const selectedItem = items.find((i) => i[idField] === itemId);
            return selectedItem[descriptionField];
          })
          .join(", ")}
        readOnly
      />
      {isOpen && (
        <ul
          className="absolute top-full left-0 w-full mt-1 border border-gray-300 rounded bg-white max-h-40 overflow-y-auto z-10"
          ref={listRef}
        >
          {filteredItems.map((item, index) => (
            <li
              key={item[idField]}
              className={`p-2 cursor-pointer ${
                index === highlightedIndex ? "bg-gray-300" : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelectItem(item[idField])}
            >
              {item[descriptionField]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectComboBox;
