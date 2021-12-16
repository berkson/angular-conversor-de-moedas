import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[numero]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NumeroDirective, multi: true },
  ],
})
export class NumeroDirective implements ControlValueAccessor {
  onChange: any;
  onTouched: any;

  constructor(private el: ElementRef) {}

  /**
   * Obtém o valor contido na model.
   * @param obj any
   */
  writeValue(obj: any): void {
    this.el.nativeElement.value = obj;
  }

  /**
   * Registra a função a ser chamada para atualizar
   * valor na model para evento change
   * @param fn any
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registra a função a ser chamada para atualizar
   * valor na model para evento touched
   * @param fn any
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Implementa a função onKeyUp para a diretiva
   * @param $event any
   */
  @HostListener('keyup', ['$event'])
  onKeyUp($event: any): void {
    let valor: string = $event.target.value;
    let posDecimais: number = valor.indexOf('.'); // retorna a posição do ponto, se decimal.

    valor = valor.replace(/[\D]/g, '');

    if (posDecimais > 0) {
      valor =
        valor.substring(0, posDecimais) + '.' + valor.substring(posDecimais);
    }

    $event.target.value = valor;
    this.onChange(valor); // usado para atualizar o valor no model, pois ao apagar letras fica sujeira no final do input.
  }
}
