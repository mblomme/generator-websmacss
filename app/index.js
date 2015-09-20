'use-strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
	createProjectFileSystem: function () {
		var dstRoot = this.destinationRoot(),
			srcRoot = this.sourceRoot(),
			appDir = dstRoot + "/app";

		this._createFolderStructure(appDir);
		this._createStarterFiles(srcRoot, dstRoot);
	},
	
	_createFolderStructure: function (target) {
		mkdirp(target + '/wwwroot/html');
		mkdirp(target + '/wwwroot/scripts');
		mkdirp(target + '/wwwroot/css');
		mkdirp(target + '/wwwroot/img');
		mkdirp(target + '/scss/base');
		mkdirp(target + '/scss/layout');
		mkdirp(target + '/scss/module');
		mkdirp(target + '/scss/state');
	},

	_createStarterFiles: function (srcRoot, dstRoot) {
		this.fs.copy(srcRoot + "/.bowerrc", dstRoot + "/.bowerrc");
		this.fs.copy(srcRoot + "/.jshintrc", dstRoot + "/.jshintrc");
		this.fs.copy(srcRoot + "/bower.json", dstRoot + "/bower.json");
		this.fs.copy(srcRoot + "/robots.txt", dstRoot + "/app/robots.txt");
		this.fs.copy(srcRoot + "/humans.txt", dstRoot + "/app/humans.txt");
		this.fs.copy(srcRoot + "/humans.txt", dstRoot + "/app/.gitignore");
		this.fs.copy(srcRoot + "/CONTRIBUTING.md", dstRoot + "/CONTRIBUTING.md");
		this.fs.copy(srcRoot + "/README.md", dstRoot + "/README.md");
	}
});