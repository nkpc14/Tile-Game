class ScoreBoard {
    difficultyLevel = "EASY";
    sizeOfBoard = 1;
    scoreBoard = "";
    elements = null;
    currentSelected = 'a 0 0';
    blankPosition = [];
    moves = 0;
    moveElement = document.getElementById('moves');
    logs = document.getElementById('logs');

    // To set the difficulty level of the game
    setDifficultyLevel = (level) => {
        this.difficultyLevel = level
    };

    // To set the difficulty to easy
    easy() {
        this.setDifficultyLevel("EASY");
        this.world();
    }

    // To set the difficulty to Medium
    medium() {
        this.setDifficultyLevel("MEDIUM");
        this.world();
    }

    // To set the difficulty to difficult
    difficult() {
        this.setDifficultyLevel("DIFFICULT");
        this.world();
    }

    // To set custom difficulty
    custom() {
        this.setDifficultyLevel("CUSTOM");
        this.world();
    }

    // Logging user moves
    log(element, index) {
        if (this.moves % 25 === 0) {
            this.logs.innerHTML = ""
        }
        // updating the Log
        this.logs.innerHTML += "<div style='font-size: 1rem'> " + this.moves + ". TILE " + element + " TO " + index + "</div>"
    }

    // Swapping the tile with empty tile
    swap(i, j) {
        let element = this.elements[i][j];
        let [bx, by] = this.blankPosition;
        this.elements[bx][by] = element;
        this.elements[i][j] = this.sizeOfBoard * this.sizeOfBoard;
        this.blankPosition = [i, j];
        this.moves++;
        this.log(element, [bx, by]);
        this.moveElement.textContent = this.moves;
        this.regenerate();
    }

    // Check if the game : Accenting Order + Last tile should be empty i.e sizeOfBoard * sizeOfBoard
    checkWinner() {
        let counter = 1;
        for (let i = 0; i < this.sizeOfBoard; i++) {
            for (let j = 0; j < this.sizeOfBoard; j++) {
                if (counter !== this.elements[i][j]) {
                    return false;
                }
                console.log(counter);
                counter++;
            }
        }
        return true;
    }

    //Rearranging the tiles
    regenerate() {
        this.scoreBoard = "";
        let matrix = [...this.elements];
        for (let i = 0; i < this.sizeOfBoard; i++) {
            let row = "";
            console.log("CHECK: ");
            console.log(matrix);
            for (let j = 0; j < this.sizeOfBoard; j++) {
                if ((matrix[i][j] !== this.sizeOfBoard * this.sizeOfBoard) && (matrix[i][j] != null)) {
                    row += "<div class='tile' >" + matrix[i][j] + "</div>";
                } else {
                    row += "<div class='empty'>" + "</div>";
                    this.blankPosition = [i, j]
                }
            }
            this.scoreBoard += "<div class='tile-container'>" + row + "</div>"
        }
        const scoreBoard = document.getElementById('board');
        scoreBoard.innerHTML = "";
        console.log(matrix);
        scoreBoard.innerHTML = this.scoreBoard;
        this.elements = matrix;
        this.positionCanMove();
        if (this.checkWinner()) {
            scoreBoard.innerHTML = "<h1 style='color: white;font-weight: bolder'>Winner</h1>"
            console.log("Winner")
        }
    }

    //Check for keyboard movement in the game
    keyPressed = (event) => {
        event = event || window.event;

        if (event.keyCode == '38') {
            // up arrow'
            this.positionCanMove("UP");
        } else if (event.keyCode == '40') {
            // down arrow
            this.positionCanMove("DOWN");
        } else if (event.keyCode == '37') {
            // left arrow
            this.positionCanMove("LEFT");
        } else if (event.keyCode == '39') {
            // right arrow
            this.positionCanMove("RIGHT");
        }
    }

    //To check if the user is allowed to make the move
    positionCanMove(userKeyPress) {
        let indexs = this.blankPosition;
        if (userKeyPress === "UP") {
            if (this.elements[Number(indexs[0]) + 1][indexs[1]]) {
                //UP
                console.log("Up");
                this.swap(Number(indexs[0]) + 1, indexs[1]);
                return true;
            }
            return false;
        } else if (userKeyPress === "DOWN") {
            if (this.elements[Number(indexs[0]) - 1][indexs[1]]) {
                //DOWN
                console.log("DOWN");
                this.swap(Number(indexs[0]) - 1, indexs[1]);
                return true;
            }
            return false;
        } else if (userKeyPress === "LEFT") {
            if (this.elements[Number(indexs[0])][indexs[1] + 1]) {
                //LEFT
                console.log("LEFT");
                this.swap(Number(indexs[0]), indexs[1] + 1);
                return true;
            }
            return false;
        } else if (userKeyPress === "RIGHT") {
            if (this.elements[Number(indexs[0])][indexs[1] - 1]) {
                //RIGHT
                console.log("RIGHT");
                this.swap(Number(indexs[0]), indexs[1] - 1);
                return true;
            }
            return false;
        }
    }

    //Randomize te score board
    randomizeScoreBoard(arrayToBeRandomize) {
        let control = arrayToBeRandomize.length, temp, index;
        while (control > 0) {
            index = Math.floor(Math.random() * control);
            control--;
            temp = arrayToBeRandomize[control];
            arrayToBeRandomize[control] = arrayToBeRandomize[index];
            arrayToBeRandomize[index] = temp;
        }
        return arrayToBeRandomize;
    }

    //To generate the score board
    generateScoreBoard2() {
        if (this.difficultyLevel === "EASY") {
            this.sizeOfBoard = 3;
        } else if (this.difficultyLevel === "MEDIUM") {
            this.sizeOfBoard = 4;
        } else if (this.difficultyLevel === "DIFFICULT") {
            this.sizeOfBoard = 10;
        } else if (this.difficultyLevel === "CUSTOM") {
            this.sizeOfBoard = prompt("Enter the Size of Board");
        }
        let counter = 0;
        let element1 = [];
        for (let i = 1; i <= (this.sizeOfBoard * this.sizeOfBoard); i++) {
            element1.push(i);
        }
        console.log(this.randomizeScoreBoard(element1));
        this.elements = element1;

        let matrix = [];
        for (let i = 0; i < this.sizeOfBoard; i++) {
            let row = "";
            matrix[i] = [];
            for (let j = 0; j < this.sizeOfBoard; j++) {
                let popped = element1.pop();
                if (popped !== this.sizeOfBoard * this.sizeOfBoard) {
                    matrix[i][j] = popped;
                    row += "<div class='tile' >" + matrix[i][j] + "</div>";
                } else {
                    row += "<div class='empty'>" + "</div>";
                    this.blankPosition = [i, j]
                }
            }
            this.scoreBoard += "<div class='tile-container'>" + row + "</div>"
        }
        this.elements = matrix;
        this.positionCanMove();
    }

    // To create the game world
    world() {
        const scoreBoard = document.getElementById('board');
        this.scoreBoard = "";
        scoreBoard.innerHTML = "";
        this.generateScoreBoard2();
        scoreBoard.innerHTML = this.scoreBoard;
        stopWatch.timer();
    }
}


scoreBoard = new ScoreBoard();
// scoreBoard.world();
document.onkeydown = scoreBoard.keyPressed;

