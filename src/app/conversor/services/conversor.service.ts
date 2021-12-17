import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conversao, ConversaoResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversorService {
  // Nova url do fixer.io, que adiciona o parâmetro access_key, que é a chave de autenticação
  //private readonly BASE_URL = "http://api.fixer.io/latest";
  // mudança de api para testes devido ao exceder a chave da fixer
  private readonly BASE_URL = 'https://economia.awesomeapi.com.br/last/';
  //'http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3';
  constructor(private http: HttpClient) {}
  /**
   * Realiza a chamada para a API de conversão de moedas.
   *
   * @param Conversao conversao
   * @return Observable<ConversaoResponse>
   */
  converter(conversao: Conversao): Observable<any> {
    // Na linha abaixo altere a '?' por '&'
    //let params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;
    let params = `${conversao.moedaDe}-${conversao.moedaPara}`;
    return this.http.get(this.BASE_URL + params);
    // No Angular 6 as duas próximas linha não são mais necessárias
    //.map(response => response.json() as ConversaoResponse)
    //.catch(error => Observable.throw(error));
  }
  /**
   * Retorna a cotação para dado uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @param Conversao conversao
   * @return number
   */
  cotacaoPara(
    conversaoResponse: ConversaoResponse,
    conversao: Conversao
  ): number {
    if (
      conversaoResponse === undefined ||
      conversao.moedaPara === undefined ||
      conversaoResponse.base === undefined
    ) {
      return 0;
    }
    return conversaoResponse.base.high;
  }
  /**
   * Retorna a cotação de dado uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @param Conversao conversao
   * @return string
   */
  cotacaoDe(
    conversaoResponse: ConversaoResponse,
    conversao: Conversao
  ): string {
    if (
      conversaoResponse === undefined ||
      conversao.moedaPara === undefined ||
      conversaoResponse.base === undefined
    ) {
      return '0';
    }
    return (1 / conversaoResponse.base.high).toFixed(4);
  }
  /**
   * Retorna a data da cotação dado uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @return string
   */
  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (
      conversaoResponse === undefined ||
      conversaoResponse.base === undefined
    ) {
      return '';
    }
    return conversaoResponse.base.create_date;
  }
}
