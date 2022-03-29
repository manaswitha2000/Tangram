var vertexShaderText =
[
  'precision mediump float;',
  '',
  'attribute vec2 vertPosition;',
  'attribute vec3 vertColor;',
  'varying vec3 fragColor;',
  '',
  'void main()',
  '{',
  ' fragColor = vertColor;',
  ' gl_Position = vec4(vertPosition, 0.0, 1.0);',
  '}'
].join('\n');

var fragmentShaderText =
[
  'precision mediump float;',
  '',
  'varying vec3 fragColor;',
  'void main()',
  '{',
  ' gl_FragColor = vec4(fragColor, 1.0);',
  '}'
].join('\n');

var DemoRef = function () {
	console.log('This is working');

	var canvas = document.getElementById('reference-surface');
	var gl = canvas.getContext('webgl');

	if(!gl){
		console.log('WebGL not supported, falling back on experimental-webgl')
		gl = canvas.getContext('experimetal-webgl')
	}

	if(!gl){
		alert(`Your browser does not support WebGL`);
	}
	//The arguments to this clearColor are red blue green in percetage and depth
	gl.clearColor(1, 1, 1, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	//canvas.width = window.ierWidth;
	//canvas.height = window.innerHeight;
	//gl.viewport(0, 0, window.innerWidth, window.innerHeight)

	//gl.clearColor(0.55, 0.85, 0.55, 1.0);
	//gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
		console.error("ERROR compiling vertex shader!", gl.getShaderInfoLog(vertexShader))
		return;
	}
	gl.compileShader(fragmentShader);
	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
		console.error("ERROR compiling fragment shader!", gl.getShaderInfoLog(fragmentShader))
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
		console.error("ERROR linking program!", gl.getProgramInfoLog(program))
		return;
	}
	gl.validateProgram(program);
	if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
		console.error("ERROR validating program!", gl.getProgramInfoLog(program))
		return;
	}

	//
	//Create buffer
	//
	//Arey okka comma kosam intha sodhi chesthava em language ra needhi
  var cx = -0.22, cy = 0.22;
  var l = 1.3;
  var triangleVertices =
	[
    //Orange triangle
		cx+(l/2), cy+(l/2),   1.0, 0.6, 0.0,
		cx, cy, 1.0, 0.6, 0.0,
		cx-(l/2), cy+(l/2),  1.0, 0.6, 0.0,

    //Blue triangle
		cx+(l/2), cy+(l/2),   0.3, 0.6, 1.0,
		cx, cy, 0.3, 0.6, 1.0,
		cx+(l/2), cy-(l/2),  0.3, 0.6, 1.0,

    //Yellow triangle
		cx+(l/4), cy-(l/4),   1.0, 1.0, 0.0,
		cx, cy-(l/2), 1.0, 1.0, 0.0,
		cx+(l/2), cy-(l/2),  1.0, 1.0, 0.0,

    //Red square
		cx+(l/4), cy-(l/4),   1.0, 0.0, 0.0,
		cx, cy-(l/2), 1.0, 0.0, 0.0,
		cx, cy,  1.0, 0.0, 0.0,

		cx-(l/4), cy-(l/4),   1.0, 0.0, 0.0,
		cx, cy-(l/2), 1.0, 0.0, 0.0,
		cx, cy,  1.0, 0.0, 0.0,

    //Blue bright triangle
		cx-(l/4), cy-(l/4),   0.0, 1.0, 1.0,
		cx-(l/4), cy+(l/4), 0.0, 1.0, 1.0,
		cx, cy,  0.0, 1.0, 1.0,

    //Green triangle
		cx-(l/2), cy,   0.0, 1.0, 0.0,
		cx, cy-(l/2), 0.0, 1.0, 0.0,
		cx-(l/2), cy-(l/2),  0.0, 1.0, 0.0,

    //Pink Rhombus
		cx-(l/4), cy+(l/4),   1.0, 0.0, 1.0,
		cx-(l/4), cy-(l/4), 1.0, 0.0, 1.0,
		cx-(l/2), cy,  1.0, 0.0, 1.0,

		cx-(l/4), cy+(l/4),   1.0, 0.0, 1.0,
		cx-(l/2), cy+(l/2), 1.0, 0.0, 1.0,
		cx-(l/2), cy,  1.0, 0.0, 1.0

	];

	var triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		2, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);
	gl.vertexAttribPointer(
		colorAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);
	//Main render loop
	gl.useProgram(program);
	//takes actively bound buffers
	gl.drawArrays(gl.TRIANGLES, 0, 27);

	//gl2.clearColor(0.55, 0.85, 0.55, 1.0);
	//gl2.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


};