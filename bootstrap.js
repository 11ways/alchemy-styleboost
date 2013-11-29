var async     = alchemy.use('async'),
    path      = alchemy.use('path'),
    fs        = alchemy.use('fs'),

    // Where the original files are located
    source    = path.resolve(__dirname, 'source'),

    // Where the files will be stored and allowed to be overwritten
    target    = path.resolve(PATH_TEMP, 'stylesheets'),

    // Another copy where they're meant to be kept as-is
    targetOri = path.resolve(PATH_TEMP, 'stylesheets', 'original');


// Before copying any other stylesheet files, put the originals first
alchemy.sputnik.beforeSerial('stylesheets', function(callback) {

	// Read in all the subdirectories in the source
	fs.readdir(source, function(err, files) {

		var tasks = {}, file, i;

		// If no files are present, call the callback immediately
		if (files.length === 0) {
			return callback();
		}

		for (i = 0; i < files.length; i++) {

			file = files[i];

			// IIFE
			(function(sourcepath, targetpath, targetorigin) {

				// Queue the function for async
				tasks[file] = function(async_callback) {

					// Copy the subdir
					alchemy.copyDir(sourcepath, targetpath, function(err) {
						async_callback();
					});

					// Also copy to the origin folder, where they're not meant
					// to be overwritten, but don't let anything wait for it
					alchemy.copyDir(sourcepath, targetorigin, function(err) {});

				};

			}(
				path.resolve(source, file), // Source
				path.resolve(target, file), // Target
				path.resolve(targetOri, file)) // Target original copy
			);
		}

		// Execute all the set tasks in parallel using async
		async.parallel(tasks, function(err, results) {
			callback();
		});
	});
});
