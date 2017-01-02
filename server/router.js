function router(app, express, mongoose) {
    var ejs = require('ejs');
    ejs.delimiter = "?";

    app.set('view engine', 'ejs');

    //get makeModelNotes
    var notesModel = require("../schemas/notes.js")(mongoose);
    var note = new notesModel({
        title: "test note 2",
        description: "test description note"
    });
    // note.save();

    console.log(note);
    app.get('/', function(req, res) {
        //all notes
        notesModel.find(function(err, notes) {
            res.render('template', {
                data: notes
            });
        });
    });
    app.get('/remove', function(req, res) {
        var noteId = req.query.removeId;
        console.log(noteId);
        notesModel.remove({"_id" : noteId}, function(err) {
            console.log("note deleted");
        });
    });
    app.get('/add', function(req, res) {
        var titleReq = req.query.titleAdd;
        var descReq = req.query.descAdd;
        console.log(titleReq);
        console.log(descReq);
        var note = new notesModel({
            title: titleReq,
            description: descReq
        });
        note.save();
        titleDescReq = [titleReq, descReq, note._id];
        res.send(titleDescReq);

    })
    app.get('/edit', function(req, res) {
        var noteId = req.query.noteId;
        var titleEdit = req.query.noteTitle;
        var descEdit = req.query.noteDesc;
        notesModel.findOne({"_id" : noteId}, function(err, note) {
            note.title = titleEdit;
            note.description = descEdit;
            note.save(function(err) {
                console.log("note updated");
            });
        });
    })
    app.get('/search', function(req, res) {
        var searchTitle = req.query.searchTitle;
        var checkTitle = new RegExp(searchTitle, "ig");
        var identArray;
        notesModel.find(function(err, note) {
            var answer = [];
            for (var i = 0; i < note.length; i++) {
                identArray = note[i].title.match(checkTitle);
                if (identArray != null) {
                    answer.push(note[i].title);
                    answer.push(note[i].description);
                }
            }
            console.log(answer);
            res.send(answer);
        });
    });

    app.use(express.static(__dirname + "/../public"));

}





module.exports = router;
