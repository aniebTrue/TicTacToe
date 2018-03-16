import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
   <h1>
   Крестики-нолики!
   </h1>
   <board></board>
    `
})
export class AppComponent {}

@Component({
    selector:'gc',
    template:'{{state}}',
    styles:[
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
export class GameCell{
    @Input() state:string ;
}

@Component({
    selector:'board',
    template:`
    <div class="row" *ngFor="let row of [0,1,2]">
        <gc *ngFor="let col of [0,1,2]"
        [state]="gameCells[col+row*3]"
        (click)="makeMove(col+row*3)">
        </gc>
    </div>
    <div class="row">
    Ход:{{player}}
    </div>
    <button class="row" (click)="restart()">Restart</button>
    `,
    styles:[
        `
        :host{
            margin:auto;
            background-color:black;
        }
        .row{
            clear:both;
            }
        `
    ]
})
export class Board {
    gameCells = Array(9).fill(null);
    player='X';
    win:boolean = false;
    turn = 1;

    isWin():boolean{
        const wCombs = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let comb of wCombs) {
            if (this.gameCells[comb[0]] 
                && this.gameCells[comb[0]] == this.gameCells[comb[1]] 
                && this.gameCells[comb[1]] == this.gameCells[comb[2]])
                return true;
        }
        return false
    }

    makeMove(position:number)
    {
        if(!this.gameCells[position] && !this.win)
        {    
             
        this.turn++;       
        this.gameCells[position]=this.player;   

        if(this.isWin())
        {            
            alert(this.player+" win!!!");
            this.restart();
            return;
        }
        if(this.turn>9)
        {            
            alert("Draw!!!");
            this.restart();
            return;
        }
        this.player=this.player=="X"?"O":"X";
        }
    }
    restart()
    {
        this.gameCells = Array(9).fill(null);
        this.player='X';
        this.win = false;
        this.turn = 1;
    }

}