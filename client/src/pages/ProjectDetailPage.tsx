import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

import { ClientInfo } from '@/components/ClientInfo';
import { DeleteProjectButton } from '@/components/DeleteProjectButton';
import { EditProjectForm } from '@/components/EditProjectForm';
import { Spinner } from '@/components/Spinner';
import { GET_PROJECT_DETAIL } from '@/graphql/queries/projectQueries';
import { ProjectType } from '@/types';

// type QueryType = Pick<ProjectType, 'name' | 'description' | 'status'>;

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<{ project: ProjectType }>(
    GET_PROJECT_DETAIL,
    {
      variables: { id },
    }
  );

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;
  if (!data) return <p>There is no details</p>;

  return (
    <div>
      <div className="mx-auto w-75 card p-5">
        <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
          Back
        </Link>

        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>

        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{data.project.status}</p>

        {data.project.client && <ClientInfo client={data.project.client} />}

        <EditProjectForm project={data.project} />

        <DeleteProjectButton projectId={data.project.id} />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
