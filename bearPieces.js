//allows retrieval of all bear pieces, for a dismembered bear look
function dismemberedBear(params, part){

  //params and methods copied from "bear.js"
  var headRad = params.body*10/17.0; var segs = 20;
  var shineVal = 10; var veryShiny = 40;
  var notBlack = 0x5c5254; var bodyAccents = 0xffcd9c;

  //head====================================================================
  function makeHead(){
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

  return allHead;
} //end head

function makeTorso(){
  var torso = new THREE.Mesh(
    new THREE.SphereGeometry(params.body, segs, segs),
    new THREE.MeshPhongMaterial({color: params.color, shininess: shineVal}));
  torso.scale.y=1.1;

  return torso;
}

function makeArm(){
  var arm = new THREE.Mesh(
  new THREE.SphereGeometry(params.body/3, segs, segs),
  new THREE.MeshPhongMaterial({color: params.color, shininess: shineVal}));
  arm.scale.y = 2.5;
  return arm;
}//end arm

function makeLeg(){
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
}//end leg

var dismembered = new THREE.Object3D();
var head = makeHead(); var body = makeTorso(); var armL = makeArm();
var armR = makeArm(); var legL = makeLeg(); var legR = makeLeg();

//below sets position, rotation, and scale for the "right look"
head.rotation.set(-Math.PI/2, 0, -Math.PI/2);
body.scale.set(1, .25, .75); armL.rotation.x = Math.PI/2;
armR.rotation.x = Math.PI/2; armL.scale.z = .5; armR.scale.z = .5;

head.position.set(0, headRad*4/5, params.body/1.6);
body.position.set(-headRad*3, headRad/3, head.position.z);
armL.position.set(-headRad, headRad/4, headRad*4);
armL.rotation.z = -Math.PI/6;
armR.position.set(-headRad*3, headRad/4, -headRad*2);
armR.rotation.z = -Math.PI/6;
legL.position.set(-headRad*5, headRad/1.75, headRad*4);
legL.rotation.z = -Math.PI/6;
legR.position.set(-headRad*7, headRad/1.75, headRad/2);
legR.rotation.z = -Math.PI/2;

//this is how we get each part. Instead of returning the part directly, I first
//added it to a container, which allowed my to preserve its position relative
//to other pieces, and still animate each piece
if (part == 1) dismembered.add(head);
else if (part == 2) dismembered.add(body);
else if (part == 3) dismembered.add(armL);
else if (part == 4) dismembered.add(armR);
else if (part == 5) dismembered.add(legL);
else if (part == 6) dismembered.add(legR);
else { //return entire bear
  dismembered.add(head); dismembered.add(body); dismembered.add(armL);
  dismembered.add(armR); dismembered.add(legL); dismembered.add(legR);
}

return dismembered;
}
