import { useMutation } from '@apollo/client';
import { FC, useState } from 'react';

import { UPDATE_PROJECT } from '@/graphql/mutations/projectMutations';
import { GET_PROJECT_DETAIL } from '@/graphql/queries/projectQueries';
import { ProjectType } from '@/types';

export const EditProjectForm: FC<{ project: ProjectType }> = ({ project }) => {
  console.log(project.description)
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case 'Not Started':
        return 'new';
      case 'In Progress':
        return 'progress';
      case 'Completed':
        return 'completed';
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });

  // Prepare editProject mutation
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name,
      description,
      status,
    },
    refetchQueries: [
      { query: GET_PROJECT_DETAIL, variables: { id: project.id } },
    ],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !description || !status) return;

    updateProject({ variables: { id: project.id, name, description, status } });
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
