// All functions are written in this file
 /*========================= MATRIX ========================= */

 //Projection matrix calculation
function get_projection(angle, a, zMin, zMax) {
   var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
   return [
      0.5/ang, 0 , 0, 0,
      0, 0.5*a/ang, 0, 0,
      0, 0, -(zMax+zMin)/(zMax-zMin), -1,
      0, 0, (-2*zMax*zMin)/(zMax-zMin), 0
   ];
}

//rotating a matrix about a fixed point x and y.
 /*=======================rotation========================*/
function rotateZ(m, angle, x, y) {
   //console.log(angle);
   var c = Math.cos(angle);
   var s = Math.sin(angle);
   //Width and Height of canvas are 3.0 and 3.0
   //rotating figures about their respective Centroids

   m[0] = c;
   m[4] = -s;
   m[12] = (x) - (x)*c + (y)*s;
   m[1] = s;
   m[5] = c;
   m[13] = (y) - (x)*s - (y)*c;

}

function Updatingcentroids(cx, cy, x, y , l, Tx, Ty)
{
  //Updating the Centroids
  //Centroids of all trianngles
  cx[0] = (x[0]+(l/2)+x[0]+x[0]-(l/2))/3 + Tx[0];
  cy[0] = (y[0]+(l/2)+y[0]+y[0]+(l/2))/3 + Ty[0];

  cx[1] = (x[1]+(l/2)+x[1]+x[1]+(l/2))/3 + Tx[1];
  cy[1] = (y[1]+(l/2)+y[1]+y[1]-(l/2))/3 + Ty[1];

  cx[2] = (x[2]+(l/4)+x[2]+x[2]+(l/2))/3 + Tx[2];
  cy[2] = (y[2]-(l/4)+y[2]-(l/2)+y[2]-(l/2))/3 + Ty[2];

  cx[3] = (x[3]+(l/4)+x[3]+x[3])/3 + Tx[3];
  cy[3] = (y[3]-(l/4)+y[3]-(l/2)+y[3])/3 + Ty[3];
  cx[4] = (x[3]-(l/4)+x[3]+x[3])/3 + Tx[4];
  cy[4] = (y[3]-(l/4)+y[3]-(l/2)+y[3])/3 + Ty[4];

  cx[5] = (x[4]-(l/4)+x[4]-(l/4)+x[4])/3 + Tx[5];
  cy[5] = (y[4]-(l/4)+y[4]+(l/4)+y[4])/3 + Ty[5];

  cx[6] = (x[5]-(l/4)+x[5]+x[5]-(l/2))/3 + Tx[6];
  cy[6] = (y[5]-(l/4)+y[5]-(l/2)+y[5]-(l/2))/3 + Ty[6];
  cx[7] = (x[5]-(l/2)+x[5]-(l/4)+x[5]-(l/2))/3 + Tx[7];
  cy[7] = (y[5]-(l/4)+y[5]-(l/2)+y[5])/3 + Ty[7];

  cx[8] = (x[6]-(l/4)+x[6]-(l/4)+x[6]-(l/2))/3 + Tx[8];
  cy[8] = (y[6]+(l/4)+y[6]-(l/4)+y[6])/3 + Ty[8];
  cx[9] = (x[6]-(l/4)+x[6]-(l/2)+x[6]-(l/2))/3 + Tx[9];
  cy[9] = (y[6]+(l/4)+y[6]+(l/2)+y[6])/3 + Ty[9];

  /*h = [l/2, l/2, l/4, l/4, l/4, l/4, l/4, l/4, l/4, l/4];
  vertices =[
       //Orange triangle
       cx[0]+h[0], cy[0]+h[0]/3, 0,
       cx[0], cy[0]-(2*h[0])/3, 0,
       cx[0]-h[0], cy[0]+h[0]/3, 0,

       //Blue triangle
       cx[1]+h[1]/3, cy[1]+h[1], 0,
       cx[1]-(2*h[1])/3, cy[1], 0,
       cx[1]+h[1]/3, cy[1]-h[1], 0,

       //Yellow triangle
       cx[2]+h[2], cy[2]-h[2]/3, 0,
       cx[2], cy[2]+(2*h[2])/3, 0,
       cx[2]-h[2], cy[2]-h[2]/3, 0,

       //Red square
       cx[3]-h[3]/3, cy[3]+h[3], 0,
       cx[3]+(2*h[3])/3, cy[3], 0,
       cx[3]-h[3]/3, cy[3]-h[3], 0,
       cx[4]+h[4]/3, cy[4]+h[4], 0,
       cx[4]-(2*h[4])/3, cy[4], 0,
       cx[4]+h[4]/3, cy[4]-h[4], 0,

       //Blue bright triangle
       cx[5]-h[5]/3, cy[5]+h[5], 0,
       cx[5]+(2*h[5])/3, cy[5], 0,
       cx[5]-h[5]/3, cy[5]-h[5], 0,

       //Green triangle
       cx[6]+h[6], cy[6]-h[6]/3, 0,
       cx[6], cy[6]+(2*h[6])/3, 0,
       cx[6]-h[6], cy[6]-h[6]/3, 0,
       cx[7]-h[7]/3, cy[7]+h[7], 0,
       cx[7]+(2*h[7])/3, cy[7], 0,
       cx[7]-h[7]/3, cy[7]-h[7], 0,

       //Pink Rhombus
       cx[8]+h[8]/3, cy[8]+h[8], 0,
       cx[8]-(2*h[8])/3, cy[8], 0,
       cx[8]+h[8]/3, cy[8]-h[8], 0,
       cx[9]-h[9]/3, cy[9]+h[9], 0,
       cx[9]+(2*h[9])/3, cy[9], 0,
       cx[9]-h[9]/3, cy[9]-h[9], 0,

  ];

  //Create and store data into vertex buffer
  var vertex_buffer = gl.createBuffer ();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertCode);
  gl.compileShader(vertShader);

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);*/

}
