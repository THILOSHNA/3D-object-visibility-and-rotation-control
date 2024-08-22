import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = ({ visibility, rotationSpeeds }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    const geometryBox = new THREE.BoxGeometry(30, 30, 30); // Increased size
    const materialBox = new THREE.MeshBasicMaterial({ color: 0x9cdba6 });
    const box = new THREE.Mesh(geometryBox, materialBox);

    const geometryTorus = new THREE.TorusGeometry(20, 7, 16, 100); // Increased size
    const materialTorus = new THREE.MeshBasicMaterial({ color: 0xffd3b6 });
    const torus = new THREE.Mesh(geometryTorus, materialTorus);

    const geometryDodecahedron = new THREE.DodecahedronGeometry(20); // Increased size
    const materialDodecahedron = new THREE.MeshBasicMaterial({
      color: 0x9b86bd,
    });
    const dodecahedron = new THREE.Mesh(
      geometryDodecahedron,
      materialDodecahedron
    );

    box.position.x = -80; // Adjusted position to accommodate larger size
    torus.position.x = 0; // Centered position
    dodecahedron.position.x = 70; // Adjusted position to accommodate larger size

    if (visibility.box) scene.add(box);
    if (visibility.torus) scene.add(torus);
    if (visibility.dodecahedron) scene.add(dodecahedron);

    camera.position.z = 90; // Adjusted camera position to view larger objects

    const animate = () => {
      requestAnimationFrame(animate);

      if (visibility.box) {
        box.rotation.x += rotationSpeeds.box;
        box.rotation.y += rotationSpeeds.box;
      }
      if (visibility.torus) {
        torus.rotation.x += rotationSpeeds.torus;
        torus.rotation.y += rotationSpeeds.torus;
      }
      if (visibility.dodecahedron) {
        dodecahedron.rotation.x += rotationSpeeds.dodecahedron;
        dodecahedron.rotation.y += rotationSpeeds.dodecahedron;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      currentMount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, [visibility, rotationSpeeds]);

  return <div ref={mountRef} style={{ width: "100%", height: "400px" }} />;
};

export default ThreeScene;
