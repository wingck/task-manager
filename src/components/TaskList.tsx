import Task from "../task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return <p>You have 0 task</p>;
  }
  return (
    <div>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <div>Title</div>
            <div>{task.title}</div>
            <div>Due Date</div>
            <div>{new Date(task.dueDate).toLocaleDateString()}</div>
            <div>Category</div>
            <div>{task.category}</div>
            <div>Actions</div>
            <div>
              <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;