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
    $('.add-note__btn').on('click', function(event) {
        event.preventDefault();
        if($(this).siblings('.add-note__tittle').val() == '') {
            $(this).siblings('.add-note__tittle').addClass('error');
            return;
        }
        var noteTitle = $(this).siblings('.add-note__tittle').val();
        var noteDesc = $(this).siblings('.add-note__text').val();
        $.ajax({
            url: '/add?titleAdd=' + noteTitle + '&descAdd=' + noteDesc + '',
            async: true,
        }).done(function(data) {
            $('.notes-list').append('<li class="notes-list__item"><a href="#" class="notes-list__title" data-id=' + data[2] + '>'  + data[0] + '</a><span class="notes-list__message">New note added!</span></li>');
            console.log(data);

        });
    });
    $('.add-note__tittle').on('focus', function() {
        $(this).removeClass('error');
    })
    //edit note
    $('.add-note__btn-edit').on('click', function(event) {
        event.preventDefault();
        var noteId = $(this).closest('.notes-list__edit-block').siblings('.notes-list__title').data('id');
        var noteTitle = $(this).siblings('.add-note__tittle').val();
        var noteDesc = $(this).siblings('.add-note__text').val();
        $.ajax({
            url: '/edit?noteId=' + noteId + '&noteTitle=' + noteTitle + '&noteDesc=' + noteDesc + '',
            async: true,
        }).done(function() {
            console.log('edited');
        });
        $(this).closest('.notes-list__item').find('.notes-list__title').text(noteTitle);
        $(this).closest('.notes-list__item').find('.notes-list__description').text(noteDesc);
    });
    //search-note__btn
    $('.search-note__btn').on('click', function(event) {
        event.preventDefault();
        if($('.search-note__field').val() == '') {
            $('.search-note__field').addClass('error');
            return;
        }
        $('.search-note__list').find('li').remove();
        var searchTitle = $(this).siblings('.search-note__field').val();
        console.log(searchTitle);
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
    $('.search-note__field').on('focus', function() {
        $(this).removeClass('error');
    })
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
