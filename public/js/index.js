const apiUrl = '/api/v1';


$(document).ready(function () {
    const handleError = function (err) {
        const message = $('<p>')
            .text(`${err.statusText}: ${err.responseJSON.error}`)
            .addClass('error');
        $('body').append(message);
    }

    const getLatestWorkoutEntriesByExercise = (exId, done) => {
        $.ajax({
            method: 'GET',
            url: `${apiUrl}/exercises/${exId}`,
            data: {
                entries: 3
            },
            success: (results) => done(results),
            error: (error) => handleError(error)
        });
    }

    const getWorkoutSessions = () => {
        const timezoneString = Intl.DateTimeFormat().resolvedOptions().timeZone;
        $.ajax({
            method: 'GET',
            url: `${apiUrl}/exercises/${exId}`,
            data: {
                timezoneString,
                days: 5,
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
                console.log('workout date')
                console.log(workout.workout_date);
                
                const format_UTC = 'YYYY-MM-DD HH:mm Z';

                const dateFormatted = moment(workout.workout_date, format_UTC).format('D MMMM');
                const text = `on ${dateFormatted} at ${workout.place.name} (${workout.place.type}) --> ${workout.sets_count} x ${workout.reps_count}, ${workout.weight_kg}kg`
                list.append($('<li>').text(text));
            });
            $(this).append(list);
            $(this).off('click');
        });
    });
});