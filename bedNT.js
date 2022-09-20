//PENULTIMATE JS FILE THANK GOODNESS
//bed is long on x axis, with pillow farther back,
// and center is lower right corner of pillow side

function makeBed(params){

  var width = params.width; var height = params.height; var boardDepth = 3;
  var depth = params.depth;

  var legWth = width/20;

  //use same wood tex as bookcase for bedpost
  var bed = new THREE.Object3D();

  var boardMat = new THREE.MeshPhongMaterial({color: params.woodColor});

  var boardHt = height*5/3;
  var backBoard = new THREE.Mesh(new THREE.BoxGeometry(width, boardHt, boardDepth),
    boardMat);
  backBoard.position.set(-width/2, boardHt/2+legWth, boardDepth/2);
  bed.add(backBoard);

  var mattressHt = height/3; var mattressWth = width*.9;
  var mattressDpth = depth*.95 - boardDepth;
  var mattress =  new THREE.Mesh(
    new THREE.BoxGeometry(mattressWth, mattressHt, mattressDpth),
    new THREE.MeshPhongMaterial({color: 0xffffff}));
  mattress.position.set(-width/2, height-mattressHt/2, mattressDpth/2+boardDepth);
  bed.add(mattress);

  //legs of the bed? Is that what they're called?
  //var legWth = width/20;
  var legDepth = legWth*2;
  function makeLeg(){
    return new THREE.Mesh(new THREE.BoxGeometry(legWth, legWth, legDepth),
      boardMat);
  }
  var legLB = makeLeg(); //left back
  legLB.position.set(-width+legWth/2, legWth/2, legDepth/2);
  bed.add(legLB);

  var legRB = makeLeg(); //right back
  legRB.position.set(-legWth/2, legWth/2, legDepth/2);
  bed.add(legRB);

  var legLF = makeLeg(); //right back
  legLF.position.set(-width+legWth/2, legWth/2, depth-legDepth/2);
  bed.add(legLF);

  var legRF = makeLeg(); //right back
  legRF.position.set(-legWth/2, legWth/2, depth-legDepth/2);
  bed.add(legRF);

  //base
  var baseHt = height - mattressHt - legWth;
  var base = new THREE.Mesh(
    new THREE.BoxGeometry(width, baseHt, depth-boardDepth), boardMat);
  base.position.set(-width/2, baseHt/2+legWth, depth/2+boardDepth/2);
  bed.add(base);

  //blankets-----------------------------------------------------------
  //I tried everything to make the curved blankets Bezier curves to look
  //right to no success :(
  /*
  var topToBottom = [
      [ [0,3,-2],  [2,3,-2],  [4,3,-2],  [6, 3, -2] ],
      [ [0,3,0], [2,3,0],  [4,3,0],  [6, 3, 0] ],
      [ [0,2,0], [2,2,0],  [4,2,0],  [6, 2, 0] ],
      [ [0,0,0],  [2,0,0], [4,0,0], [6, 0, 0] ],
  ];

  var blanketHt = 3;
  topToBottom.reverse();

  function makeBlanket(){
    var blanket = new THREE.Mesh(
      new THREE.BezierSurfaceGeometry( topToBottom, 10, 10 ),
      new THREE.MeshPhongMaterial({color: bedParams.blanketColor, shininess: 5}));
    blanket.scale.set(7, 1, 12.8);
    return blanket;
  }

  var blanketRight = makeBlanket();
  blanketRight.rotation.y = Math.PI/2;
  blanketRight.position.set(0, bedParams.height, bedParams.height);
  bed.add(blanketRight);

  var blanketLeft = makeBlanket();
  blanketLeft.rotation.y = Math.PI*3/2;
  blanketLeft.position.set(-bedParams.width, bedParams.height,bedParams.height);
  bed.add(blanketLeft);
  */
  //trying to get rid of extra distance between blanket pieces
  var blanketOverlap = .2;

  var blanketMesh = new THREE.MeshPhongMaterial({color: params.blanketColor});

  var blanketDepth = depth*.7;
  var blanketA = new THREE.Mesh(
    new THREE.PlaneGeometry(mattressWth+blanketOverlap, blanketDepth+blanketOverlap),
    blanketMesh);
  blanketA.rotation.x = -Math.PI/2;
  blanketA.position.set(-width/2, height+.01, (mattress.position.z+blanketDepth)/2);
  bed.add(blanketA);

  var blanketL = new THREE.Mesh(
    new THREE.PlaneGeometry(mattressHt, blanketDepth+blanketOverlap),
    blanketMesh);
  blanketL.rotation.set(-Math.PI/2, -Math.PI/2, 0);
  blanketL.position.set((width+mattressWth)/-2-.1,
    mattress.position.y+blanketOverlap/2, (mattress.position.z+blanketDepth)/2);
  bed.add(blanketL);

  var blanketR = new THREE.Mesh(
    new THREE.PlaneGeometry(mattressHt, blanketDepth+blanketOverlap),
    blanketMesh);
  blanketR.rotation.set(Math.PI/2, Math.PI/2, 0);
  blanketR.position.set((width-mattressWth)/-2.+.1,
    mattress.position.y+blanketOverlap/2, (mattress.position.z+blanketDepth)/2);
  bed.add(blanketR);

  var blanketB = new THREE.Mesh(
    new THREE.PlaneGeometry(mattressWth+blanketOverlap, mattressHt+blanketOverlap),
    blanketMesh);
  blanketB.position.set(-width/2, mattress.position.y, (mattress.position.z+mattressDpth/2)+.1);
  bed.add(blanketB);

  //pillow---------------------------------------------------
  var pillowRad = width/5;
  function makePillow(){
    var pillow = new THREE.Mesh(
      new THREE.SphereGeometry(pillowRad, 20, 20),
      new THREE.MeshLambertMaterial({color: params.pillowColor}));
    pillow.scale.set(1, .4, .7);
    return pillow;
  }

  var pillowHt = pillowRad/2;

  var rightPillow = makePillow();
  rightPillow.position.set(-width/2+pillowRad, height+pillowHt,
    boardDepth+pillowRad);
  bed.add(rightPillow);

  var leftPillow = makePillow();
  leftPillow.rotation.z = Math.PI/6;
  leftPillow.position.set(-width/2-pillowRad*.6, rightPillow.position.y,
    rightPillow.position.z);
  bed.add(leftPillow);

  return bed;
}
