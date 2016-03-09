#Team3

####To Run

1. Run `git clone https://github.com/changity/team3.git`
2. Run `cd team3`
3. Install Node from [here](https://nodejs.org/en/)
4. Run `npm install -g cordova ionic`
5. Run `ionic serve -l`
6. Open up [localhost:8100](http://localhost:8100) to preview, test and debug

####To Use the Datastore
Make sure you include 'datastore' as a service in your controller. The datastore works by utilizing a system of containers and documents. To save data, you'll first need a container to do so. Create a new container by doing something like:

```javascript
datastore.addContainer('People', {
	username: datastore.types.String,
	firstName: datastore.types.String,
	lastName: datastore.types.String
});
```

Simply provide `addContainer` with a container name and a model. The model is simply an object with keys that specify what type of data will be stored in each. In the example above, every entry in the people container has a string username, a string first name and a string last name. You'll need to ensure that each document you save later has all of the keys provided above; if it does not, the document will be rejected.

Now that you've got a container, use the following to save, get and search the container.

#####Add a new container:
`addContainer(containerName, containerModel)`

#####Remove an existing container:
`removeContainer(containerName)`

#####Save a document:
`save(containerName, document, [documentId])`

#####Remove an existing document:
`removeDocument(containerName, documentId)`

#####Remove all documents in a given container:
`removeAllDocuments(containerName)`

#####Get a single document from a given container:
`get(containerName, documentId)`

#####Get all documents from a given container:
`getAll(containerName)`

#####Search a container for documents with the given key and matching value:
`find(containerName, key, value)`