app.service('datastore', function($window) {
	//Save a document to a container. If the container does not exist, make a new one.
	//If an id is given, an attempt is made to replace the old existing document
	this.save = function(container, document, id) {
		if (!container || container == "") {
			throw new Error("Must have a valid container name to save to");
		}

		if (!document || document == "") {
			throw new Error("Must have a valid document to save");
		}

		if (!$window.localStorage[container]) {
			$window.localStorage[container] = [];
		}

		if (id) {
			if (!$window.localStorage[container][id]) {
				throw new Error("The id " + id + " does not exist in the container '" + container + "'");
			} else {
				$window.localStorage[container][id] = document;
				document.id = id;

				return document;
			}
		} else {
			$window.localStorage[container].push(document);
			document.id = $window.localStorage[container].length-1;

			return document;
		}
	};

	//Remove a single document from a given container
	this.removeDocument = function(container, id) {
		if (!container || container == "" || !$window.localStorage[container]) {
			throw new Error("Must have a valid container name to remove from");
		}

		if (!id || id == "" || !$window.localStorage[container][id]) {
			throw new Error("Must have a valid document id to remove");
		}

		$window.localStorage[container][id] = undefined;
	};

	//Remove an entire container
	this.removeContainer = function(container, document) {
		if (!container || container == "" || !$window.localStorage[container]) {
			throw new Error("Must have a valid container name to save to");
		}

		delete $window.localStorage[container];
	};

	//Fetch a single entity from a container
	this.get = function(container, id) {
		if (!container || container == "" || !$window.localStorage[container]) {
			throw new Error("Must have a valid container name to fetch from");
		}

		if (!id || id == "" || !$window.localStorage[container][id]) {
			throw new Error("Must have a valid document id to fetch");
		}

		return $window.localStorage[container][id];
	};	

	//Fetch all entities from a container
	this.getAll = function(container) {
		if (!container || container == "" || !$window.localStorage[container]) {
			throw new Error("Must have a valid container name to fetch from");
		}

		var result = [];

		for (var i = 0; i < $window.localStorage[container].length; i++) {
			if ($window.localStorage[container][i]) {
				var doc = $window.localStorage[container][i];
				doc.id = i;

				result.push(doc);
			}
		}

		return result;
	};

	//Find a specific entity from a container given a key and a value to match
	this.find = function(container, key, value) {
		if (!container || container == "" || !$window.localStorage[container]) {
			throw new Error("Must have a valid container name to fetch from");
		}

		var result = [];

		for (var i = 0; i < $window.localStorage[container].length; i++) {
			if ($window.localStorage[container][i]) {
				var doc = $window.localStorage[container][i];
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
});