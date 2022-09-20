//center the center of the base (so almost the bottom center but not quite)
//all lights are added in the main file
//(bc they must be added directly to the scene)

function makeLamp(lampParams){

  var lamp = new THREE.Object3D();

    //cylinder geom: top radius, bottom radius, height, radial segs, height segs
    var base = new THREE.Mesh(new THREE.CylinderGeometry(lampParams.base,
      lampParams.base, lampParams.baseHeight, lampParams.segs,
      lampParams.segs), new THREE.MeshPhongMaterial({color: 0xa6a6a6})); //silver

    var pole = new THREE.Mesh(new THREE.CylinderGeometry(lampParams.poleWidth,
      lampParams.poleWidth, lampParams.height, lampParams.segs,
      lampParams.segs), new THREE.MeshPhongMaterial({color: 0xffc973})); //light gold
      pole.position.y=lampParams.baseHeight+lampParams.height/2;

    var lampshade = new THREE.Mesh(
      new THREE.CylinderGeometry(
        lampParams.shadeRad, lampParams.shadeRad, lampParams.height/5,
        lampParams.segs, lampParams.segs, true),
      new THREE.MeshPhongMaterial(
        {color: 0xffedad, transparent: true, opacity: 0.9}));
        //soft yellow. above bool makes openended
      lampshade.position.y=lampParams.height*4/5;

      //the little ball at top :)
      var topPiece = new THREE.Mesh(new THREE.SphereGeometry(
        lampParams.baseHeight*2, lampParams.segs, lampParams.segs),
        new THREE.MeshPhongMaterial({color: 0xffc973})); //light gold
        topPiece.position.y=lampParams.height;

      lamp.add(base); lamp.add(pole); lamp.add(lampshade); lamp.add(topPiece);

      return lamp;
}
