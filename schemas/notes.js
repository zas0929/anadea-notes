function makeModelNotes(mongoose) {

	var notesSchema = mongoose.Schema({
		title: String,
		description: String
	});

	return mongoose.model('notesModel', notesSchema);

}

module.exports = makeModelNotes;
