function makeWindow(params){

  //center is normal center, on back (outside-facing) side of window
  //box geometries :) --width, height, depth
  var width = params.width; //easier for typing
  var height = params.height;
  var boardWidth = height/30;
  var depth = 2;

  //window is a reserved word
  var myWindow = new THREE.Object3D();

//originally was going to texture map wood onto it, but looks better without
  var woodMat = new THREE.MeshPhongMaterial({color: params.color, shininess: 50});

//the frame of the window
  var topPart = new THREE.Mesh(new THREE.BoxGeometry(width, boardWidth, depth),
    woodMat);
    //note: originally center was exact center of window, but changed to make
    //math easier in placement in final scene.
  topPart.position.y = height/2;
  myWindow.add(topPart);

  var bottomPart = new THREE.Mesh(new THREE.BoxGeometry(width, boardWidth, depth),
    woodMat);
  bottomPart.position.y = -height/2;
  myWindow.add(bottomPart);

  var sideLeft = new THREE.Mesh(new THREE.BoxGeometry(boardWidth, height, depth),
    woodMat);
  sideLeft.position.x = -width/2;
  myWindow.add(sideLeft);

  var sideRight = new THREE.Mesh(new THREE.BoxGeometry(boardWidth, height, depth),
    woodMat);
  sideRight.position.x = width/2;
  myWindow.add(sideRight);

  var middleHor = new THREE.Mesh(new THREE.BoxGeometry(width, boardWidth, depth),
    woodMat);
  myWindow.add(middleHor);

  var middleVer = new THREE.Mesh(new THREE.BoxGeometry(boardWidth, height, depth),
    woodMat);
  myWindow.add(middleVer);

//drapes------------------------------------------------
if (params.drapes){

  var drapeWidth = width/8;

//bezier curves! :)
  var topToBottom = [
      [ [0,drapeWidth,0],  [height/3,drapeWidth,0],
            [height*2/3,drapeWidth,0],  [height*.95,drapeWidth,0] ],
      [ [0,drapeWidth*2./3,depth*2], [height/20,drapeWidth*2./3,depth*2],
            [height*2/3,drapeWidth*2./3,depth*2],  [height*.95,drapeWidth*2./3,0] ],
      [ [0,drapeWidth/3,depth*2], [height/20,drapeWidth/3,depth*2],
            [height*2/3,drapeWidth/3,depth*2],  [height*.95,drapeWidth/3,0] ],
      [ [0,0,0],  [height/3,0,0],
            [height*2/3,0,0], [height*.95,0,0] ],
  ];

topToBottom.reverse();

  function makeOneDrape(){
    var drape = new THREE.Mesh(
      new THREE.BezierSurfaceGeometry( topToBottom, 10, 10 ),
      new THREE.MeshPhongMaterial({color: params.drapeColor, transparent: true,
        opacity: .9}));
    drape.rotation.z = Math.PI/2;
    //center of drape is bottom left corner, math is easier to leave coords same
    //and translate as necessary
    drape.position.set(drapeWidth/2, (-height*.9 + boardWidth)/2, depth/2);
    //drape.scale.set(5, 20, 1);
    return drape;
  }

  for (var i=0; i<6; i++){
    var d = makeOneDrape();
    if (i<3) //left side
      d.position.x = -width/2 + drapeWidth*(i+1);
    else //i>=3 right side
      d.position.x = width/2 - drapeWidth*(i-3);
    myWindow.add(d);
  }

}

//background view------------------------------------------------------
//again, screen is a reserved word (but /view/ isn't?)
var glass = new THREE.Mesh(new THREE.PlaneGeometry(width, height),//width, height
  new THREE.MeshPhongMaterial(
    {color: 0xffffff, transparent: true, opacity: .1, shininess: 100}));
glass.position.z = -depth/2;

//originaly view was going to be texture-mapped to have a night sky, but
//all of the textures I tried were too dark to be visible
//(and lighter ones weren't night)
var view = new THREE.Mesh(new THREE.PlaneGeometry(width, height), //width, height
  new THREE.MeshPhongMaterial ({color: params.viewColor}));
view.position.z = -depth/2-.01;

myWindow.add(glass); myWindow.add(view);

var myWindow2 = new THREE.Object3D();
//fastest way to fix center. assures center is on the outdoor-facing side of window
myWindow.position.z = depth/2 + .01;
myWindow2.add(myWindow);

  return myWindow2;
}
