'use-strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay')

module.exports = generators.Base.extend({
	// YEOMAN RUN LOOP
	//------------------------------------------------------------------------
	initializing: function () {
		this.log(yosay('Allo Allo!, Welcome to WebSMACSS!'));
	},

	prompting: function () {
		this._prompt();
	},

	configuring: function () {
		this.config.save();
	},

	writing: function () {
		this._createProjectFileSystem();
	},

	install: function () {
		this.bowerInstall();
		this.npmInstall();
	},
	//-------------------------------------------------------------------------
	
	_prompt: function (answers) {
		this.prompt(this._askQuestions(), function (answers) {
			this.gitUser = answers.gitUser;
			this.appname = answers.name;
			this.appauthor = answers.userName;
			this.applicense = answers.licenseType;
			this.log(answers.name);
		}.bind(this));
	},

	_askQuestions: function () {
		var prompts = [
			{
				name: 'name',
				message: 'What is the name for your project?',
				default: this.appname
			},
			{
				name: 'gitUser',
				message: 'What is your github username?',
			},
			{
				name: 'userName',
				message: 'What is your name?',
			},
			{
				name: 'licenceType',
				message: 'How is your project licensed?',
				default: 'MIT'
			}
		];
		return prompts;
	},
	_createProjectFileSystem: function () {
		var dstRoot = this.destinationRoot(),
			srcRoot = this.sourceRoot(),
			appDir = dstRoot + "/app";

		this._createFolderStructure(appDir);
		this._createStarterFiles(srcRoot, dstRoot);
	},

	installDependencies: function () {
		this.bowerInstall();
		this.npmInstall();
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
		this.fs.copy(srcRoot + "/package.json", dstRoot + "/package.json");
		this.fs.copy(srcRoot + "/robots.txt", dstRoot + "/app/robots.txt");
		this.fs.copy(srcRoot + "/humans.txt", dstRoot + "/app/humans.txt");
		this.fs.copy(srcRoot + "/humans.txt", dstRoot + "/app/.gitignore");
		this.fs.copy(srcRoot + "/CONTRIBUTING.md", dstRoot + "/CONTRIBUTING.md");
		this.fs.copy(srcRoot + "/README.md", dstRoot + "/README.md");
	}
});