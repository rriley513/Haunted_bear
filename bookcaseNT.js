/*A Three.js model of a bookcase. Copyright (©) 2019 by RRiley2,
all rights reserved.*/


//origin will be bottom left back corner of bookcase
//bookcase will be made of several different box geometries

function makeBookcase(params){

  //wood texture--base color is white
  var woodMat = new THREE.MeshPhongMaterial( {color: 0xd18e75} );

  //container for bookshelf parts
  var bookcase = new THREE.Object3D();

  //first, make back board
  //note: THREE.BoxGeometry is params.width, params.height, params.depth
  var backboardGeom = new THREE.BoxGeometry(params.width+params.boardWidth,
    params.height, params.boardWidth);
  var backboard = new THREE.Mesh(backboardGeom, woodMat);
  //to prevent overlap glitches, push backboard behind shelves
  //note that z coord adjustment is not the same for all items, which is
  //why we don't adjust z coord of entire object
  backboard.position.z = -params.boardWidth/2;
  bookcase.add(backboard);

  //make sides of bookcase
  function makeSide(xOffset){
    var sideGeom = new THREE.BoxGeometry(params.boardWidth, params.height,
      params.depth);
    var side = new THREE.Mesh(sideGeom, woodMat);
    //place on sides of bookshelf. z coord keeps center at back of bookshelf
    side.position.set(xOffset, 0, params.depth/2);
    return side;
  }

  //names are given LR from persepective of viewer
  var sideOffset = params.width/2;
  var sideLeft = makeSide(-sideOffset);
  var sideRight = makeSide(sideOffset);
  bookcase.add(sideLeft); bookcase.add(sideRight);

  //shelves!
  function makeShelf(){
    var shelfGeom = new THREE.BoxGeometry(params.width-params.boardWidth,
      params.boardWidth, params.depth);
      //params.width is slightly less than full to fit shelves inside
    var shelf = new THREE.Mesh(shelfGeom, woodMat);
    //as before, z coord keeps center at back of bookshelf
    shelf.position.z = params.depth/2;
    return shelf;
  }

  var shelfBottom = makeShelf(); shelfBottom.position.y=
    (-params.height + params.boardWidth)/2;
  var shelfBottomHalf = makeShelf(); shelfBottomHalf.position.y = -params.height/4;
  var shelfMiddle = makeShelf(); //middle shelf is in middle :)
  var shelfUpperHalf = makeShelf(); shelfUpperHalf.position.y = params.height/4;
  bookcase.add(shelfBottom); bookcase.add(shelfBottomHalf);
  bookcase.add(shelfMiddle); bookcase.add(shelfUpperHalf);

    return bookcase;
  }

// ================================================================
