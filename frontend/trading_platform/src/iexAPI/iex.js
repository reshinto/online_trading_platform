export default class IEX {
  constructor() {
    this.prefix = "https://api.iextrading.com/1.0";
  }

  getFullUrl(infixKey, optionKey = null, parameter = null) {
    return optionKey === null
      ? this.prefix + IEX.getInfixUrls(infixKey)
      : this.prefix +
          IEX.getInfixUrls(infixKey) +
          IEX.getSuffixUrls(optionKey)(parameter);
  }

  static getSymbols(...symbols) {
    if (symbols.length === 1) return symbols[0].toUpperCase();
    let allSymbols = [];
    for (let symbol of symbols) {
      allSymbols.push(symbol.toUpperCase());
    }
    return allSymbols.join();
  }

  static getInfixUrls(key) {
    return {
      histDay: "/stats/historical/daily"
    }[key];
  }

  static getSuffixUrls(key) {
    return {
      date: IEX.date,
      last: IEX.last
    }[key];
  }

  // getJson(infixKey, optionKey = null, parameter = null) {
  //   return axios
  //     .get(this.getFullUrl(infixKey, optionKey, parameter))
  //     .then(res => {
  //       // retrieve data array of objects
  //       return res["data"];
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  static date(digits) {
    /*
    1) Historical Daily
    - option 1: YYYYMM
    - option 2: YYYYMMDD
    */
    return `?date=${digits}`;
  }

  static last(digit) {
    /*
    1) Historical Daily
    - digit is the number of trading days (max 90)
    */
    if (digit > 90) digit = 90;
    return `?last=${digit}`;
  }
}
