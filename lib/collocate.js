const Funnel = require('broccoli-funnel');
const Merge = require('broccoli-merge-trees');
const Replace = require('broccoli-replace');
const StyleManifest = require('broccoli-style-manifest');
const Styles = require('./base.js');

module.exports = class CollocatedStyles extends Styles {
  constructor(options) {
    super(options);

    this.name = 'collocate-styles';
    this.excludeFromManifest = options.excludeFromManifest;
  }

  generateManifest(node) {
    let styleManifest = new StyleManifest(node, {
      outputFileNameWithoutExtension: 'ember-styles',
      annotation: 'StyleManifest (ember-cli-styles: style file manifest)',
    });

    return new Replace(styleManifest, {
      files: ['ember-styles.sass'],
      patterns: [{
        match: /;/g,
        replacement: '',
      }],
    });
  }

  collocatedStylesWithManifest(node, destDir) {
    let stylesWithoutExcluded = new Funnel(node, {
      exclude: this.excludeFromManifest,
    });
    let styleManifest = this.generateManifest(stylesWithoutExcluded);
    let collocatedStylesWithManifest = new Merge([node, styleManifest]);

    return new Funnel(collocatedStylesWithManifest, {
      destDir,
    });
  }

  toTree(tree, inputPath, outputPath, options) {
    let projectNode = this.projectNode(options.registry.app);
    let styles = this.collocatedStylesFrom(projectNode);

    styles = this.collocatedStylesWithManifest(styles, inputPath);

    return new Merge([tree, styles]);
  }
}
