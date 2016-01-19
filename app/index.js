'use strict';
var generators = require('yeoman-generator');
var indentation;

module.exports = generators.Base.extend({
	// ask the user for his preferred indentation character
	prompting: function() {
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'indentation',
			message: 'Prefer tabs (t) or spaces (s) for indentation?',
			default: 't'
		}, function(answers) {
			this.log(answers.indentation);
			if (answers.indentation === 't') {
				indentation = 'tab';
			} else {
				indentation = 'space';
			}
			done();
		}.bind(this));
	},
	// write the editorconfig and update with the selected indentation character
	writing: function() {
		this.fs.copyTpl(
			this.templatePath('editorconfig'),
			this.destinationPath('.editorconfig'),
			{
				indentation: indentation
			}
		);
	}
});
