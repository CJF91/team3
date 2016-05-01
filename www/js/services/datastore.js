app.service('datastore', function($window) {
	//Key for aes
	var enc_key;

	//Model Types
	this.types = {
		String: 'string',
		Number: 'number',
		Boolean: 'boolean',
		Date: 'object',
		Array: 'object',
		Any: 'any'
	}

	//Set an object in local storage
	function setObject(key, obj) {
		if (enc_key) {
			$window.localStorage[key] = encrypt(JSON.stringify(obj), enc_key);
		} else {
			$window.localStorage[key] = JSON.stringify(obj);
		}
	}

	//Fetch an object
	function getObject(key) {
		if ($window.localStorage[key]) {
			if (enc_key) {
				return JSON.parse(decrypt($window.localStorage[key], enc_key));
			} else {
				return JSON.parse($window.localStorage[key]);
			}
		} else {
			return undefined;
		}
	}

	//Pad out a key to make it 256 bits
	function pad256(key) {
		for (var i = 0; key.length < 32; i++) {
			key += "0";
		}

		return key;
	}

	//Cut a 512 bits key to 256 bits
	function cut256(key) {
		return key.substring(0,32);
	}

	//Encrypt a string given a key
	function encrypt(data, key) {
		var dataBytes = aesjs.util.convertStringToBytes(data);
		var _key = aesjs.util.convertStringToBytes(key);

		var aesCtr = new aesjs.ModeOfOperation.ctr(_key, new aesjs.Counter(5));
		var encryptedBytes = aesCtr.encrypt(dataBytes);

		return btos(encryptedBytes);
	}

	//Decrypt a string with the given key
	function decrypt(data, key) {
		var _key = aesjs.util.convertStringToBytes(key);
		var dataBytes = stob(data);

		var aesCtr = new aesjs.ModeOfOperation.ctr(_key, new aesjs.Counter(5));
		var decryptedBytes = aesCtr.decrypt(dataBytes);

		return aesjs.util.convertBytesToString(decryptedBytes);
	}

	//Bytes to string
	function btos(bytes) {
		return btoa(JSON.stringify(bytes));
	}

	//String to bytes
	function stob(str) {
		return JSON.parse(atob(str));
	}

	//Initalize the datastore with the sepcified access key
	this.initalizeAccess = function(givenKey) {
		if (givenKey && givenKey != "") {
			givenKey = pad256(givenKey);

			var phase1 = cut256(sha256(givenKey));
			var phase2 = sha256(phase1);

			var foundKey = $window.localStorage['accessKey'];

			if (foundKey && phase2 == foundKey) {
				enc_key = phase1;
				return true;
			} else {
				return false;
			}
		}
	}

	//Set the new access key
	this.setAccessKey = function(newKey) {
		if (newKey && newKey != "") {
			newKey = pad256(newKey);

			var phase1 = cut256(sha256(newKey));
			$window.localStorage['accessKey'] = sha256(phase1);

			var dsKeys = Object.keys($window.localStorage);
			var prevKey = dsKeys.length > 1 ? enc_key.slice(0) : undefined;

			for (var i = 0; i < dsKeys.length; i++) {
				if (dsKeys[i] != 'accessKey') {
					enc_key = prevKey;
					var data = getObject(dsKeys[i]);

					enc_key = phase1;
					setObject(dsKeys[i], data);
				}
			}
		}

		return this.initalizeAccess(newKey);
	}

	this.isEncrypted = function() {
		return $window.localStorage['accessKey'] ? true : false;
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
			return true;
		}

		return false;
	}

	//Remove an entire container
	this.removeContainer = function(container) {
		if (!container || container == "" || !$window.localStorage[container]) {
			throw new Error("Must have a valid container name to save to");
		}

		delete $window.localStorage[container];
		return true;
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

			if (typeof document[docKeys[i]] != model[docKeys[i]] && model[docKeys[i]] != 'any') {
				throw new Error("Key mismatch, typeof '" + docKeys[i] + "' is not equal to type '" + model[docKeys[i]] + "'");
			}

			if (typeof document[docKeys[i]] == 'object' && model[docKeys[i]] == 'date' && !document[docKeys[i]].getDate) {
				throw new Error("Key mismatch, generic object is not the same as a date!");
			}
		}

		if (id != undefined) {
			if (id >= containerObjs.length) {
				console.warn("The id " + id + " does not exist in the container '" + container + "'. Hopefully you had a good reason for this. I'm going to add it with a new id anyways.");
				
				this.save(container, document);
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

	//Updates a document with the matching key or inserts if we couldn't find an ID
	this.upsert = function(container, document, key) {
		if (!container || container == "") {
			throw new Error("Must have a valid container name to update in");
		}

		if (document[key] == undefined) {
			throw new Error("Key must be defined in given document");
		}

		var matching = this.find(container, key, document[key]);

		if (matching.length == 0) {
			this.save(container, document);
		} else {
			this.save(container, document, matching[0].id);
		}
		
	}

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
		return true;
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

	//Find and return the first matching instance
	this.findOne = function(container, key, value) {
		var res = this.find(container, key, value);

		if (res.length > 0) {
			return this.find(container, key, value)[0];
		} else {
			return undefined;
		}
	}

	//Return the entire data store
	this.store = function() {
		var models = getObject("models");
		if(models == undefined){
			return undefined;
		} else {
			var modKeys = Object.keys(models);
			var result = {};

			for (var i = 0; i < modKeys.length; i++) {
				result[modKeys[i]] = this.getAll(modKeys[i]);
			}

			return result;
		}
	};

	//Return all models
	this.models = function() {
		return getObject("models");
	}
});