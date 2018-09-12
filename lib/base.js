const path = require('path');

const Funnel = require('broccoli-funnel');

module.exports = class Styles {
  constructor(options) {
    this.isAddon = options.isAddon;
    this.registry = options.registry;
  }

  get extensions() {
    if (!this._extensions) {
      this._extensions = this.registry.extensionsForType('css');
    }

    return this._extensions;
  }

  collocatedStylesFrom(inputPath) {
    return new Funnel(inputPath, {
      include: [`**/*.{${this.extensions},}`],
      exclude: [`styles/**/*`],
      allowEmpty: true,
      annotation: 'Funnel (ember-cli-styles: grab collocated styles)',
    });
  }

  projectNode(app) {
    const pathParts = [];

    if (this.isAddon) {
      pathParts.push(app.root, app.treePaths['addon']);
    } else {
      pathParts.push(app.project.root, (app.app || app).trees['app']);
    }

    return new Funnel(path.join(...pathParts));
  }
}
