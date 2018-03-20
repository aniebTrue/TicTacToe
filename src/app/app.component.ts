import { Component, Input } from '@angular/core';
import { GameBoard } from './GameLogic'

@Component({
    selector: 'my-app',
    template: `
   <board  class="center-block"></board>
    `
})
export class AppComponent { }

@Component({
    selector: 'gc',
    template: '{{state}}',
    styles: [
        `
        :host{
                float:left;
                height:50px;
                width:50px;
                border: solid 1px black;
                text-align:center;
                font-size:45px;
                font-family:Arial;
            }
        `
    ]
})
export class GameCell {
    @Input() state: string;
}

@Component({
    selector: 'board',
    template: `
    <div class="row" *ngFor="let row of  gameBoard.GameField; let x = index">
        <gc *ngFor="let col of row; let y = index"
        [class.isWin] = "gameBoard.IsWinCell(x,y)"
        [state]="gameBoard.GetCell(x,y)"
        (click)="gameBoard.makeMove(x,y)">
        </gc>
    </div>
    <div class="row">
    {{gameBoard.GameStatus()}}
    </div>
    <div class="row">
    <button class="row" (click)="restart()">Restart</button>
    </div>
    <div class="row">
    <button class="row" (click)="gameBoard.Clear()">Clear</button>
    </div>
    <div class="table-responsive">       
    <table class="table" style="width:25%;">
    <thead>
    <tr>
    <td>X</td>
    <td>O</td>
    <td>Ничья</td>
    <tr>
    </thead>
    <tbody>
    <tr>
    <td>{{gameBoard.WinX}}</td>    
    <td>{{gameBoard.WinO}}</td>
    <td>{{gameBoard.Draw}}</td>
    </tr>
    </tbody>
    </table>    
    </div>
    `,
    styles: [
        `
        .row{
            clear:both;
            }
            .isWin{
                background-color:red;
            }
        `
    ]
})
export class Board {
    gameBoard = new GameBoard();

    restart() {
        this.gameBoard = new GameBoard()
    }

}