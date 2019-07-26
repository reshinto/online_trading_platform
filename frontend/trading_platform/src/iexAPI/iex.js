// https://iextrading.com/developer/docs/
class IEX {
  constructor() {
    this.prefix = "https://api.iextrading.com/1.0";
  }

  getFullUrl(
    infixKey,
    optionKey = null,
    optionKey2 = null,
    parameter2 = null,
    ...parameter
  ) {
    const url = this.prefix + IEX.getInfixUrls(infixKey);
    switch (infixKey) {
      case "histDay":
        return optionKey === null
          ? url
          : url + IEX.getSuffixUrls(optionKey, ...parameter);
      case "trades":
        return optionKey2 === null
          ? url + IEX.getSuffixUrls(optionKey, ...parameter)
          : url +
              IEX.getSuffixUrls(optionKey, ...parameter) +
              IEX.addSuffixUrls(optionKey2, parameter2);
      case "symbols":
        return url;
      default:
        return null;
    }
  }

  static getParameter(...parameter) {
    if (parameter.length === 1 && typeof parameter[0] === "number")
      return parameter[0];
    if (parameter.length === 1) return parameter[0].toUpperCase();
    let allSymbols = [];
    for (let symbol of parameter) {
      allSymbols.push(symbol.toUpperCase());
    }
    return allSymbols.join();
  }

  static getInfixUrls(key) {
    return {
      symbols: "/ref-data/symbols",
      corporateActions: "/ref-data/daily-list/corporate-actions",
      dividends: "/ref-data/daily-list/dividends",
      symbolDirectory: "/ref-data/daily-list/symbol-directory",
      tops: "/tops",
      topsLast: "/tops/last",
      deep: "/deep",
      book: "/deep/book",
      trades: "/deep/trades",
      systemEvent: "/deep/system-event",
      tradingStatus: "/deep/trading-status",
      opHaltStatus: "/deep/op-halt-status",
      ssrStatus: "/deep/ssr-status",
      securityEvent: "/deep/security-event",
      tradeBreak: "/deep/trade-breaks",
      aution: "/deep/auction",
      intraday: "/stats/intraday",
      recent: "/stats/recent",
      records: "/stats/records",
      historical: "/stats/historical",
      histDay: "/stats/historical/daily",
      market: "/market",
    }[key];
  }

  static getSuffixUrls(key, ...parameter) {
    return {
      date: IEX.date,
      last: IEX.last,
      symbols: IEX.symbols
    }[key](IEX.getParameter(...parameter));
  }

  static symbols(symbols) {
    /*
    - All multi-symbols must be a string separated with commas
    * Trades
    * Book
    * Operational Halt Status (opHaltStatus)
    * Short Sales Price Test Status (ssrStatus)
    * Security Event
    * Auction
      - Max 10 symbols
    * Trding status
    * Trade Break
      - Max 10 symbols
      - can have additional parameter "last"
        - use addLast()
    * Tops
    * Tops Last
      - display up to max number of symbols available
    * Deep
      - Max 1 symbol
    */
    return `?symbols=${symbols}`;
  }

  static date(digits) {
    /*
    1) Historical Daily
      - digits must be in
        - option 1: YYYYMM
        - option 2: YYYYMMDD
    2) Historical
      - digits must be in YYYYMM
    */
    return `?date=${digits}`;
  }

  static dateOnly(digits) {
    /*
    1) Corporate Actions
    2) Dividends
    3) Symbol Directory
      - digits must be YYYYMMDD
    */
    return `/${digits}`
  }

  static last(digit) {
    /*
    1) Historical Daily
      - digit is the number of trading days (max 90)
    */
    if (digit > 90) digit = 90;
    return `?last=${digit}`;
  }

  static addSuffixUrls(key, parameter2) {
    return {
      addLast: IEX.addLast
    }[key](parameter2);
  }

  static addLast(digit) {
    /*
    1) Trades
    2) Trade Break
      - digit is the number of trades (default 20, max 500)
    */
    return `&last=${digit}`;
  }
}

export default IEX;
