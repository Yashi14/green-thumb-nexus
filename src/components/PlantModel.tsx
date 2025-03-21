
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html, Environment, OrbitControls } from '@react-three/drei';
import { Mesh, Group } from 'three';

interface PlantModelProps {
  plantId: string;
  rotation?: boolean;
}

// This component will load different 3D models based on plant ID
const PlantModel: React.FC<PlantModelProps> = ({ plantId, rotation = true }) => {
  const group = useRef<Group>(null);
  
  // Rotate the model automatically if rotation is enabled
  useFrame((state, delta) => {
    if (rotation && group.current) {
      group.current.rotation.y += delta * 0.5;
    }
  });

  // Render different plant models based on plantId
  const renderPlantModel = () => {
    switch (plantId) {
      case 'tulsi':
        return <TulsiModel reference={group} />;
      case 'aloe':
        return <AloeModel reference={group} />;
      case 'neem':
        return <NeemModel reference={group} />;
      case 'garlic':
        return <GarlicModel reference={group} />;
      case 'brahmi':
        return <BrahmiModel reference={group} />;
      case 'nagkesar':
        return <NagkesarModel reference={group} />;
      case 'kapur':
        return <KapurModel reference={group} />;
      default:
        return <DefaultModel reference={group} />;
    }
  };

  return (
    <>
      <Environment preset="city" />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      {renderPlantModel()}
    </>
  );
};

// Individual plant model components
// Since we don't have actual .glb models, we'll create placeholders with basic geometries

const TulsiModel = ({ reference }: { reference: React.RefObject<Group> }) => {
  return (
    <group ref={reference}>
      {/* Pot */}
      <mesh position={[0, -1.5, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.9, 1, 32]} />
        <meshStandardMaterial color="#c19a6b" />
      </mesh>
      
      {/* Plant base */}
      <mesh position={[0, -0.7, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="#3a5f0b" />
      </mesh>
      
      {/* Stem */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 1.5, 8]} />
        <meshStandardMaterial color="#5c8a2b" />
      </mesh>
      
      {/* Leaves */}
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin(i * Math.PI / 4) * 0.5, 
            0.4 + i * 0.15, 
            Math.cos(i * Math.PI / 4) * 0.5
          ]} 
          rotation={[0.3, i * Math.PI / 4, 0]}
          castShadow
        >
          <sphereGeometry args={[0.3, 32, 16]} />
          <meshStandardMaterial color="#4a7f1e" />
        </mesh>
      ))}
    </group>
  );
};

const AloeModel = ({ reference }: { reference: React.RefObject<Group> }) => {
  return (
    <group ref={reference}>
      {/* Pot */}
      <mesh position={[0, -1.5, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 1, 32]} />
        <meshStandardMaterial color="#a15c38" />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, -0.8, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.7, 0.4, 32]} />
        <meshStandardMaterial color="#3a5c26" />
      </mesh>
      
      {/* Aloe Leaves */}
      {[...Array(12)].map((_, i) => (
        <group key={i} rotation={[0, i * Math.PI / 6, 0]}>
          <mesh 
            position={[0, -0.2, 0.5]} 
            rotation={[-Math.PI / 4, 0, 0]}
            castShadow
          >
            <coneGeometry args={[0.2, 2, 4]} />
            <meshStandardMaterial color="#5da130" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const NeemModel = ({ reference }: { reference: React.RefObject<Group> }) => {
  return (
    <group ref={reference} scale={0.8}>
      {/* Pot */}
      <mesh position={[0, -2, 0]} castShadow>
        <cylinderGeometry args={[1, 1.2, 1.5, 32]} />
        <meshStandardMaterial color="#94785c" />
      </mesh>
      
      {/* Tree trunk */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 4, 8]} />
        <meshStandardMaterial color="#6e5842" />
      </mesh>
      
      {/* Branches */}
      {[...Array(5)].map((_, i) => (
        <group key={i} position={[0, i * 0.5, 0]} rotation={[0, i * Math.PI / 2.5, 0]}>
          <mesh position={[0.6, 1, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <cylinderGeometry args={[0.05, 0.1, 1, 8]} />
            <meshStandardMaterial color="#6e5842" />
          </mesh>
        </group>
      ))}
      
      {/* Leaves clusters */}
      {[...Array(15)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin(i * Math.PI / 3) * 1.2, 
            1.5 + Math.random() * 1.5, 
            Math.cos(i * Math.PI / 3) * 1.2
          ]} 
          castShadow
        >
          <sphereGeometry args={[0.4, 32, 16]} />
          <meshStandardMaterial color="#3e7c17" />
        </mesh>
      ))}
    </group>
  );
};

const GarlicModel = ({ reference }: { reference: React.RefObject<Group> }) => {
  return (
    <group ref={reference}>
      {/* Pot */}
      <mesh position={[0, -1.5, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.9, 1, 32]} />
        <meshStandardMaterial color="#d9c5b4" />
      </mesh>
      
      {/* Garlic bulb */}
      <mesh position={[0, -0.7, 0]} castShadow>
        <sphereGeometry args={[0.6, 32, 16]} />
        <meshStandardMaterial color="#f0ede5" />
      </mesh>
      
      {/* Stems */}
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={i} 
          position={[0, 0, 0]} 
          rotation={[0.3 * i, i * Math.PI / 4, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.05, 0.08, 2 + i * 0.2, 8]} />
          <meshStandardMaterial color="#86a95c" />
        </mesh>
      ))}
    </group>
  );
};

