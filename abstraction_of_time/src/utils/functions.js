/*

    This file is a function
    that calculates time in a
    format that works for us

    example:
    time( new Date() );

*/
export function timeFormat(t) {
  let time = t || new Date();

  let format = val => {
    return val.toString().padStart(2, "0");
  };

  let h = format( time.getHours()   );
  let m = format( time.getMinutes() );
  let s = format( time.getSeconds() );
  let n = time.getTime();

  // TODO: am/pm

  // default, return object
  return {
    hour: h,
    min:  m,
    sec:  s,
    now:  n,
    string: `${h}:${m}:${s}`
  };
}
