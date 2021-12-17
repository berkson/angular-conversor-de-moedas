import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversorComponent } from './components';
import { ConversorService, MoedaService } from './services';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NumeroDirective } from './directives';
import { ModalCotacaoComponent } from './utils';
import { DataBrPipe } from './pipes/data-br.pipe';

@NgModule({
  declarations: [ConversorComponent, NumeroDirective, ModalCotacaoComponent, DataBrPipe],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [ConversorComponent, ModalCotacaoComponent],
  providers: [MoedaService, ConversorService],
})
export class ConversorModule {}
