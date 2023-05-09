import { useMutation } from '@apollo/client';
import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';

import { DELETE_CLIENT } from '@/graphql/mutations/clientMutations';
import { GET_CLIENT_LIST } from '@/graphql/queries/clientQueries';
import { GET_PROJECT_LIST } from '@/graphql/queries/projectQueries';
import { ClientType } from '@/types';

interface Props {
  client: ClientType;
}

const ClientRow: FC<Props> = ({ client: { id, name, email, phone } }) => {
  const [deleteClientMutation] = useMutation(DELETE_CLIENT, {
    variables: { id },
    refetchQueries: [{ query: GET_CLIENT_LIST }, { query: GET_PROJECT_LIST }],
    // update(cache, { data: { deleteClient } }) {
    //   const data = cache.readQuery<{ clients: ClientType[] }>({
    //     query: GET_CLIENT_LIST,
    //   });
    //   if (!data) return;
    //   const { clients } = data;
    //   cache.writeQuery({
    //     query: GET_CLIENT_LIST,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          type="button"
          onClick={() => deleteClientMutation()}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
