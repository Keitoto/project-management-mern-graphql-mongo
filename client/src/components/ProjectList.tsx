import { useQuery } from '@apollo/client';

import { ProjectCard } from '@/components/ProjectCard';
import { Spinner } from '@/components/Spinner';
import { GET_PROJECT_LIST } from '@/graphql/queries/projectQueries';
import { ProjectType } from '@/types';

type QueryType = Pick<ProjectType, 'id' | 'name' | 'description' | 'status'>;

export const ProjectList = () => {
  const { data, error, loading } = useQuery<{ projects: QueryType[] }>(
    GET_PROJECT_LIST
  );

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;
  if (!data) return <p>No projects found</p>;
  if (!data.projects) return <p>No projects found</p>;
  // if (data.projects.length === 0) return <p>No projects found</p>;

  return (
    <div>
      {data.projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
