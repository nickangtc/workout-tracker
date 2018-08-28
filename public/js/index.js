const apiUrl = '/api';

$(document).ready(function () {
    const handleError = function (err) {
        const message = $('<p>')
            .text(`${err.statusText}: ${err.responseJSON.error}`)
            .addClass('error');
        $('body').append(message);
    }

    const getLatestWorkoutEntriesByExercise = function (exId, done) {
        $.ajax({
            method: 'get',
            url: `${apiUrl}/exercises/${exId}`,
            data: {
                entries: 3
            },
            success: (results) => done(results),
            error: (error) => handleError(error)
        });
    }

    $('[data-exercise-id]').click(function (ev) {
        const exId = $(this).data('exercise-id');
        getLatestWorkoutEntriesByExercise(exId, results => {
            const list = $('<ul>');
            results.workouts.forEach((workout) => {
                const text = `On ${workout.workout_date} --> ${workout.weight_kg}KG ${workout.sets_count} sets of ${workout.reps_count} reps`
                list.append($('<li>').text(text));
            });
            $(this).append(list);
            $(this).off('click');
        });
    });
});