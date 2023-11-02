import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import categories from "../categories";

const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Title should be at least 3 characters")
    .max(50, "Title should be at most 50 characters"),
  dueDate: z.coerce.date(),
  category: z.enum(categories),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div>
        <label>Title</label>
        <input {...register("title")} />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <div>
        <label>Due Date</label>
        <input type="date" {...register("dueDate")} />
        {errors.dueDate && <span>{errors.dueDate.message}</span>}
      </div>

      <div>
        <label>Category</label>
        <select {...register("category")}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <span>{errors.category.message}</span>}
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;