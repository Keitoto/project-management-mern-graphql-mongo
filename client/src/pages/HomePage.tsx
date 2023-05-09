import AddClientModal from '@/components/AddClientModal';
import AddProjectModal from '@/components/AddProjectModal';
import Clients from '@/components/Clients';
import { ProjectList } from '@/components/ProjectList';

const HomePage = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <ProjectList />
      <hr />
      <Clients />
    </>
  );
};

export default HomePage;
