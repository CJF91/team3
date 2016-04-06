#Team3

####To Run

1. Run `git clone https://github.com/changity/team3.git`
2. Run `cd team3`
3. Install Node from [here](https://nodejs.org/en/)
4. Run `npm install -g cordova ionic bower gulp`
5. Run `npm install`
6. Run `bower install`
7. Run `ionic serve -l`
8. Open up [localhost:8100](http://localhost:8100) to preview, test and debug

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

#####Model field types:
```
types.String
types.Number
types.Boolean
types.Date
```

#####Initalize Access to the Datastore:
initalizeAccess(accessKey)

Returns `true` if the given access key was valid and is able to decrypt data. Returns `false` otherwise.

#####Update/Change the acccess key
setAccessKey(newAccessKey)

Sets a new access key and updates all existing containers with said key.

#####Add a new container:
`addContainer(containerName, containerModel)`

Returns `true` if the container was created. Returns `false` if the container already existed.

#####Remove an existing container:
`removeContainer(containerName)`

Returns `true` if the container was able to be removed.

#####Save a document:
`save(containerName, document, [documentId])`

Returns the saved document containing its new id in the `id` field.

#####Upsert a document:
`upsert(containerName, document, matchKey)`

Returns the saved document containing its new (or old) id in the `id` field. An upsert will either update the document if a matching one exists or will insert a new one. The `matchKey` matched against documents until one is found to have the specified value in the given `document`.

#####Remove an existing document:
`removeDocument(containerName, documentId)`

Returns `true` if the document was removed. Returns `false` if document could not be removed. 

#####Remove all documents in a given container:
`removeAllDocuments(containerName)`

Returns `true` if all documents could be removed.

#####Get a single document from a given container:
`get(containerName, documentId)`

Returns the document if it could be found. Returns `undefined` if the document could nto be found.

#####Get all documents from a given container:
`getAll(containerName)`

Returns an array of all documents in the given container.

#####Search a container for documents with the given key and matching value:
`find(containerName, key, value)`

Returns an array of all documents matching the filter (a key with with a given value).

#####Search a container for documents with the given key and matching value and return the first
`findOne(containerName, key, value)`

Returns a single document, the first of all documents matching the filter (a key with with a given value).

#####Return the entire data store
`store()`

Returns an object representing the entire datastore. Each key represents a container, and each key maps to an array of documents found in said container.

#####Return all datastore models
`models()`

Returns an object with model names as keys and models as their values.