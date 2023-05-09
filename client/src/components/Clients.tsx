import { useQuery } from '@apollo/client';

import ClientRow from '@/components/ClientRow';
import { Spinner } from '@/components/Spinner';
import { GET_CLIENT_LIST } from '@/graphql/queries/clientQueries';
import { ClientType } from '@/types';

const Clients = () => {
  const { data, error, loading } = useQuery<{ clients: ClientType[] }>(
    GET_CLIENT_LIST
  );

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;
  if (!data) return <p>There is no clients</p>;
  
  return (
    <table className="table table-hover mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.clients.map((client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </tbody>
    </table>
  );
};

export default Clients;
