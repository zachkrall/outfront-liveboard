/*
    File for color scale
*/
export default class Color {
  constructor( _context ){
    this.context = _context;
    this.background = document.querySelector('#color');
  }

  setup( time ){

    let { hour } = time;
    console.log(hour);

    var color_top,
        color_bottom;

    switch(hour){
      case '00':
      case '01':
      case '02':
      case '03':
      case '04':
      case '05':
      case '06':
        color_top = "#000000";
        color_bottom = "#203090";
        break;
      case '07':
        color_top= "#3A479B";
        color_bottom = "#E5C59A";
        break;
      case '08':
      case '09':
      case '10':
      case '11':
      case '12':
      case '13':
      case '14':
      case '15':
      case '16':
        color_top = "#4F75F5";
        color_bottom = "#B8B9D6";
        break;
      case '17':
        color_top = "#3A315C";
        color_bottom = "#D69A82";
        break;
      default:
        color_top = "#000000";
        color_bottom = "#203090";
        break;
    }

    // if (0<= hour <= 6 || 18 <= hour <= 23) {
    //   color_top = "#000000";
    //   color_bottom = "#203090";
    //   } else if (hour==7){
    //     color_top= "#3A479B";
    //     color_bottom = "#E5C59A";
    //   } else if (7 <= hour <= 16){
    //     color_top = "#4F75F5";
    //     color_bottom = "#B8B9D6";
    //   } else if(hour == 17){
    //     color_top = "#3A315C";
    //     color_bottom = "#D69A82";
    //   }

      console.log(color_top);
      console.log(color_bottom);

      this.background.style.background = 'linear-gradient(to bottom, ' + color_top + ' 0%, ' + color_bottom + ' 100%)';
  }

}
