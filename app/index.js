'use strict';
var generators = require('yeoman-generator');
var indentation;
var size;

module.exports = generators.Base.extend({
	// ask the user for his preferred indentation character
	prompting: function() {
		var done = this.async();
		this.prompt([{
			type: 'input',
			name: 'indentation',
			message: 'Prefer tabs (t) or spaces (s) for indentation?',
			default: 't'
		}, {
			when: function(response) {
				return response.indentation === 's';
			},
			type: 'input',
			name: 'size',
			message: 'How many spaces?',
			default: '2'
		}], function(answers) {
			if (answers.indentation === 't') {
				indentation = 'tab';
			} else {
				indentation = 'space';
			}
			size = answers.size;
			done();
		});
	},
	// write the editorconfig and update with the selected indentation character
	configuring: function() {
		this.fs.copyTpl(
			this.templatePath('editorconfig'),
			this.destinationPath('.editorconfig'),
			{
				indentation: indentation,
				size: size
			}
		);
	}
});
