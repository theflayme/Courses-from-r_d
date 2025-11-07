import { createBrowserRouter } from "react-router-dom";

import {
    Home,
    TaskList,
    CreateTask,
    TaskDetails,
    NotFound,
} from "./features/tasks/pages/Page";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'tasks',
                element: <TaskList />,
            },
            {
                path: 'tasks/:id',
                element: <TaskDetails />,
            },
            {
                path: 'tasks/create',
                element: <CreateTask />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;