import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FaList } from 'react-icons/fa';

import { ADD_PROJECT } from '@/graphql/mutations/projectMutations';
import { GET_CLIENT_LIST } from '@/graphql/queries/clientQueries';
import { GET_PROJECT_LIST } from '@/graphql/queries/projectQueries';
import { ClientType } from '@/types';

const AddProjectModal = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  // get clients for select
  const {
    data: clientList,
    error,
    loading,
  } = useQuery<{ clients: ClientType[] }>(GET_CLIENT_LIST);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    refetchQueries: [{ query: GET_PROJECT_LIST }],
    // update(cache, { data: { newProject } }) {
    //   const data = cache.readQuery<{ projects: ProjectType[] }>({
    //     query: GET_PROJECT_LIST,
    //   });
    //   if (!data) return;
    //   const { projects } = data;
    //   cache.writeQuery({
    //     query: GET_PROJECT_LIST,
    //     data: {
    //       projects: [...projects, newProject],
    //     },
    //   });
    // },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '' || description === '' || clientId === '' || status === '') {
      return;
    }

    addProject({ variables: { name, description, clientId, status } });

    setName('');
    setDescription('');
    setClientId('');
    setStatus('new');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        <div className="d-flex align-items-center">
          <FaList className="icon" />
          <div>Add Project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                Add Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
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

                <div className="mb-3">
                  <label className="form-label" htmlFor="clientId">
                    Client
                  </label>
                  <select
                    id="clientId"
                    className="form-select"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  >
                    <option value="">Select Client</option>
                    {clientList?.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectModal;
