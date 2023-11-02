import { ChangeEvent } from "react";
import categories from "../categories";

interface TaskFilterProps {
  onSelectCategory: (category: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onSelectCategory }) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelectCategory(event.target.value);
  };

  return (
    <select onChange={handleSelectChange}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default TaskFilter;