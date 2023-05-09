import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

import { ADD_CLIENT } from '@/graphql/mutations/clientMutations';
import { GET_CLIENT_LIST } from '@/graphql/queries/clientQueries';
import { ClientType } from '@/types';

const AddClientModal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClientMutation] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const data = cache.readQuery<{ clients: ClientType[] }>({
        query: GET_CLIENT_LIST,
      });
      if (!data) return;
      const { clients } = data;
      cache.writeQuery({
        query: GET_CLIENT_LIST,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '' || email === '' || phone === '') {
      return;
    }

    addClientMutation({ variables: { name, email, phone } });

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
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
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
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

export default AddClientModal;
