import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
  Palmtree, 
  Sparkles, 
  Building2, 
  Bird, 
  Flower2, 
  Compass, 
  ChevronRight, 
  CheckCircle2, 
  Lock, 
  ArrowLeft,
  Info,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Camera,
  Sun,
  Moon,
  CloudRain,
  Cloud,
  Maximize2,
  Minimize2,
  TreePine,
  Droplets,
  Zap,
  Coins,
  X,
  Sliders,
  Eye,
  RefreshCw,
  Layers,
  Heart,
  Activity,
  Wind,
  Recycle,
  Globe2,
  MapPin,
  Move
} from 'lucide-react';

export default function MyIsland({ onNavigateHome }) {
  const mountRef = useRef(null);

  // World & Camera Control States
  const [timeOfDay, setTimeOfDay] = useState('afternoon'); // 'morning' | 'afternoon' | 'golden' | 'night'
  const [weather, setWeather] = useState('sunny'); // 'sunny' | 'rain' | 'rainbow' | 'mist'
  const [islandLevel, setIslandLevel] = useState(25);
  const [photoMode, setPhotoMode] = useState(false);
  const [selected3DEntity, setSelected3DEntity] = useState(null);

  // Customization State
  const [islandName, setIslandName] = useState('Emerald Sanctuary Realm');
  const [isRenaming, setIsRenaming] = useState(false);

  // Ecosystem Health Metrics
  const healthMeters = {
    forestHealth: 92,
    waterPurity: 88,
    wildlifeDiversity: 85,
    cleanEnergy: 95,
    cleanliness: 98,
    overallBiodiversity: 92
  };

  // THREE.JS SCENE ENGINE & 3D ENVIRONMENT CREATION
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. SCENE & CAMERA SETUP
    const scene = new THREE.Scene();
    
    // Sky Color depending on Time of Day
    const getSkyColor = (tod) => {
      switch (tod) {
        case 'morning': return 0x0f3d2e;
        case 'golden': return 0x3d240f;
        case 'night': return 0x03131b;
        case 'afternoon':
        default: return 0x0a3324;
      }
    };

    scene.background = new THREE.Color(getSkyColor(timeOfDay));
    scene.fog = new THREE.FogExp2(getSkyColor(timeOfDay), weather === 'mist' ? 0.03 : 0.008);

    // Isometric Downward Camera (35-45 degree angle)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(32, 28, 32);
    camera.lookAt(0, 0, 0);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear previous canvas if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 2. LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(
      timeOfDay === 'night' ? 0x224455 : 0xffffff, 
      timeOfDay === 'night' ? 0.4 : 0.7
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      timeOfDay === 'golden' ? 0xfbbf24 : timeOfDay === 'night' ? 0x38bdf8 : 0xffffff,
      timeOfDay === 'night' ? 0.6 : 1.2
    );
    dirLight.position.set(30, 40, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    // 3. REAL 3D ISLE GEOMETRY (TOWNSCAPER / ANIMAL CROSSING LOW-POLY STYLE)
    const islandGroup = new THREE.Group();

    // A. Main Grassy Island Base (Extruded Low-Poly Terrain)
    const islandBaseGeo = new THREE.CylinderGeometry(18, 22, 4, 16);
    const islandBaseMat = new THREE.MeshStandardMaterial({ 
      color: 0x15803d, 
      roughness: 0.8, 
      metalness: 0.1,
      flatShading: true 
    });
    const islandBase = new THREE.Mesh(islandBaseGeo, islandBaseMat);
    islandBase.position.y = -2;
    islandBase.receiveShadow = true;
    islandBase.castShadow = true;
    islandGroup.add(islandBase);

    // Sandy Shoreline Base Layer
    const sandGeo = new THREE.CylinderGeometry(20, 24, 2, 16);
    const sandMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.9, flatShading: true });
    const sandMesh = new THREE.Mesh(sandGeo, sandMat);
    sandMesh.position.y = -3;
    sandMesh.receiveShadow = true;
    islandGroup.add(sandMesh);

    // B. Flowing Water Ocean Plane
    const waterGeo = new THREE.PlaneGeometry(120, 120, 32, 32);
    const waterMat = new THREE.MeshStandardMaterial({ 
      color: timeOfDay === 'night' ? 0x0f4c5c : 0x0284c7, 
      roughness: 0.1, 
      metalness: 0.8,
      transparent: true,
      opacity: 0.85 
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -4;
    scene.add(waterMesh);

    // C. 3D Mountain Peak
    const mountainGeo = new THREE.ConeGeometry(5, 10, 6);
    const mountainMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, flatShading: true });
    const mountain = new THREE.Mesh(mountainGeo, mountainMat);
    mountain.position.set(-8, 5, -8);
    mountain.castShadow = true;
    mountain.receiveShadow = true;
    mountain.userData = { 
      name: 'Sacred Mountain Summit & Shrine',
      category: 'Sacred Peak',
      impact: 'Apex Sanctuary Summit',
      lore: 'The highest peak where white stags gather under star-lit skies.',
      fact: 'High altitude mountain ecosystems act as natural water towers for lower valleys.'
    };
    islandGroup.add(mountain);

    // Snow Cap on Mountain
    const snowCapGeo = new THREE.ConeGeometry(2.2, 4, 6);
    const snowCapMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
    const snowCap = new THREE.Mesh(snowCapGeo, snowCapMat);
    snowCap.position.set(-8, 8, -8);
    islandGroup.add(snowCap);

    // D. River Stream Cutting Across Island
    const riverGeo = new THREE.BoxGeometry(4, 0.4, 24);
    const riverMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.6 });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.position.set(0, 0.1, 0);
    river.rotation.y = Math.PI / 4;
    islandGroup.add(river);

    // E. 3D Wooden Bridge Crossing River
    const bridgeGroup = new THREE.Group();
    const bridgePlankGeo = new THREE.BoxGeometry(6, 0.3, 3);
    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
    const bridgePlank = new THREE.Mesh(bridgePlankGeo, bridgeMat);
    bridgePlank.position.set(0, 0.4, 0);
    bridgeGroup.add(bridgePlank);
    bridgeGroup.position.set(1, 0.2, 1);
    bridgeGroup.userData = {
      name: 'Crystal River & Wooden Bridge',
      category: 'Water Infrastructure',
      impact: 'Stores 1,200L fresh water',
      lore: 'Constructed after completing 5 real-world water conservation challenges.',
      fact: 'Riparian river corridors provide vital habitats for over 70% of terrestrial wildlife species.'
    };
    islandGroup.add(bridgeGroup);

    // F. 3D Eco Cottage / Research Lab
    const houseGroup = new THREE.Group();
    const houseBodyGeo = new THREE.BoxGeometry(4, 3, 4);
    const houseBodyMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.7 });
    const houseBody = new THREE.Mesh(houseBodyGeo, houseBodyMat);
    houseBody.position.y = 1.5;
    houseBody.castShadow = true;
    houseGroup.add(houseBody);

    const roofGeo = new THREE.ConeGeometry(3.5, 2.5, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6, flatShading: true });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 4.25;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    houseGroup.add(roof);

    houseGroup.position.set(8, 0, -5);
    houseGroup.userData = {
      name: 'Nature Research Lab & Eco Village',
      category: 'Community Infrastructure',
      impact: 'Coordinates campus eco drives',
      lore: 'Where students analyze biodiversity data and document real-world environmental actions.',
      fact: 'Community research labs increase student environmental stewardship participation by 80%.'
    };
    islandGroup.add(houseGroup);

    // G. 3D Rotating Windmill Tower
    const windmillGroup = new THREE.Group();
    const towerGeo = new THREE.CylinderGeometry(1.2, 1.8, 8, 8);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 4;
    tower.castShadow = true;
    windmillGroup.add(tower);

    // Windmill Blades
    const bladesGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const bladeGeo = new THREE.BoxGeometry(0.4, 4, 0.1);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.y = 2;
      blade.rotation.z = (i * Math.PI) / 2;
      bladesGroup.add(blade);
    }
    bladesGroup.position.set(0, 7.5, 1.3);
    windmillGroup.add(bladesGroup);

    windmillGroup.position.set(10, 0, 8);
    windmillGroup.userData = {
      name: 'Windmill Lookout Tower',
      category: 'Clean Energy',
      impact: 'Harnesses coastal wind currents',
      lore: 'A rustic wooden wind turbine providing panoramic views of the entire island realm.',
      fact: 'A single modern wind turbine can power over 1,500 households cleanly for a year.'
    };
    islandGroup.add(windmillGroup);

    // H. 3D Solar Panel Array
    const solarGroup = new THREE.Group();
    const panelGeo = new THREE.BoxGeometry(3, 0.2, 2);
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.2, metalness: 0.9 });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.rotation.x = Math.PI / 6;
    panel.position.y = 1;
    solarGroup.add(panel);
    solarGroup.position.set(4, 0, -10);
    solarGroup.userData = {
      name: 'Solar Panel Array Canopy',
      category: 'Clean Energy',
      impact: 'Generates 4.2 kW Clean Power',
      lore: 'Powers 100% of sanctuary evening lanterns using clean solar radiation.',
      fact: 'Solar photovoltaic panels offset an average of 1.5 tons of carbon dioxide per year.'
    };
    islandGroup.add(solarGroup);

    // I. PROCEDURAL 3D LOW-POLY TREES (50+ TREES SCATTERED)
    const treeTrunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 2, 6);
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });

    const foliageGeo = new THREE.DodecahedronGeometry(1.4);
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.8, flatShading: true });

    // Central Ancient Oak
    const ancientOakGroup = new THREE.Group();
    const oakTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.2, 4, 8), treeTrunkMat);
    oakTrunk.position.y = 2;
    oakTrunk.castShadow = true;
    ancientOakGroup.add(oakTrunk);

    const oakFoliage = new THREE.Mesh(new THREE.DodecahedronGeometry(3.5), new THREE.MeshStandardMaterial({ color: 0x15803d, flatShading: true }));
    oakFoliage.position.y = 5;
    oakFoliage.castShadow = true;
    ancientOakGroup.add(oakFoliage);

    ancientOakGroup.position.set(-4, 0, 4);
    ancientOakGroup.userData = {
      name: 'Ancient Golden Oak Canopy',
      category: 'Flora & Landmark',
      impact: 'Absorbs 24.5 kg CO₂ / year',
      lore: 'The central heart tree of your island sanctuary. Its deep roots bind the sanctuary soil together.',
      fact: 'Ancient oak trees support over 2,300 species of birds, insects, and fungi in real ecosystems.'
    };
    islandGroup.add(ancientOakGroup);

    // Scatter 45 Low-Poly Trees around island
    for (let i = 0; i < 45; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 12;
      const tx = Math.cos(angle) * radius;
      const tz = Math.sin(angle) * radius;

      // Avoid placing trees directly inside river or house
      if (Math.abs(tx - tz) < 2 || (tx > 6 && tz < -3)) continue;

      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
      trunk.position.y = 1;
      trunk.castShadow = true;
      tree.add(trunk);

      const scale = 0.8 + Math.random() * 0.6;
      const foliage = new THREE.Mesh(foliageGeo, foliageMat);
      foliage.position.y = 2.4;
      foliage.scale.set(scale, scale, scale);
      foliage.castShadow = true;
      tree.add(foliage);

      tree.position.set(tx, 0, tz);
      islandGroup.add(tree);
    }

    // J. 3D BOULDERS & ROCKS
    const rockGeo = new THREE.DodecahedronGeometry(0.8);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9, flatShading: true });
    for (let i = 0; i < 15; i++) {
      const rx = (Math.random() - 0.5) * 28;
      const rz = (Math.random() - 0.5) * 28;
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(rx, 0.4, rz);
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      rock.castShadow = true;
      islandGroup.add(rock);
    }

    // Add Main Island Group to Scene
    scene.add(islandGroup);

    // 4. ANIMATION & RENDER LOOP
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate Windmill Blades
      bladesGroup.rotation.z += 0.03;

      // Slow Ambient Island Idle Rotation
      islandGroup.rotation.y += 0.0015;

      // Animate Water Wave Ripples
      waterMesh.position.y = -4 + Math.sin(Date.now() * 0.002) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // 5. THREE.JS RAYCASTING 3D OBJECT CLICK INSPECTOR
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(islandGroup.children, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData?.name && obj.parent) {
          obj = obj.parent;
        }

        if (obj && obj.userData?.name) {
          setSelected3DEntity(obj.userData);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Clean Up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('click', handleCanvasClick);
      }
      renderer.dispose();
    };
  }, [timeOfDay, weather]);

  return (
    <div className="w-full min-h-screen bg-[#05130d] text-slate-100 font-body relative overflow-hidden flex flex-col selection:bg-emerald-500 selection:text-white select-none">
      
      {/* MINIMAL TOP EDGE HUD HEADER */}
      {!photoMode && (
        <header className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
          
          {/* LEFT: BACK BUTTON & REALM TITLE */}
          <div className="bg-[#08241a]/90 border border-emerald-500/40 p-4 rounded-3xl backdrop-blur-md shadow-2xl pointer-events-auto flex items-center gap-4">
            <button
              onClick={onNavigateHome}
              className="p-2.5 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 cursor-pointer border border-emerald-500/30 shadow-md"
              title="Return to Command Center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              {isRenaming ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={islandName}
                    onChange={(e) => setIslandName(e.target.value)}
                    className="bg-[#04160d] border border-emerald-400 px-3 py-1 rounded-xl text-base font-black text-white focus:outline-none"
                  />
                  <button
                    onClick={() => setIsRenaming(false)}
                    className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <h1 
                  onClick={() => setIsRenaming(true)}
                  className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight flex items-center gap-2 cursor-pointer hover:text-emerald-300"
                >
                  <span>{islandName}</span>
                  <span className="text-sm bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-3 py-0.5 rounded-full font-sans">
                    Lvl {islandLevel}
                  </span>
                </h1>
              )}
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-2 mt-0.5">
                <span>🪙 1,280 Coins</span>
                <span>•</span>
                <span>🌿 Biodiversity Index: {healthMeters.overallBiodiversity}%</span>
              </div>
            </div>
          </div>

          {/* CENTER: TIME & WEATHER TOOLBAR */}
          <div className="bg-[#08241a]/90 border border-emerald-500/40 p-2.5 rounded-3xl backdrop-blur-md shadow-2xl pointer-events-auto flex items-center gap-3">
            
            {/* Time of Day */}
            <div className="flex items-center gap-1 bg-[#020f09] p-1 rounded-2xl border border-emerald-500/20">
              {[
                { id: 'morning', label: '🌅 Morning' },
                { id: 'afternoon', label: '☀️ Noon' },
                { id: 'golden', label: '🌇 Sunset' },
                { id: 'night', label: '🌙 Night' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTimeOfDay(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all ${
                    timeOfDay === t.id ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="h-5 w-px bg-emerald-500/30" />

            {/* Weather */}
            <div className="flex items-center gap-1 bg-[#020f09] p-1 rounded-2xl border border-emerald-500/20">
              {[
                { id: 'sunny', label: '🌤️ Sunny' },
                { id: 'rain', label: '🌧️ Rain' },
                { id: 'rainbow', label: '🌈 Rainbow' },
                { id: 'mist', label: '🌫️ Fog' }
              ].map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWeather(w.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all ${
                    weather === w.id ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: PHOTO MODE TRIGGER */}
          <button
            onClick={() => setPhotoMode(true)}
            className="pointer-events-auto px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-2 hover:bg-amber-400 cursor-pointer shadow-2xl border border-amber-300"
          >
            <Camera className="w-4 h-4 text-slate-950" />
            <span>Photo Mode</span>
          </button>

        </header>
      )}

      {/* PHOTO MODE ACTIVE TOP BANNER */}
      {photoMode && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-amber-500 text-slate-950 px-6 py-3 rounded-full font-black text-xs flex items-center justify-between gap-4 shadow-2xl border-2 border-amber-200">
          <span className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            <span>PHOTO MODE ACTIVE — PRESS EXIT TO RETURN TO HUD</span>
          </span>
          <button
            onClick={() => setPhotoMode(false)}
            className="px-4 py-1.5 rounded-xl bg-slate-950 text-white font-bold text-xs cursor-pointer hover:bg-slate-900"
          >
            Exit Photo Mode
          </button>
        </div>
      )}

      {/* MAIN REAL 3D THREE.JS WEBGL CANVAS (DOMINATES 80% VIEWPORT) */}
      <div 
        ref={mountRef}
        className="w-full h-screen relative cursor-grab active:cursor-grabbing bg-gradient-to-br from-[#0c2f21] via-[#082419] to-[#04140d]"
      />

      {/* BOTTOM EDGE HUD: HEALTH METERS */}
      {!photoMode && (
        <footer className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
          <div className="bg-[#08241a]/90 border border-emerald-500/40 p-4 rounded-3xl backdrop-blur-md shadow-2xl pointer-events-auto flex items-center gap-5">
            <div>
              <div className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">Forest Canopy</div>
              <div className="text-xs font-black text-white">{healthMeters.forestHealth}% Health 🌳</div>
            </div>
            <div className="h-6 w-px bg-emerald-500/30" />
            <div>
              <div className="text-[10px] font-black uppercase text-teal-300 tracking-wider">Water Purity</div>
              <div className="text-xs font-black text-white">{healthMeters.waterPurity}% Stream 💧</div>
            </div>
            <div className="h-6 w-px bg-emerald-500/30" />
            <div>
              <div className="text-[10px] font-black uppercase text-amber-300 tracking-wider">Clean Energy</div>
              <div className="text-xs font-black text-amber-300">{healthMeters.cleanEnergy}% Solar ⚡</div>
            </div>
          </div>

          <div className="bg-[#08241a]/90 border border-emerald-500/40 p-3 rounded-3xl backdrop-blur-md shadow-2xl pointer-events-auto text-xs font-black text-slate-300">
            💡 Click any 3D object to inspect its ecological stats!
          </div>
        </footer>
      )}

      {/* INTERACTIVE 3D RAYCASTED OBJECT INSPECTION DRAWER */}
      <AnimatePresence>
        {selected3DEntity && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-[#062016] border-l border-emerald-500/40 h-full p-8 overflow-y-auto space-y-6 text-slate-100 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40 uppercase">
                  3D {selected3DEntity.category} Inspector
                </span>
                <button
                  onClick={() => setSelected3DEntity(null)}
                  className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-3">
                <div className="w-24 h-24 rounded-3xl bg-[#04160d] border-4 border-emerald-400 mx-auto flex items-center justify-center text-5xl shadow-2xl">
                  🌱
                </div>
                <h2 className="text-2xl font-black text-white font-heading">{selected3DEntity.name}</h2>
                <div className="text-xs font-black text-emerald-300">{selected3DEntity.impact}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#04160d] border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-black uppercase text-amber-400">Environmental Lore & Origin</span>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  "{selected3DEntity.lore}"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#04160d] border border-teal-500/30 space-y-2">
                <span className="text-[10px] font-black uppercase text-teal-300">Real-World Ecological Fact</span>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  "{selected3DEntity.fact}"
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSelected3DEntity(null)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black text-sm cursor-pointer shadow-xl"
                >
                  CLOSE 3D INSPECTOR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
