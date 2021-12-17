import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConversorService } from '../services';
import { Conversao, ConversaoResponse } from '../models';

@Component({
  selector: 'modal-cotacao',
  templateUrl: './modal-cotacao.component.html',
  styleUrls: ['./modal-cotacao.component.css'],
})
export class ModalCotacaoComponent implements OnInit {
  @Input() id!: string;
  @Input() conversaoResponse!: ConversaoResponse;
  @Input() conversao: Conversao = new Conversao();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private conversorService: ConversorService) {}

  ngOnInit(): void {}

  // aciona método init do componete conversor / informa ao elemento pai
  novaConsulta() {
    this.onConfirm.emit();
  }

  get valorConvertido(): string {
    if (
      this.conversaoResponse === undefined ||
      this.conversao.valor === undefined ||
      this.conversaoResponse.base == undefined
    ) {
      return '0';
    }
    return (this.conversao.valor * this.conversaoResponse.base.high).toFixed(2);
  }

  get cotacaoPara(): number {
    return this.conversorService.cotacaoPara(
      this.conversaoResponse,
      this.conversao
    );
  }

  get cotacaoDe(): string {
    return this.conversorService.cotacaoDe(
      this.conversaoResponse,
      this.conversao
    );
  }

  get dataCotacao(): string {
    return this.conversorService.dataCotacao(this.conversaoResponse);
  }
}
