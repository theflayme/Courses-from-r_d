import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import TaskList from "./pages/TaskList";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/CreateTask",
        element: <CreateTask />,
      },
      {
        path: "/TaskList",
        element: <TaskList />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
