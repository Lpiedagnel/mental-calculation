# Test your skills on mental calculation!

## Goal of this project

This is a little and simple application in Javascript who generate a mental calculation. The user has to answer quickly as possible for one minute. The addition and subtractions are worth one point, while the multiplication and division worth two.

The user can submit with the button “Submit” or by pressing “Enter” (which is faster).


## Development

Each time the user submits a good answer, this application generates two numbers and choose one of the four possible operators. This is simply done with Math functions. 

One difficulty of this project is the division calculation: sometimes the result of the calculation could be something very long like “1.333333333”. This is too troublesome for the final user, so I have to generate a new calculation each time the result of the division was longer than two letters. For that, I convert the result to string and measure the length (note: the comma counts obviously, so the length of “1.3” for example is actually 3).

Another difficulty is the timer. We have to convert the time variable into minutes and seconds, add a 0 if we want something like “00:04” to render and display the timer.

Good project for practice. I definitely recommended to try out.