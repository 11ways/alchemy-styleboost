# Styleboost Plugin
* Author:  Jelle De Loecker (jelle@codedor.be)
* http://www.codedor.be
* license: MIT
* version: 0.0.1

The Styleboost plugin provides your Alchemy application and plugins access
to the popular front-end framework "for faster and easier web development".

# Usage
You can use Bootstrap in your own Less files by importing it like you normally
would, for example:

```less
@import 'bootstrap/bootstrap';
```

The bootstrap files can be overloaded in your base app or plugin folder by
simply creating an `assets/stylesheets/bootstrap/filetooverload.less` file.

This overloading won't necesarily affect plugins, as they're encouraged to
use the **original**, un-overloadable files using the following import:

```less
@import 'original/bootstrap/bootstrap';
```

This does not mean you can't overload plugin styles, it means you'll have to
overload the plugin's less files themselves.
