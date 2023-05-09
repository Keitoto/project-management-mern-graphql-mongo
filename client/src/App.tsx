import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from '@/components/Header';
import HomePage from '@/pages/HomePage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