const BrahmiModel = ({ reference }: { reference: React.RefObject<Group> }) => {
  return (
    <group ref={reference}>
      {/* Pot */}
      <mesh position={[0, -1.5, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 1, 32]} />
        <meshStandardMaterial color="#c7b198" />
      </mesh>
      
      {/* Soil */}
      <mesh position={[0, -0.9, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
        <meshStandardMaterial color="#3a2a18" />
      </mesh>
      
      {/* Create small leaf clusters */}
      {[...Array(30)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 1.3, 
            -0.7 + Math.random() * 1.3, 
            (Math.random() - 0.5) * 1.3
          ]} 
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          scale={[0.15, 0.05, 0.15]}
          castShadow
        >
          <sphereGeometry args={[1, 32, 16]} />
          <meshStandardMaterial color="#4a9f31" />
        </mesh>
      ))}
    </group>
  );
};

const NagkesarModel = ({ reference }: { reference: React.RefObject<Group> }) => {
  return (
    <group ref={reference} scale={0.7}>
      {/* Pot */}
      <mesh position={[0, -2, 0]} castShadow>
        <cylinderGeometry args={[1, 1.2, 1.5, 32]} />
        <meshStandardMaterial color="#e2c5a8" />
      </mesh>
      
      {/* Trunk */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.25, 4, 8]} />
        <meshStandardMaterial color="#6d4c3d" />
      </mesh>
      
      {/* Branches */}
      {[...Array(4)].map((_, i) => (
        <group key={i} position={[0, 1 + i * 0.5, 0]} rotation={[0, i * Math.PI / 2, 0]}>
          <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
            <cylinderGeometry args={[0.05, 0.08, 1, 8]} />
            <meshStandardMaterial color="#6d4c3d" />
          </mesh>
        </group>
      ))}
      
      {/* Leaves */}
      {[...Array(20)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 1.5, 
            1 + Math.random() * 2, 
            (Math.random() - 0.5) * 1.5
          ]} 
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          scale={[0.2, 0.05, 0.1]}
          castShadow
        >
          <sphereGeometry args={[1, 32, 16]} />
          <meshStandardMaterial color="#2c6e31" />
        </mesh>
      ))}
      
      {/* Flowers */}
      {[...Array(5)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 1.3, 
            1.5 + Math.random() * 1.5, 
            (Math.random() - 0.5) * 1.3
          ]} 
          castShadow
        >
          <sphereGeometry args={[0.12, 32, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  );
};

const KapurModel = ({ reference }: { reference: React.RefObject<Group> }) => {
  return (
    <group ref={reference} scale={0.7}>
      {/* Pot */}
      <mesh position={[0, -2, 0]} castShadow>
        <cylinderGeometry args={[1, 1.2, 1.5, 32]} />
        <meshStandardMaterial color="#a17f65" />
      </mesh>
      
      {/* Trunk */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 4, 8]} />
        <meshStandardMaterial color="#5c4033" />
      </mesh>
      
      {/* Branches */}
      {[...Array(5)].map((_, i) => (
        <group key={i} position={[0, i * 0.4, 0]} rotation={[0, i * Math.PI / 2.5, 0]}>
          <mesh position={[0.4, 1, 0]} rotation={[0, 0, Math.PI / 5]} castShadow>
            <cylinderGeometry args={[0.05, 0.08, 0.7, 8]} />
            <meshStandardMaterial color="#5c4033" />
          </mesh>
        </group>
      ))}
      
      {/* Leaves clusters */}
      {[...Array(12)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 1.8, 
            1.5 + Math.random() * 1.5, 
            (Math.random() - 0.5) * 1.8
          ]} 
          castShadow
        >
          <sphereGeometry args={[0.35, 32, 16]} />
          <meshStandardMaterial color="#2d572c" />
        </mesh>
      ))}
    </group>
  );
};

// Default model as fallback
const DefaultModel = ({ reference }: { reference: React.RefObject<Group> }) => {
  return (
    <group ref={reference}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4db6ac" />
      </mesh>
      
      <Html position={[0, 1.5, 0]} center>
        <div className="bg-dark-900/80 text-white p-2 rounded text-sm">
          Model not found
        </div>
      </Html>
    </group>
  );
};

export default PlantModel;
