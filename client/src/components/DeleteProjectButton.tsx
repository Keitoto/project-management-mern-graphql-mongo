import { useMutation } from '@apollo/client';
import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { DELETE_PROJECT } from '@/graphql/mutations/projectMutations';
import { GET_PROJECT_LIST } from '@/graphql/queries/projectQueries';
import { ProjectType } from '@/types';

interface Props {
  projectId: ProjectType['id'];
}

export const DeleteProjectButton: FC<Props> = ({ projectId }) => {
  // Prepare deleteProject mutation
  const [deleteProjectMutation] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    update(cache, { data: { deleteProject } }) {
      const data = cache.readQuery<{ projects: ProjectType[] }>({
        query: GET_PROJECT_LIST,
      });
      if (!data) return;
      const { projects } = data;
      cache.writeQuery({
        query: GET_PROJECT_LIST,
        data: {
          projects: [...projects, deleteProject],
        },
      });
    },
  });

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteProjectMutation({ variables: { id: projectId } });
    navigate('/');
  };

  return (
    <div className="d-flex mt-5 ms-auto">
      <button
        type="button"
        className="btn btn-danger m-2"
        onClick={handleDelete}
      >
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};
