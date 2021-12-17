import createSpyObj = jasmine.createSpyObj;
import { ElementRef } from '@angular/core';
import { NumeroDirective } from './numero.directive';

let element: ElementRef = createSpyObj('idNaicsRef', ['nativeElement']);

describe('NumeroDirective', () => {
  it('should create an instance', () => {
    const directive = new NumeroDirective(element);
    expect(directive).toBeTruthy();
  });
});
