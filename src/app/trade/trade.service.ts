import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  createTradePath: string = 'http://localhost:3000/trade';
  getTradeDetailsByPagePath: string = 'http://localhost:3000/trades/';
  getTradePath: string = 'http://localhost:3000/trade/';
  getCountPath: string = 'http://localhost:3000/tradecount';

  constructor(private http: HttpClient) {}

  getTradeCount() {
    return this.http.get<any[]>(this.getCountPath);
  }

  createMatrimony(trade) {
    return this.http.post(this.createTradePath, trade);
  }

  updateMatrimony(trade) {
    return this.http.put(this.createTradePath, trade);
  }

  getTradeyByPage(excludeuserid, pageNumber, itemsPerPage) {
    return this.http.get<any[]>(
      this.getTradeDetailsByPagePath +
        excludeuserid +
        '/' +
        pageNumber +
        '/' +
        itemsPerPage
    );
  }

  getTradeDetailsByUserId(id) {
    return this.http.get<any[]>(this.getTradePath + id);
  }

  getTradeDetailsByUserAndRecordId(userid, recordid) {
    return this.http.get<any[]>(this.getTradePath + userid + '/' + recordid);
  }
}
