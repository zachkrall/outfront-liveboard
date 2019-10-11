const p5 = require('p5');
const nycOpenData = require('./data.json');

let minX =  99999999999999,
    maxX = -99999999999999,
    minY =  99999999999999,
    maxY = -99999999999999;

// where p5 sketch is defined
const s = ( sketch ) => {

  let time = 0,
      w = window.innerWidth,
      h = window.innerHeight;

  let margin = 150;

  let areas = [],
      stations = [];

  class Station {

    constructor(x,y,line,name,size){
      this.x = sketch.map(
        x,
        minX, maxX,
        sketch.width-margin, 0+margin
      );

      this.y = sketch.map(
        y,
        minY, maxY,
        sketch.height-margin, 0+margin
      );

      this.line = line;
      this.name = name;
      this.size = size;
    }

    setSize(val){
      this.size = sketch.map(
        val,
        100, 255,
        10, 200,
        true
      );
    }

    draw (outline) {
      sketch.push();
      sketch.noStroke();
      let ssizee = 10;
      if( !outline ){
        // sketch.stroke(0);
        // sketch.strokeWeight(4);
      } else {
        sketch.fill(0,255,0);
        ssizee = 200;
        // sketch.noStroke();
      }
      sketch.ellipse(this.x, this.y, ssizee, ssizee);
      sketch.pop();
    }

  }

  class Area {

    constructor (x,y,fill) {
      this.x = x;
      this.y = y;

      this.w = 25;
      this.h = 30;

      this.fill = fill;

      this.red = 0;
    }

    draw () {
      sketch.push();
      sketch.noStroke();
      // sketch.stroke(50);
      sketch.fill(this.fill);
      sketch.rect(this.x,this.y,this.w,this.h);
      sketch.pop();
    }

    setRed(val){
      this.red = val;
    }

  }

  let rand;

  sketch.setup = () => {
    sketch.createCanvas(w, h);

    sketch.textSize(72);
    sketch.textAlign( sketch.LEFT, sketch.TOP);

    rand = {
      x1: (Math.random() * (sketch.width - 300)) + 150,
      y1: (Math.random() * (sketch.height - 300)) + 150,
      x2: (Math.random() * (sketch.width - 300)) + 150,
      y2: (Math.random() * (sketch.height - 300)) + 150,
      x3: (Math.random() * (sketch.width - 300)) + 150,
      y3: (Math.random() * (sketch.height - 300)) + 150,
      x4: (Math.random() * (sketch.width - 300)) + 150,
      y4: (Math.random() * (sketch.height - 300)) + 150,
      x5: (Math.random() * (sketch.width - 300)) + 150,
      y5: (Math.random() * (sketch.height - 300)) + 150
    };

    function getLength(s,t,x,y){
      var a = x - s;
      var b = y - t;
      return Math.sqrt( a*a + b*b );
    }

    for ( let x = 0; x < sketch.width; x+=25 ){
      for ( let y = 0; y < sketch.height; y+=30 ){

        var val = Math.min(
          getLength(rand.x1, rand.y1, x, y),
          getLength(rand.x2, rand.y2, x, y),
          getLength(rand.x3, rand.y3, x, y),
          getLength(rand.x4, rand.y4, x, y),
          getLength(rand.x5, rand.y5, x, y)
        );

        let scale = sketch.map(
          sketch.pow(val, 1.1),
          sketch.height, 0, 0, 130
        );

        sketch.colorMode(sketch.HSB, 100);

        // let fill = sketch.color(
        //   sketch.map(
        //     scale,
        //     0, 130, 0, 190
        //   ),
        //   sketch.map(
        //     scale,
        //     0, 130, 0, 0
        //   ),
        //   sketch.map(
        //     scale,
        //     0, 130, 0, 190
        //   )
        // );

        let fill = sketch.color(
          sketch.map(
            scale,
            0, 130, 70, 0
          ),
          sketch.map(
            scale,
            0, 130, 0, 90
          ),
          sketch.map(
            scale,
            0, 130, 0, 100
          )
        );
        //
        // let fill = sketch.color(scale);

        let result = new Area(x,y,fill);
        result.setRed(scale);

        areas.push(result);
      }
    }

    nycOpenData.data.forEach( point => {
      // set variables
      let lat = point[11].replace(/[()]/g,'').split(' ')[1];
      let lon = point[11].replace(/[()]/g,'').split(' ')[2];
      let line = point[12];
      let name = point[10];

      if ( lat > maxX ){ maxX = lat; }
      if ( lat < minX ){ minX = lat; }
      if ( lon > maxY ){ maxY = lon; }
      if ( lon < minY ){ minY = lon; }

      // create new station point
      stations.push( new Station(lat,lon,line,name) );
    });

    stations.forEach( station => {

      let size = areas.filter( area => {
        return ( station.x >= area.x && station.x <= area.x + area.w ) &&
               ( station.y >= area.y && station.y <= area.y + area.h );
      }).map( area => area.red )[0];

      // let size = 100;

      station.setSize(size);

    });

    console.log(`
      minX: ${minX},
      maxX: ${maxX},
      minY: ${minY},
      maxY: ${maxY},
    `);

    console.log(areas);
    console.log(stations.sort(
      (a,b) => a.size - b.size
    ));
    sketch.noLoop();

    let points = {}
  };

  sketch.draw = () => {
    // sketch.angleMode(sketch.DEGREES);
    // sketch.rotate(180);
    // sketch.translate( -sketch.width, -sketch.height );
    sketch.clear();
    sketch.background(0);
    sketch.fill(255);
    sketch.stroke(0);

    areas.forEach( item => {
      item.draw();
    });

    // sketch.push();
    // sketch.fill(0,255,0);
    // sketch.ellipse(rand.x1,rand.y1, 50, 50);
    // sketch.ellipse(rand.x2,rand.y2, 50, 50);
    // sketch.ellipse(rand.x2,rand.y3, 50, 50);
    // sketch.pop();

    // nycOpenData.data.forEach( point => {
    //   let x = point[11].replace(/[()]/g,'').split(' ')[1];
    //   let y = point[11].replace(/[()]/g,'').split(' ')[2];
    //
    //   console.log(point);
    // });
    // sketch.beginShape();
    //.sort((a,b)=>a.y - b.y)
    // sketch.blendMode(sketch.DIFFERENCE);
    stations.sort(
      (a,b) => a.size - b.size
    ).forEach( (station,index) =>{
      // let nX = station.x;
      // let nY = station.y;
      // let size = (
      //              sketch.sin( (nX * -5) + time ) +
      //              sketch.sin( (nY * 5) + time ) +
      //              sketch.cos( (nX * -10) + sketch.HALF_PI ) +
      //              sketch.sin( (nY * 5) + sketch.PI ) +
      //              sketch.sin( (nX * 8) + sketch.PI )
      //            ) * 100;
      // let size = sketch.get(station.x, station.y);
      let flag = (index == stations.length-1);

      station.draw(flag);

      if(flag){
        document.getElementById('name').innerHTML = station.name;
        // sketch.text( station.name, 50, 60, sketch.width*0.7, sketch.height*0.5);
      }
    });
    // sketch.endShape();

    time+=0.1;
  };

};

// append p5 to document window
let myp5 = new p5(s);


setInterval(
  ()=>{
    window.refresh
  }, 700
)
