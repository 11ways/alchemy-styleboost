var libpath   = alchemy.use('path'),
    // Where the original files are located
    source    = libpath.resolve(__dirname, 'source');

alchemy.addStylesheetDirectory(source);