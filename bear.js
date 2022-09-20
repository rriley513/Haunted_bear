//center of bear is around it's butt
//useful for placing it on surfaces

function makeBear(params){

  var bear = new THREE.Object3D();
  var headRad = params.body*10/17.0; var segs = 20;
  var shineVal = 10; var veryShiny = 40;
  var notBlack = 0x5c5254; var bodyAccents = 0xffcd9c;

  //head
  var allHead = new THREE.Object3D();

  var head = new THREE.Mesh(
    new THREE.SphereGeometry(headRad, segs, segs),
    new THREE.MeshPhongMaterial({color: params.color, shininess: shineVal}));
  head.scale.z = 0.8;
  allHead.add(head);

  //ears
  function makeEar() {
    var ear = new THREE.Object3D();
    var brown = new THREE.Mesh(
      new THREE.SphereGeometry(headRad/3, segs, segs),
      new THREE.MeshPhongMaterial({color: params.color, shininess: shineVal}));
    var pink = new THREE.Mesh(
      new THREE.SphereGeometry(headRad/4, segs, segs),
      new THREE.MeshPhongMaterial({color: params.pink, shininess: shineVal}))
    pink.position.z=headRad/5;
    ear.add(brown); ear.add(pink);
    ear.scale.z = 0.5;
    return ear;
  }

  var earRotation = Math.PI/6;
  var leftEar = makeEar();
  leftEar.position.set(-headRad*Math.sin(earRotation),
    headRad*Math.cos(earRotation), 0);
  allHead.add(leftEar);

  var rightEar = makeEar();
  rightEar.position.set(headRad*Math.sin(earRotation),
    headRad*Math.cos(earRotation), 0);
  allHead.add(rightEar);

  //eyes
  function makeEye() {
    return new THREE.Mesh(
      new THREE.SphereGeometry(headRad/8, segs, segs),
      new THREE.MeshPhongMaterial({color: notBlack, shininess: veryShiny}));
    }

  var eyeRotation = Math.PI/7;
  var leftEye = makeEye();
  leftEye.position.set(-headRad*Math.sin(eyeRotation),
    headRad*Math.cos(eyeRotation)*Math.cos(Math.PI/2), //*Math.cos(Math.PI/6),
    headRad*Math.sin(Math.PI/2.5)-headRad/4);
  allHead.add(leftEye);

  var rightEye = makeEye();
  rightEye.position.set(headRad*Math.sin(eyeRotation),
    headRad*Math.cos(eyeRotation)*Math.cos(Math.PI/2), //*Math.cos(Math.PI/6),
    headRad*Math.sin(Math.PI/2.5)-headRad/4);
  allHead.add(rightEye);

  var nose = new THREE.Mesh(
    new THREE.SphereGeometry(headRad/2, segs, segs),
    new THREE.MeshPhongMaterial({color: bodyAccents, shininess: shineVal}));
  nose.scale.y=0.8;
  nose.position.set(0, -headRad/4, headRad/2*.9);
  allHead.add(nose);

  var otherNose = new THREE.Mesh(
    new THREE.SphereGeometry(headRad/5, segs, segs),
    new THREE.MeshPhongMaterial({color: notBlack, shininess: shineVal}));
  otherNose.scale.set(1, .8, .6);
  otherNose.position.set(0, -headRad/4, headRad*.9);
  allHead.add(otherNose);

  //ribbon/scarf--------------------------------------------------------
  var neckPiece = new THREE.Mesh(
    new THREE.TorusGeometry(headRad*4/5, headRad/6, segs, segs),
    new THREE.MeshPhongMaterial({color: params.scarf, shininess: shineVal}));
  neckPiece.rotation.x = Math.PI/2;
  neckPiece.position.y = -headRad;
  allHead.add(neckPiece);

  function makeRibbon() {
    var ribbon = new THREE.Mesh(
      new THREE.SphereGeometry(headRad/6, segs, segs),
      new THREE.MeshPhongMaterial({color: params.scarf, shininess: shineVal}));
    ribbon.scale.set(1, .6, 4);
    return ribbon;
  }
  var leftRibbon = makeRibbon();
  leftRibbon.position.set(-headRad/3, -headRad*1.5, headRad*5/4);
  //x is how far down pointing, y is away from body
  leftRibbon.rotation.set(Math.PI/4, -Math.PI/6, 0);

  var rightRibbon = makeRibbon();
  rightRibbon.position.set(headRad/3, -headRad*1.5, headRad*5/4);
  rightRibbon.rotation.set(Math.PI/4, Math.PI/6, 0);

  var bell = new THREE.Mesh(
    new THREE.SphereGeometry(headRad/5, segs, segs),
    //color is light grey-blue
    new THREE.MeshPhongMaterial({color: params.bell, shininess: shineVal}));
  bell.position.set(0, -headRad, headRad);
  allHead.add(bell);

  allHead.add(neckPiece); allHead.add(leftRibbon); allHead.add(rightRibbon);



  allHead.position.y = headRad/2 + params.body*2*1.1;
  bear.add(allHead);

  //body----------------------------------------
  var body = new THREE.Object3D();

  var torso = new THREE.Mesh(
    new THREE.SphereGeometry(params.body, segs, segs),
    new THREE.MeshPhongMaterial({color: params.color, shininess: shineVal}));
  torso.position.y = -params.body*1.3-headRad/2;
  torso.scale.y=1.1;
  body.add(torso);

  //arms
  function makeArm() {
    var arm = new THREE.Mesh(
    new THREE.SphereGeometry(params.body/3, segs, segs),
    new THREE.MeshPhongMaterial({color: params.color, shininess: shineVal}));
    arm.scale.y = 2.5;
    return arm;
  }

  var leftArm = makeArm();
  leftArm.position.set(-params.body, -headRad-params.body*.75, 0);
  leftArm.rotation.z = -Math.PI/6;
  body.add(leftArm);

  var rightArm = makeArm();
  rightArm.position.set(params.body, -headRad-params.body*.75, 0);
  rightArm.rotation.z = Math.PI/6;
  body.add(rightArm);

  //legs
  function makeLeg() {
    var legRad = params.body/3; var legHeight = params.body *1.5;
    var entireLeg = new THREE.Object3D();
    var leg = new THREE.Mesh(
      new THREE.CylinderGeometry(legRad, legRad, legHeight, segs),
      new THREE.MeshPhongMaterial({color: params.color, shininess: shineVal}));

    var foot = new THREE.Mesh(
      new THREE.SphereGeometry(legRad*1.1, segs, segs),
      new THREE.MeshPhongMaterial({color: params.color, shininess: shineVal}));
    foot.position.y = -legHeight/2;
    foot.scale.y = .5;

    var footPad = new THREE.Mesh(
      new THREE.SphereGeometry(legRad*.6, segs, segs),
      new THREE.MeshPhongMaterial({color: bodyAccents, shininess: shineVal}));
    footPad.position.y = (legHeight+legRad)/-2;
    footPad.scale.set(1, .5, 1.2);

    entireLeg.add(leg); entireLeg.add(foot); entireLeg.add(footPad);
    entireLeg.rotation.x = -Math.PI/2;
    return entireLeg;
  }

  var leftLeg = makeLeg();
  leftLeg.position.set(-params.body/2, -params.body*1.7-headRad,
    params.body*.75);
  leftLeg.rotation.z = -Math.PI/8;
  body.add(leftLeg);

  var rightLeg = makeLeg();
  rightLeg.position.set(params.body/2, -params.body*1.7-headRad,
    params.body*.75);
  rightLeg.rotation.z = Math.PI/8;
  body.add(rightLeg);

  body.position.y = params.body*2*1.1 + headRad/2;
  bear.add(body);

  return bear;

}
