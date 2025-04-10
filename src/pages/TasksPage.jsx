import Sidebar from '../components/Sidebar';
import Tasks from '../components/Tasks';
export function TasksPage() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  );
}
