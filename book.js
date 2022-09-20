function makeBook(params){

  //var params = {thickness: 15, height:32, width: 24, color: 0xeb1350}

  //container, as always; center will be center of rectanular part
  var book = new THREE.Object3D();

  //spine of book
  //width (spineX) is a relatively small number
  var spineX = params.thickness/8;

  var spine = new THREE.Mesh(
    new THREE.BoxGeometry(spineX, params.height, params.thickness),
    new THREE.MeshPhongMaterial({color: params.color, shininess: 15}));
  spine.position.x = spineX/2;

  book.add(spine);

  //little indent parts---------------------------------------------------
  var indentLen = params.width/20;

  function makeIndent() {
    return new THREE.Mesh(
      new THREE.BoxGeometry(indentLen, params.height, params.thickness/20),
      new THREE.MeshPhongMaterial({color: params.color, shininess: 15}))
  }

  var indentFL = makeIndent();
  indentFL.position.set(indentLen/2+spineX/2, 0, params.thickness/2*.9);
  indentFL.rotation.y = Math.PI/6;
  book.add(indentFL);

  var indentFR = makeIndent();
  indentFR.position.set(indentLen+spineX/2, 0, params.thickness/2*.9);
  indentFR.rotation.y = -Math.PI/6;
  //book.add(indentFR);

  var indentBL = makeIndent();
  indentBL.position.set(indentLen/2+spineX/2, 0, -params.thickness/2*.9);
  indentBL.rotation.y = -Math.PI/6;
  book.add(indentBL);

  var indentBR = makeIndent();
  indentBR.position.set(indentLen+spineX/2, 0, -params.thickness/2*.9);
  indentBR.rotation.y = Math.PI/6;
  book.add(indentBR);

  //covers----------------------------------------------------------------
  function newCover() {
    var cover = new THREE.Mesh(
    new THREE.BoxGeometry(params.width, params.height, spineX),
    new THREE.MeshPhongMaterial({color: params.color, shininess: 5}));

    cover.position.x = params.width/2+indentLen*Math.cos(Math.PI/6)/2;
    return cover;
  }

  var coverFront = new newCover();
  coverFront.position.z = params.thickness*.3+spineX/1.5;
  book.add(coverFront);

  var coverBack = new newCover();
  coverBack.position.z = -(params.thickness*.3+spineX/1.5);
  book.add(coverBack);

  //accents on spine
  function makeAccent() {return new THREE.Mesh(
    new THREE.PlaneGeometry(params.thickness*.9, params.height/16),
    new THREE.MeshPhongMaterial({color: params.accent, shininess: 5,
      side: THREE.DoubleSide}));}

  var accent1 = makeAccent();
  accent1.rotation.y = Math.PI/2;
  accent1.position.set(-.1, params.height*2/6, 0);
  book.add(accent1);

  var accent2 = makeAccent();
  accent2.rotation.y = Math.PI/2;
  accent2.position.set(-.1, params.height*1/6, 0);
  book.add(accent2);

  var accent3 = makeAccent();
  accent3.rotation.y = Math.PI/2;
  accent3.position.set(-.1, -params.height*2/6, 0);
  book.add(accent3);

  //pages-----------------------------------------------------------------
  var pages = new THREE.Mesh(
    new THREE.BoxGeometry(params.width, params.height, params.thickness*.6),
    new THREE.MeshPhongMaterial({color: 0xfce5b8, shininess: 5})) //off-white
  pages.position.x = (params.width+spineX)/2;

  book.add(pages);

  return book;
}
