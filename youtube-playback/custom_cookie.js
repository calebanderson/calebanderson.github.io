const CustomCookie = {
  rateKey: 'custom_yt_speed',
  rateRegex: /custom_yt_speed=(\d+(?:\.\d+)?)(?:;|$)/,

  set rate(val){
    document.cookie = this.rateKey + '=' + val;
  },

  get rate(){
    const rateMatch = document.cookie.match(this.rateRegex);
    if(rateMatch && rateMatch[1]){
      return rateMatch[1];
    } else {
      return 1;
    }
  },

  deleteCookieKey(key){
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  },

  trimCookie(){
    // var uselessKeys = document.cookie.match(/(gsScrollPos-\d+(?==))/g);
    // if(!uselessKeys) return;
    // uselessKeys.forEach(deleteCookieKey);
  }
}
export default CustomCookie;
