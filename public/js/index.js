const apiUrl = '/api';

$(document).ready(function () {
    const handleError = function (err) {
        const message = $('<p>')
            .text(`${err.statusText}: ${err.responseJSON.error}`)
            .addClass('error');
        $('body').append(message);
    }

    const getLatestWorkoutEntriesForExercise = function (exId, done) {
        $.ajax({
            method: 'get',
            url: `${apiUrl}/exercises/latest`,
            data: {
                exercise_id: exId
            },
            success: (data) => done(data),
            error: (error) => handleError(error)
        });
    }

    $('[data-exercise-id]').click(function (ev) {
        const exId = $(this).data('exercise-id');
        getLatestWorkoutEntriesForExercise(exId, data => {
            const list = $('<ul>');
            data.workouts.forEach((workout) => {
                const text = `On ${workout.workout_date} --> ${workout.weight_kg}KG ${workout.sets_count} sets of ${workout.reps_count} reps`
                list.append($('<li>').text(text));
            });
            $(this).append(list);
        });
    });
});