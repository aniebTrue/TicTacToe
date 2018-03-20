import { NgModule } from "@angular/core"

interface ICell {
    x: number;
    y: number;
}

export class GameBoard {
    private _gameField: number[][];
    private _turnCounter: number;
    private _player = "X";
    private _gameOver = false;
    private _draw = 0;
    private _winX = 0;
    private _winO = 0;
    private _winCells: ICell[] = [];

    constructor() {
        this._gameField = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this._turnCounter = 1;
    }
    public get GameField() {
        return this._gameField;
    }
    public get WinX() {
        return this._winX;
    }
    public get WinO() {
        return this._winO;
    }
    public get Draw() {
        return this._draw;
    }
    public GetCell(x: number, y: number) {
        return this._gameField[x][y] == 0 ? " " : this._gameField[x][y] == 1 ? "X" : "O";
    }

    public GameStatus(): string {
        if (this._gameOver && this._turnCounter <= 9) {
            return "Игра окончена! Победил " + this._player;
        }
        if (this._turnCounter > 9) {
            return "Ничья";
        }
        else {

            return "Ход: " + this._player;
        }
    }

    public makeMove(x: number, y: number) {
        if (!this._gameField[x][y] && this._gameOver == false && this._turnCounter <= 9) {
            this._gameField[x][y] = this._player == "X" ? 1 : 2;

            this._gameOver = this.CheckWin();
            if (this._gameOver == true) {
                this._player == "X" ? this._winX++ : this._winO++;
                return;
            }

            this._turnCounter++;
            if (this._turnCounter > 9) {
            this._gameOver = true;
                this._draw++;
                return;
            }

            this._player = this._player == "X" ? "O" : "X";
        }


    }

    public IsWinCell(X: number, Y: number) {
        if (this._winCells.length > 0) {
            for(let cell of this._winCells)
            {
                if(cell.x==X && cell.y==Y)
                {
                    return true;
                }
            }
            
        }
        return false;
    }

    public Clear() {
        this._gameField = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this._turnCounter = 1;
        this._player = "X";
        this._gameOver = false;
        this._winCells = [];
    }

    private CheckWin() {
        for (let i = 0; i < 3; i++) {
            //Проверка строк
            if (this._gameField[i][0] != 0
                && this._gameField[i][0] == this._gameField[i][1]
                && this._gameField[i][1] == this._gameField[i][2]) {
                this._winCells.push({ x: i, y: 0 });
                this._winCells.push({ x: i, y: 1 });
                this._winCells.push({ x: i, y: 2 });
                return true;
            }
            //Проверка столбцов
            if (this._gameField[0][i] != 0
                && this._gameField[0][i] == this._gameField[1][i]
                && this._gameField[1][i] == this._gameField[2][i]) {
                this._winCells.push({ x: 0, y: i });
                this._winCells.push({ x: 1, y: i });
                this._winCells.push({ x: 2, y: i });
                return true;
            }

        }
        //Проверка диагоналей
        if (
            (this._gameField[0][0] != 0 && this._gameField[0][0] == this._gameField[1][1] && this._gameField[1][1] == this._gameField[2][2])) {
            this._winCells.push({ x: 0, y: 0 });
            this._winCells.push({ x: 1, y: 1 });
            this._winCells.push({ x: 2, y: 2 });
            return true
        }
        if (this._gameField[0][2] != 0 && this._gameField[0][2] == this._gameField[1][1] && this._gameField[1][1] == this._gameField[2][0]) {
            this._winCells.push({ x: 0, y: 2 });
            this._winCells.push({ x: 1, y: 1 });
            this._winCells.push({ x: 2, y: 0 });
            return true
        }
        return false;
    }
}



