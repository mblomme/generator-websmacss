'use-strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay')

module.exports = generators.Base.extend({
	// YEOMAN RUN LOOP
	//------------------------------------------------------------------------
	initializing: function () {
		this.log(yosay('Allo Allo! Welcome to WebSMACSS!', { maxLength: 10 }));
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
		var done = this.async();
		this.prompt(this._askQuestions(), function (answers) {
			this.gituser = answers.gituser;
			this.appname = answers.appname;
			this.appauthor = answers.appauthor;
			this.applicense = answers.applicense;
			this.appversion = answers.appversion;
			this.appdeps = answers.appdeps;
			this.log(answers.name);
			done();
		}.bind(this));
	},

	_askQuestions: function () {
		var prompts = [
			{
				type: 'input',
				name: 'appname',
				message: 'What is the name for your project?',
				default: this.appname
			},
			{
				type: 'input',
				name: 'appversion',
				message: 'Version of project?',
				default: '0.0.0'
			},
			{
				type: 'input',
				name: 'gituser',
				message: 'What is your github username?',
			},
			{
				type: 'input',
				name: 'appauthor',
				message: 'What is your name?',
			},
			{
				type: 'input',
				name: 'applicense',
				message: 'How is your project licensed?',
				default: 'MIT'
			},
			{
				type: 'checkbox',
				name: "appdeps",
				message: "Some dependencies?",
				default: true,
				choices: [
					{
						name: 'jquery',
						value: 'jquery'
					},
					{
						name: 'jqueryUI',
						value: 'jquery-ui'
					},
					{
						name: 'angular2',
						value: 'angular'
					},
					{
						name: 'requirejs',
						value: 'requirejs'
					}]					
			}
		];
		return prompts;
	},

	_createProjectFileSystem: function () {
		var dstRoot = this.destinationRoot(),
			srcRoot = this.sourceRoot(),
			appDir = dstRoot + "/app",
			templateContext = {
				appname: this.appname,
				appversion: this.appversion,
				appauthor: this.appauthor,
				applicense: this.applicense,
				appdeps: this.appdeps
			}

		this._createFolderStructure(appDir);
		this._createStarterFiles(srcRoot, dstRoot, templateContext);
	},

	installDependencies: function () {
		this.bowerInstall();
		this.npmInstall();
	},

	_createFolderStructure: function (target) {
		mkdirp(target + '/wwwroot/html');
		mkdirp(target + '/wwwroot/scripts');
		mkdirp(target + '/wwwroot/css');
		mkdirp(target + '/wwwroot/js');
		mkdirp(target + '/wwwroot/img');
		mkdirp(target + '/typescript');
	},

	_createStarterFiles: function (srcRoot, dstRoot, context) {
		this.fs.copy(srcRoot + "/.bowerrc", dstRoot + "/.bowerrc");
		this.fs.copy(srcRoot + "/gulpfile.js", dstRoot + "/gulpfile.js");
		this.fs.copy(srcRoot + "/.jshintrc", dstRoot + "/.jshintrc");
		this.fs.copyTpl(srcRoot + "/bower.json", dstRoot + "/bower.json", context);
		this.fs.copyTpl(srcRoot + "/package.json", dstRoot + "/package.json", context);
		this.fs.copy(srcRoot + "/robots.txt", dstRoot + "/app/robots.txt");
		this.fs.copyTpl(srcRoot + "/humans.txt", dstRoot + "/app/humans.txt", context);
		this.fs.copy(srcRoot + "/humans.txt", dstRoot + "/app/.gitignore");
		this.fs.copyTpl(srcRoot + "/CONTRIBUTING.md", dstRoot + "/CONTRIBUTING.md", context);
		this.fs.copyTpl(srcRoot + "/README.md", dstRoot + "/README.md", context);
		this.directory(srcRoot + "/scss", dstRoot + "/app/scss");
	}
});