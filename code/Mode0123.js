/*==========================Shaders=========================*/
var vertCode = 'attribute vec3 position;'+
  'uniform mat4 Pmatrix;'+
  'uniform mat4 Vmatrix;'+
  'uniform mat4 Mmatrix;'+
  'uniform mat4 Rmatrix;'+
  'attribute vec3 color;'+//the color of the point
  'varying vec3 vColor;'+
  'uniform vec4 translation;'+
  'uniform mat4 u_xformMatrix;'+

  'void main(void) { '+//pre-built function
  'gl_Position = translation + Pmatrix * Vmatrix * Mmatrix * Rmatrix * u_xformMatrix * vec4(position, 1.0);'+
  'vColor = color;'+
  '}';

var fragCode = 'precision mediump float;'+
  'varying vec3 vColor;'+
  'void main(void) {'+
  'gl_FragColor = vec4(vColor, 1.);'+
  '}';

var times = 0;
var timesold = 0;

var Demo0123 = function() {

         timesold = times;

         console.log('This is working beautifully.');
         var canvas = document.getElementById('drawing-surface');
         var gl = canvas.getContext('webgl');

         //var x = 0.0;
         //var y = 0.0;
         var l = 2.9;

         var x = [];
         var y = [];

         for(let i = 0; i < 7;i++) {
         x[i] = (10 - Math.floor(Math.random() * 21))/10.0;
         y[i] = (10 - Math.floor(Math.random() * 21))/10.0;
         //x[i] = 0;
         //y[i] = 0;
         }

         var cx = [];
         var cy = [];
         //heights of the medians of the triangles
         var h = [l/2, l/2, l/4, l/4, l/4, l/4, l/4, l/4, l/4, l/4];

         //Centroids of all triangles
         cx[0] = (x[0]+(l/2)+x[0]+x[0]-(l/2))/3;
         cy[0] = (y[0]+(l/2)+y[0]+y[0]+(l/2))/3;

         cx[1] = (x[1]+(l/2)+x[1]+x[1]+(l/2))/3;
         cy[1] = (y[1]+(l/2)+y[1]+y[1]-(l/2))/3;

         cx[2] = (x[2]+(l/4)+x[2]+x[2]+(l/2))/3;
         cy[2] = (y[2]-(l/4)+y[2]-(l/2)+y[2]-(l/2))/3;

         cx[3] = (x[3]+(l/4)+x[3]+x[3])/3;
         cy[3] = (y[3]-(l/4)+y[3]-(l/2)+y[3])/3;
         cx[4] = (x[3]-(l/4)+x[3]+x[3])/3;
         cy[4] = (y[3]-(l/4)+y[3]-(l/2)+y[3])/3;

         cx[5] = (x[4]-(l/4)+x[4]-(l/4)+x[4])/3;
         cy[5] = (y[4]-(l/4)+y[4]+(l/4)+y[4])/3;

         cx[6] = (x[5]-(l/4)+x[5]+x[5]-(l/2))/3;
         cy[6] = (y[5]-(l/4)+y[5]-(l/2)+y[5]-(l/2))/3;
         cx[7] = (x[5]-(l/2)+x[5]-(l/4)+x[5]-(l/2))/3;
         cy[7] = (y[5]-(l/4)+y[5]-(l/2)+y[5])/3;

         cx[8] = (x[6]-(l/4)+x[6]-(l/4)+x[6]-(l/2))/3;
         cy[8] = (y[6]+(l/4)+y[6]-(l/4)+y[6])/3;
         cx[9] = (x[6]-(l/4)+x[6]-(l/2)+x[6]-(l/2))/3;
         cy[9] = (y[6]+(l/4)+y[6]+(l/2)+y[6])/3;

         var vertices =[
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

         var cx_rot = [];
         var cy_rot = [];

         cx_rot.push(...cx);
         cy_rot.push(...cy);

         var colors = [
            1.0, 0.6, 0.0,  1.0, 0.6, 0.0,  1.0, 0.6, 0.1,
            0.3, 0.6, 1.0,  0.3, 0.6, 1.0,  0.3, 0.6, 1.0,
            1.0, 1.0, 0.0,  1.0, 1.0, 0.0,  1.0, 1.0, 0.0,
            1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,
            0.0, 1.0, 1.0,  0.0, 1.0, 1.0,  0.0, 1.0, 1.0,
            0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,
            1.0, 0.0, 1.0,  1.0, 0.0, 1.0,  1.0, 0.0, 1.0,
            1.0, 0.0, 1.0,  1.0, 0.0, 1.0,  1.0, 0.0, 1.0
         ];
         var indices =
            [0, 1, 2,
            3, 4, 5,
            6, 7, 8,
            9, 10, 11,
            12, 13, 14,
            15, 16, 17,
            18 ,19, 20,
            21, 22, 23,
            24, 25, 26,
            27, 28, 29
           ];

         //Create and store data into vertex buffer
         var vertex_buffer = gl.createBuffer ();
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

         //Create and store data into color buffer
         var color_buffer = gl.createBuffer ();
         gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

         //Create and store data into index buffer
         var index_buffer = gl.createBuffer ();
         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

         var vertShader = gl.createShader(gl.VERTEX_SHADER);
         gl.shaderSource(vertShader, vertCode);
         gl.compileShader(vertShader);

         var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
         gl.shaderSource(fragShader, fragCode);
         gl.compileShader(fragShader);

         var shaderProgram = gl.createProgram();
         gl.attachShader(shaderProgram, vertShader);
         gl.attachShader(shaderProgram, fragShader);
         gl.linkProgram(shaderProgram);

         /*===========associating attributes to vertex shader ============*/

         var Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
         var Vmatrix = gl.getUniformLocation(shaderProgram, "Vmatrix");
         var Mmatrix = gl.getUniformLocation(shaderProgram, "Mmatrix");
         var Rmatrix = gl.getUniformLocation(shaderProgram, "Rmatrix");
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

         var position = gl.getAttribLocation(shaderProgram, "position");
         gl.vertexAttribPointer(position, 3, gl.FLOAT, false,0,0) ; //position
         gl.enableVertexAttribArray(position);
         gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);

         var color = gl.getAttribLocation(shaderProgram, "color");
         gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ; //color
         gl.enableVertexAttribArray(color);
         gl.useProgram(shaderProgram);

         /*========================= MATRIX ========================= */
         var proj_matrix = get_projection(40, canvas.width/canvas.height, 1, 100);
         var mov_matrix = [[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],
                           [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],
                           [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],
                           [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],
                           [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],
                           [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],
                           [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],
                           [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],
                           [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],
                           [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]];
         var view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
         var rot_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

         //translating z
         view_matrix[14] = view_matrix[14]-3; //zoom

         var time_old = 0;
         var mode = 0;
         //Rotation varaibles
         var rotation = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
         var total_rotation = 0;
         //Traslation varaibles
         var Tx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
         var Ty = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
         var Tz = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
         //Scaling varaibles
         var Sx = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
         var Sy = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
         var Sz = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
         var selected = -1;

         //Checking the keyborad keys up, down, right, left arrow keys for translation.
         //For rotation key '(' for clockwise and ')' for anti-clockwise rotation.

         document.body.addEventListener("keydown", (event) => {
         if(event.keyCode === 77){
            mode++;
            times++;
         }
         /*===========MODE 1==============*/
         if(mode%4 === 1)
         {
         if (event.keyCode === 57 ) {
             rotation[selected] = rotation[selected] - 1/20.0;
         }
         else if (event.keyCode === 48 ) {
             rotation[selected] = rotation[selected] + 1/20.0;
         }
         else if (event.keyCode === 37 ) {
            Tx[selected] =  Tx[selected] - 1/20.0;
         }
         else if (event.keyCode === 39 ) {
            Tx[selected] =  Tx[selected] + 1/20.0;
         }
         else if (event.keyCode === 38 ) {
            Ty[selected] =  Ty[selected] + 1/20.0;
         }
         else if (event.keyCode === 40 ) {
            Ty[selected] =  Ty[selected] - 1/20.0;
         }
         else if (event.keyCode === 187 ) {
            Sx[selected] =  Sx[selected] + 0.05;
            Sy[selected] =  Sy[selected] + 0.05;
            Sz[selected] =  Sz[selected] + 0.05;
         }
         else if (event.keyCode === 189 ) {
            Sx[selected] =  Sx[selected] - 0.05;
            Sy[selected] =  Sy[selected] - 0.05;
            Sz[selected] =  Sz[selected] - 0.05;
         }
         //For the multi triagular objects
         if(selected===3)
         {
           Tx[4] = Tx[3];
           Ty[4] = Ty[3];
           rotation[4] = rotation[3];
           Sx[4] = Sx[3];
           Sy[4] = Sy[3];
         }
         else if(selected===6)
         {
           Tx[7] = Tx[6];
           Ty[7] = Ty[6];
           rotation[7] = rotation[6];
           Sx[7] = Sx[6];
           Sy[7] = Sy[6];
         }
         else if(selected===8)
         {
           Tx[9] = Tx[8];
           Ty[9] = Ty[8];
           rotation[9] = rotation[8];
           Sx[9] = Sx[8];
           Sy[9] = Sy[8];
         }
         }
         /*===========MODE 2==============*/
         else if(mode%4 === 2)
         {
           //arbitrary min and max values
           var minx = 200;
           var maxx = -200;
           var miny = 200;
           var maxy = -200;
           var scale = 0;
           xcentre = 0;
           ycentre = 0;
           for(var i = 0;i<10;i++) {
           xcentre = xcentre + cx[i];
           ycentre = ycentre + cy[i];
           }
           xcentre = xcentre/10.0;
           ycentre = ycentre/10.0;

           for(var i = 0;i<10;i++){
             if(cx[i] < minx)
                minx = cx[i];
             if(cx[i] > maxx)
                maxx = cx[i];
             if(cy[i] < miny)
                miny = cy[i];
             if(cy[i] > maxy)
                maxy = cy[i];
           }
           //console.log("xcentre :"+xcentre);
           //console.log("ycentre :"+ycentre);
           if (event.keyCode === 57 ) {
              //for(var i = 0;i<10;i++)
              //rotation[i] =  rotation[i] - 1/20.0;
              total_rotation = total_rotation - 1/20.0;
              rot_matrix[8] = 2;
              rot_matrix[9] = 2;

           }
           else if (event.keyCode === 48 ) {
              //for(var i = 0;i<10;i++)
              //rotation[i] =  rotation[i] + 1/20.0;
              total_rotation = total_rotation + 1/20.0;
              rot_matrix[8] = 2;
              rot_matrix[9] = 2;

           }
           else if (event.keyCode === 37 ) {
              for(var i = 0;i<10;i++){
              if(minx>-2.4+scale)
              Tx[i] =  Tx[i] - 1/20.0;
              }
           }
           else if (event.keyCode === 39 ) {
              for(var i = 0;i<10;i++){
              if(maxx<2.4-scale)
              Tx[i] =  Tx[i] + 1/20.0;
              }
           }
           else if (event.keyCode === 38 ) {
              for(var i = 0;i<10;i++){
              if(maxy<2.4-scale)
              Ty[i] =  Ty[i] + 1/20.0;
              }
           }
           else if (event.keyCode === 40 ) {
              for(var i = 0;i<10;i++){
              if(miny>-2.4+scale)
              Ty[i] =  Ty[i] - 1/20.0;
              }
           }
           else if (event.keyCode === 187 ) {
              view_matrix[14] = view_matrix[14]-0.1*view_matrix[14]; //zoom
              scale = scale - 0.25;
           }
           else if (event.keyCode === 189 ) {
              view_matrix[14] = view_matrix[14]+0.1*view_matrix[14]; //zoom
              scale = scale + 0.25;
           }
         }

         Updatingcentroids(cx, cy, x, y, l, Tx, Ty);

       });

      function printMousePos(event) {

           var pos = {
             x:canvas.offsetLeft,
             y:canvas.offsetTop
           }

           //coverting pixel to the cartesian system.
           var x = (-250 + (event.clientX - pos.x))/110;
           var y = (250 - (event.clientY - pos.y))/110;

           var orange = ((x-cx[0])*(x-cx[0])) + ((y-cy[0])*(y-cy[0]));
           var blue = ((x-cx[1])*(x-cx[1])) + ((y-cy[1])*(y-cy[1]));
           var yellow = ((x-cx[2])*(x-cx[2])) + ((y-cy[2])*(y-cy[2]));
           var red = ((x-((cx[3]+cx[4])/2)))*((x-((cx[3]+cx[4])/2)))+ ((y-((cy[3]+cy[4])/2)))*((y-((cy[3]+cy[4])/2)));
           var bblue = ((x-cx[5])*(x-cx[5])) + ((y-cy[5])*(y-cy[5]));
           var green = ((x-((cx[6]+cx[7])/2)))*((x-((cx[6]+cx[7])/2)))+ ((y-((cy[6]+cy[7])/2)))*((y-((cy[6]+cy[7])/2)));
           var pink = ((x-((cx[8]+cx[9])/2)))*((x-((cx[8]+cx[9])/2)))+ ((y-((cy[8]+cy[9])/2)))*((y-((cy[8]+cy[9])/2)));

           let objects = [orange, blue, yellow, red, bblue, green, pink]
           var min = Math.min.apply(null, objects);

           console.log("The object selected is :")
           switch(min){
             case orange:
                console.log("orange");
                selected = 0;
                break;
             case blue:
                console.log("blue");
                selected = 1;
                break;
            case yellow:
                console.log("yellow");
                selected = 2;
                break;
            case red:
                console.log("red")
                selected = 3;
                break;
            case bblue:
                console.log("bblue")
                selected = 5;
                break;
            case green:
                console.log("green")
                selected = 6;
                break;
            case pink:
                console.log("pink")
                selected = 8;
                break;
           }
         }

         document.addEventListener("click", printMousePos);

         /*=================Drawing===========================*/
         //The drawing function
         function draw(dt,n) {

           var xcentre = cx_rot[n];
           var ycentre = cy_rot[n];

           if(n===3||n===4){
               xcentre = (cx_rot[3]+cx_rot[4])/2;
               ycentre = (cy_rot[3]+cy_rot[4])/2;
           }
           else if(n===6||n===7){
               xcentre = (cx_rot[6]+cx_rot[7])/2;
               ycentre = (cy_rot[6]+cy_rot[7])/2;
           }
           else if(n===8||n===9){
               xcentre = (cx_rot[8]+cx_rot[9])/2;
               ycentre = (cy_rot[8]+cy_rot[9])/2;
           }

           if(mode%4===1)
             rotateZ(mov_matrix[n], rotation[n], xcentre, ycentre);
           else(mode%4===2)
           {
             rotateZ(rot_matrix, total_rotation, 0.0, 0.0);
           }

           gl.useProgram(shaderProgram)
           gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
           gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
           gl.uniformMatrix4fv(Mmatrix, false, mov_matrix[n]);
           gl.uniformMatrix4fv(Rmatrix, false, rot_matrix);
           gl.uniform4f(translation, Tx[n], Ty[n], Tz[n], 0.0);

           /*===================scaling==========================*/
           var xformMatrix = new Float32Array([
              Sx[n],   0.0,  0.0,  0.0,
              0.0,  Sy[n],   0.0,  0.0,
              0.0,  0.0,  Sz[n],   0.0,
              0.0,  0.0,  0.0,  1.0
           ]);
           var u_xformMatrix = gl.getUniformLocation(shaderProgram, 'u_xformMatrix');
           gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

           gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
           //draw()
           gl.drawArrays(gl.TRIANGLES, 3*n, 3);
         }


         var translation = gl.getUniformLocation(shaderProgram, 'translation');

         //Main animate loop
         var animate = function(time) {

            var dt = time-time_old;
            time_old = time;

            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.clearColor(1.0, 1.0, 1.0, 1.0);
            gl.clearDepth(1.0);
            gl.viewport(0.0, 0.0, canvas.width, canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            if(mode%4!=3)
            {
            for(var i=0;i<10;i++)
              draw(dt,i);
            }

            if((times-timesold)%4===0&&mode%4===0&&times!=timesold)
              Demo0123();
            //gl.drawElements(gl.TRIANGLES, 3 , gl.UNSIGNED_SHORT, 0);
            //gl.drawElements(gl.TRIANGLES, 3 , gl.UNSIGNED_SHORT, 3);
            window.requestAnimationFrame(animate);
         }
         animate(0);
}
