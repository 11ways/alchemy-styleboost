var async     = alchemy.use('async'),
    path      = alchemy.use('path'),
    fs        = alchemy.use('fs'),

    // Where the original files are located
    source    = path.resolve(__dirname, 'source');

alchemy.addStylesheetDirectory(source);