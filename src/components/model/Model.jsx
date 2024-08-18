import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";

const Model = () => {
  const { nodes, animations } = useGLTF("./scene.glb");
  const modelRef = useRef();
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (actions["mixamo.com"]) {
      const action = actions["mixamo.com"];
      action.play();
    } else {
      console.warn('Animation "mixamo.com" not found.');
    }

    return () => {
      if (actions["mixamo.com"]) {
        actions["mixamo.com"].stop();
      }
    };
  }, [actions]);

  return (
    <group ref={modelRef}>
      {/* <mesh
        geometry={nodes.Astronaut_mesh_1_2_Astronaut_mat1_0.geometry}
        material={nodes.Astronaut_mesh_1_2_Astronaut_mat1_0.material}
        position={nodes.Astronaut_mesh_1_2_Astronaut_mat1_0.position}
      />
      <mesh
        geometry={nodes.Astronaut_mesh_Astronaut_mat1_0.geometry}
        material={nodes.Astronaut_mesh_Astronaut_mat1_0.material}
        position={nodes.Astronaut_mesh_Astronaut_mat1_0.position}
      />
      <skinnedMesh
        skeleton={nodes.Object_2.skeleton}
        geometry={nodes.Object_2.geometry}
        material={nodes.Object_2.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_4.skeleton}
        geometry={nodes.Object_4.geometry}
        material={nodes.Object_4.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_6.skeleton}
        geometry={nodes.Object_6.geometry}
        material={nodes.Object_6.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_7.skeleton}
        geometry={nodes.Object_7.geometry}
        material={nodes.Object_7.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_8.skeleton}
        geometry={nodes.Object_8.geometry}
        material={nodes.Object_8.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_9.skeleton}
        geometry={nodes.Object_9.geometry}
        material={nodes.Object_9.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_10.skeleton}
        geometry={nodes.Object_10.geometry}
        material={nodes.Object_10.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_11.skeleton}
        geometry={nodes.Object_11.geometry}
        material={nodes.Object_11.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_12.skeleton}
        geometry={nodes.Object_12.geometry}
        material={nodes.Object_12.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_13.skeleton}
        geometry={nodes.Object_13.geometry}
        material={nodes.Object_13.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_14.skeleton}
        geometry={nodes.Object_14.geometry}
        material={nodes.Object_14.material}
      /> */}

      {Object.keys(nodes).map((key) => (
        <primitive
          key={key}
          object={nodes[key]}
          position={nodes[key].position}
        />
      ))}
    </group>
  );
};

useGLTF.preload("./scene.glb");

export default Model;




      {/* <mesh
        geometry={nodes.Astronaut_mesh_1_2_Astronaut_mat1_0.geometry}
        material={nodes.Astronaut_mesh_1_2_Astronaut_mat1_0.material}
        position={nodes.Astronaut_mesh_1_2_Astronaut_mat1_0.position}
      />
      <mesh
        geometry={nodes.Astronaut_mesh_Astronaut_mat1_0.geometry}
        material={nodes.Astronaut_mesh_Astronaut_mat1_0.material}
        position={nodes.Astronaut_mesh_Astronaut_mat1_0.position}
      />
      <skinnedMesh
        skeleton={nodes.Object_2.skeleton}
        geometry={nodes.Object_2.geometry}
        material={nodes.Object_2.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_4.skeleton}
        geometry={nodes.Object_4.geometry}
        material={nodes.Object_4.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_6.skeleton}
        geometry={nodes.Object_6.geometry}
        material={nodes.Object_6.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_7.skeleton}
        geometry={nodes.Object_7.geometry}
        material={nodes.Object_7.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_8.skeleton}
        geometry={nodes.Object_8.geometry}
        material={nodes.Object_8.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_9.skeleton}
        geometry={nodes.Object_9.geometry}
        material={nodes.Object_9.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_10.skeleton}
        geometry={nodes.Object_10.geometry}
        material={nodes.Object_10.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_11.skeleton}
        geometry={nodes.Object_11.geometry}
        material={nodes.Object_11.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_12.skeleton}
        geometry={nodes.Object_12.geometry}
        material={nodes.Object_12.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_13.skeleton}
        geometry={nodes.Object_13.geometry}
        material={nodes.Object_13.material}
      />
      <skinnedMesh
        skeleton={nodes.Object_14.skeleton}
        geometry={nodes.Object_14.geometry}
        material={nodes.Object_14.material}
      /> */}

