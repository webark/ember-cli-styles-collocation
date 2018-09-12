'use strict';

const ColocatedStyles = require('./lib/collocate.js');

module.exports = {
  _environment() {
    return this._findHost().env;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    const config = app.project.config(this._environment())['ember-cli-styles'];

    this.excludeFromManifest = config.excludeFromManifest;
  },

  config() {
    return {
      "ember-cli-styles": {
        excludeFromManifest: [],
      },
    };
  },

  setupPreprocessorRegistry(type, registry) {
    const isAddon = Boolean(this.parent.parent);
    const excludeFromManifest = this.excludeFromManifest;

    registry.add('css', new ColocatedStyles({
      excludeFromManifest,
      isAddon,
      registry,
    }));
  },

  name: require('./package').name
};
