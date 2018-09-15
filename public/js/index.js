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
                const dateFormatted = moment(workout.workout_date).format('D MMMM');
                const text = `on ${dateFormatted} at ${workout.place.name} (${workout.place.type}) --> ${workout.sets_count} x ${workout.reps_count}, ${workout.weight_kg}kg`
                list.append($('<li>').text(text));
            });
            $(this).append(list);
            $(this).off('click');
        });
    });
});