import { NgModule, Component }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent,Board, GameCell }   from './app.component';


@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ AppComponent, Board, GameCell ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

