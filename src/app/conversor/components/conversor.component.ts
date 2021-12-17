import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConversorService, MoedaService } from '../services';
import { Conversao, ConversaoResponse, Moeda } from '../models';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css'],
})
export class ConversorComponent implements OnInit {
  private _moedas: Moeda[] = [];
  private _conversao!: Conversao;
  private _possuiErro!: boolean;
  private _conversaoResponse: ConversaoResponse = new ConversaoResponse();
  @ViewChild('conversaoForm', { static: true })
  conversaoForm!: NgForm;

  constructor(
    private moedaService: MoedaService,
    private conversorService: ConversorService
  ) {}

  ngOnInit(): void {
    this.moedaService
      .listarTodas()
      .forEach((moeda) => this._moedas.push(moeda));
    this.init();
  }

  init(): void {
    this._conversao = new Conversao('USD', 'BRL', 0);
    this._possuiErro = false;
  }

  converter(): void {
    let returnedObject = `${this.conversao.moedaDe}${this.conversao.moedaPara}`;
    if (this.conversaoForm.valid) {
      this.conversorService.converter(this.conversao).subscribe({
        next: (response) =>
          (this._conversaoResponse.base = response[returnedObject]),
        error: (e) => (this._possuiErro = true),
      });
    }
  }

  get moedas(): Moeda[] {
    return this._moedas;
  }

  get conversao(): Conversao {
    return this._conversao;
  }

  get conversaoResponse(): ConversaoResponse {
    return this._conversaoResponse;
  }

  get possuiErro() {
    return this._possuiErro;
  }
}
