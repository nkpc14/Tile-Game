class StopWatch {
    seconds = 0;
    minutes = 0;
    hours = 0;
    t;
    timerElement = document.getElementById('timer');

    //Increments the timer
    increment = () => {
        this.seconds++;
        if (this.seconds >= 60) {
            this.seconds = 0;
            this.minutes++;
            if (this.minutes >= 60) {
                this.minutes = 0;
                this.hours++;
            }
        }

        this.timerElement.textContent = (this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") + ":" + (this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : "00") + ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds);
        this.timer();
    }

    //To start the timer
    timer = () => {
        this.t = setTimeout(this.increment, 1000);
    }
}

const stopWatch = new StopWatch();