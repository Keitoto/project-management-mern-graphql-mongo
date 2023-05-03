const { ClientModel, ProjectModel } = require('../models');

const { ClientType, ProjectType } = require('./types');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { name, email, phone }) {
        // create client using mongoose model
        const client = new ClientModel({
          name,
          email,
          phone,
        });
        // save it with mongoose save function
        return client.save();
      },
    },

    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, { id }) {
        return ClientModel.findByIdAndDelete(id);
      },
    },

    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        clientId: { type: GraphQLNonNull(GraphQLID) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
      },
      resolve(parent, { name, description, clientId, status }) {
        const project = new ProjectModel({
          name,
          description,
          status,
          clientId,
        });
        return project.save();
      },
    },

    // Delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, { id }) {
        return ProjectModel.findByIdAndDelete(id);
      },
    },

    // Update a project
    updateProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLID },
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, { id, name, description, status }) {
        return ProjectModel.findByIdAndUpdate(
          id,
          {
            $set: {
              name: name,
              description: description,
              status: status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = mutation;
