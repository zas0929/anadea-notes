$(document).ready(function() {
    //remove note
    $('.notes-list__remove').on('click', function() {
        var noteId = $(this).siblings('.notes-list__title').data('id');
        $(this).parent('li').slideUp(100);
        $.ajax({
            url: '/remove?removeId=' + noteId + '',
            async: true,
        }).done(function() {
            console.log('removed');
        });
    });
    //add note
    $('.add-note__btn').on('click', function() {
        var noteTitle = $(this).siblings('.add-note__tittle').val();
        var noteDesc = $(this).siblings('.add-note__text').val();
        console.log(noteDesc);
        $.ajax({
            url: '/add?titleAdd=' + noteTitle + '&descAdd=' + noteDesc + '',
            async: true,
        }).done(function() {
            console.log('added');
        });
    });
    //edit note
    $('.add-note__btn-edit').on('click', function() {
        var noteId = $(this).closest('.notes-list__edit-block').siblings('.notes-list__title').data('id');
        var noteTitle = $(this).siblings('.add-note__tittle').val();
        var noteDesc = $(this).siblings('.add-note__text').val();
        $.ajax({
            url: '/edit?noteId=' + noteId + '&noteTitle=' + noteTitle + '&noteDesc=' + noteDesc + '',
            async: true,
        }).done(function() {
            console.log('edited');
        });
    });
    //search-note__btn
    $('.search-note__btn').on('click', function(event) {
        event.preventDefault();
        var searchTitle = $(this).siblings('.search-note__field').val();
        $.ajax({
            url: '/search?searchTitle=' + searchTitle + '',
            async: true,
        }).done(function(data) {
            for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
                $('.search-note__list').append('<li class="search-note__item">' + data[i] + '</li>');
            }
        });
    });
    //show edit block
    $('.notes-list__edit').on('click', function() {
        $(this).siblings('.notes-list__edit-block').slideToggle(400, function() {
            $(this).stop(true, true);
        });
    })
    //show description
    $('.notes-list__more').on('click', function() {
        $(this).siblings('.notes-list__description').slideToggle(400, function() {
            $(this).stop(true, true);
        });
    })
    $('.notes-list__title').on('click', function(event) {
        event.preventDefault();
        $(this).siblings('.notes-list__description').slideToggle(400, function() {
            $(this).stop(true, true);
        });
    })
});
