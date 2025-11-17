import KanbanBoard from '@/layouts/KanbanBoard';
import TaskList from '@/layouts/TaskList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const IndexPage = () => {
  return (
    <>
      <Tabs defaultValue='list' className='w-full'>
        <TabsList>
          <TabsTrigger value='list'>Task List</TabsTrigger>
          <TabsTrigger value='kanban'>Kanban Board</TabsTrigger>
        </TabsList>
        <TabsContent value='list'>
          <TaskList />
        </TabsContent>
        <TabsContent value='kanban'>
          <KanbanBoard />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default IndexPage;
