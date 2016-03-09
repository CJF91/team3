app.service('datastore', function($window) {
	//Model Types
	this.types = {
		String: 'string',
		Number: 'number',
		Boolean: 'boolean',
		Date: 'object'
	}

	//Set an object in local storage
	function setObject(key, obj) {
		$window.localStorage[key] = JSON.stringify(obj);
	}

	//Fetch an object
	function getObject(key) {
		if ($window.localStorage[key]) {
			return JSON.parse($window.localStorage[key]);
		} else {
			return undefined;
		}
	}

	//Add a new container with the given model
	this.addContainer = function(name, model) {
		var models = getObject("models");

		if (!name || name == "") {
			throw new Error("Must have a valid model name to add a new container");
		}

		if (!model || typeof model != 'object') {
			throw new Error("Must have a valid model to add a new continer");
		}

		if (!models) {
			setObject("models", {});
			models = {};
		}

		models[name] = model;
		setObject("models", models);

		if (!getObject(name)) {
			setObject(name, []);
		}
	}

	//Remove an entire container
	this.removeContainer = function(container) {
		if (!container || container == "" || !$window.localStorage[container]) {
			throw new Error("Must have a valid container name to save to");
		}

		delete $window.localStorage[container];
	};

	//Save a document to a container. If the container does not exist, make a new one.
	//If an id is given, an attempt is made to replace the old existing document
	this.save = function(container, document, id) {
		var model = getObject("models")[container];

		if (!container || container == "" || !$window.localStorage[container]) {
			throw new Error("Must have a valid container to save to");
		}

		if (!document || document == "") {
			throw new Error("Must have a valid document to save");
		}

		if (!model) {
			throw new Error("Containers must have been modeled prior to saving in them");
		}

		var docKeys = Object.keys(document);
		var modKeys = Object.keys(model);
		var containerObjs = getObject(container);

		if (docKeys.length != modKeys.length) {
			throw new Error("Documents in container must have same keys as model for container");
		}

		for (var i = 0; i < docKeys.length; i++) {
			if (!model[docKeys[i]]) {
				throw new Error("Document has unknown key '" + docKeys[i] + "'");
			}

			if (typeof document[docKeys[i]] != model[docKeys[i]]) {
				throw new Error("Key mismatch, typeof '" + docKeys[i] + "' is not equal to type '" + model[docKeys[i]] + "'");
			}

			if (typeof document[docKeys[i]] == 'object' && model[docKeys[i]] == 'date' && !document[docKeys[i]].getDate) {
				throw new Error("Key mismatch, generic object is not the same as a date");
			}
		}

		if (id != undefined) {
			if (id >= containerObjs.length) {
				throw new Error("The id " + id + " does not exist in the container '" + container + "'");
			} else {
				containerObjs[id] = document;
				setObject(container, containerObjs);
				document.id = id;

				return document;
			}
		} else {
			containerObjs.push(document);
			setObject(container, containerObjs);
			document.id = containerObjs.length-1;

			return document;
		}
	};

	//Remove a single document from a given container
	this.removeDocument = function(container, id) {
		var containerObjs = getObject(container);

		if (!container || container == "" || !containerObjs) {
			throw new Error("Must have a valid container name to remove from");
		}

		if (id == undefined || !containerObjs[id]) {
			throw new Error("Must have a valid document id to remove");
		}

		var containerObjs = getObject(container);

		if (id < containerObjs.length) {
			containerObjs[id] = undefined;
			setObject(container, containerObjs);
			return true;
		} else {
			return false;
		}
	};

	//Remove all documents from a given container
	this.removeAllDocuments = function(container) {
		var containerObjs = getObject(container);

		if (!container || container == "" || !containerObjs) {
			throw new Error("Must have a valid container name to remove from");
		}

		if (id == undefined || !containerObjs[id]) {
			throw new Error("Must have a valid document id to remove");
		}

		setObject(container, []);
	};

	//Fetch a single entity from a container
	this.get = function(container, id) {
		var containerObjs = getObject(container);

		if (!container || container == "" || !containerObjs) {
			throw new Error("Must have a valid container name to fetch from");
		}

		if (id == undefined || id >= containerObjs.length) {
			throw new Error("Must have a valid document id to fetch");
		}

		if (containerObjs[id] != null) {
			return containerObjs[id];
		} else {
			return undefined;
		}
	};	

	//Fetch all entities from a container
	this.getAll = function(container) {
		var containerObjs = getObject(container);

		if (!container || container == "" || !containerObjs) {
			throw new Error("Must have a valid container name to fetch from");
		}

		var result = [];

		for (var i = 0; i < containerObjs.length; i++) {
			if (containerObjs[i]) {
				var doc = containerObjs[i];
				doc.id = i;

				result.push(doc);
			}
		}

		return result;
	};

	//Find a specific entity from a container given a key and a value to match
	this.find = function(container, key, value) {
		var containerObjs = getObject(container);

		if (!container || container == "" || !containerObjs) {
			throw new Error("Must have a valid container name to fetch from");
		}

		var result = [];

		for (var i = 0; i < containerObjs.length; i++) {
			if (containerObjs[i]) {
				var doc = containerObjs[i];
				var objKeys = Object.keys(doc);

				for (var j = 0; j < objKeys.length; j++) {
					if (objKeys[j] == key && doc[objKeys[j]] == value) {
						doc.id = i;
						result.push(doc);
					}
				}
			}
		}

		return result;
	};

	//Return the entire data store
	this.store = function() {
		var models = getObject("models");
		var modKeys = Object.keys(models);

		var result = {};

		for (var i = 0; i < modKeys.length; i++) {
			result[modKeys[i]] = this.getAll(modKeys[i]);
		}

		return result;
	};
});