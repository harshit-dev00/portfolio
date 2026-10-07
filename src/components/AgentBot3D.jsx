// src/components/AgentBot3D.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";

/* ================= CONTROLS ================= */
const CAMERA_Z = 10.5;      // bada = sab chhota (space ke andar)
const ROBOT_SCALE = 1.35;   // robot ka size
const NODE_SCALE = 0.95;    // chips ki orbit ka size
const ORBIT_SPEED = 0.2;
const EYE_COLOR = "#f97316";
const BUBBLE_POS = [1.7, 2.3, 1.5];
const DRAG_SPEED = 0.01;
const RETURN_TO_FRONT = true;
const SHOW_ARMS = true;     // false = hands bilkul hata do

const MESSAGES = [
  "Hello 👋",
  "I'm Harshit Upadhyay",
  "I build AI systems",
  "RAG · Agents · LLMOps",
  "Open to software roles",
];
/* ============================================= */

/* ---------- Textures ---------- */
function useSpeckleTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const g = c.getContext("2d");
    g.fillStyle = "#f2f2f2";
    g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 900; i++) {
      g.fillStyle = `rgba(110,110,110,${Math.random() * 0.4})`;
      g.beginPath();
      g.arc(Math.random() * 512, Math.random() * 512, Math.random() * 1.6 + 0.3, 0, Math.PI * 2);
      g.fill();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function useHeadTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(200, 190, 20, 256, 256, 330);
    grad.addColorStop(0, "#9dffc4");
    grad.addColorStop(0.5, "#b6ff2a");
    grad.addColorStop(1, "#d6f000");
    g.fillStyle = grad;
    g.fillRect(0, 0, 512, 512);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

/* ---------- Arm (shoulder, upper arm, elbow, forearm, hand) ---------- */
function Arm({ side }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // halka swing, dono arms ulte phase me
    ref.current.rotation.x = Math.sin(t * 1.2 + (side > 0 ? 0 : Math.PI)) * 0.08;
  });

  const white = { color: "#f6f6f6", roughness: 0.35, clearcoat: 0.7, clearcoatRoughness: 0.3 };
  const dark = { color: "#2a2a2e", roughness: 0.5, metalness: 0.3 };

  return (
    <group position={[side * 0.9, 0.2, 0.02]} rotation={[0, 0, side * 0.32]}>
      <group ref={ref}>
        {/* shoulder joint */}
        <mesh>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshStandardMaterial {...dark} />
        </mesh>

        {/* upper arm */}
        <mesh position={[0, -0.27, 0]}>
          <cylinderGeometry args={[0.1, 0.085, 0.4, 32]} />
          <meshPhysicalMaterial {...white} />
        </mesh>

        {/* elbow */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial {...dark} />
        </mesh>

        {/* forearm */}
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.085, 0.075, 0.32, 32]} />
          <meshPhysicalMaterial {...white} />
        </mesh>

        {/* wrist */}
        <mesh position={[0, -0.88, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.04, 32]} />
          <meshStandardMaterial {...dark} />
        </mesh>

        {/* hand */}
        <mesh position={[0, -1.02, 0]} scale={[1, 1.1, 0.85]}>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshPhysicalMaterial {...white} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Robot (3D, drag se rotate) ---------- */
function Robot({ drag }) {
  const speckle = useSpeckleTexture();
  const headTex = useHeadTexture();
  const rot = useRef();
  const head = useRef();

  useFrame((state, dt) => {
    const d = drag.current;
    const t = state.clock.elapsedTime;
    if (!rot.current) return;

    if (!d.active && RETURN_TO_FRONT) {
      d.ry = THREE.MathUtils.damp(d.ry, 0, 2.2, dt);
      d.rx = THREE.MathUtils.damp(d.rx, 0, 2.2, dt);
    }

    const sway = d.active ? 0 : Math.sin(t * 0.8) * 0.12;
    rot.current.rotation.y = d.ry + sway;
    rot.current.rotation.x = d.rx;

    if (head.current) {
      head.current.rotation.z = Math.sin(t * 1.1) * 0.05;
      head.current.position.y = 1.3 + Math.sin(t * 1.6) * 0.02;
    }
  });

  return (
    <group position={[0, -0.5, 0]} scale={ROBOT_SCALE}>
      {/* ground glow */}
      <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 1.15, 64]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.12} depthWrite={false} />
      </mesh>

      <group ref={rot}>
        {/* Body */}
        <mesh scale={[1, 1.05, 1]}>
          <sphereGeometry args={[0.95, 96, 96]} />
          <meshPhysicalMaterial
            map={speckle}
            bumpMap={speckle}
            bumpScale={0.6}
            roughness={0.45}
            clearcoat={0.5}
            clearcoatRoughness={0.4}
          />
        </mesh>

        {/* Chest ring + core */}
        <mesh position={[0, -0.05, 0.9]}>
          <torusGeometry args={[0.2, 0.025, 16, 48]} />
          <meshBasicMaterial color={EYE_COLOR} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.05, 0.92]} scale={[1, 1, 0.4]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <meshBasicMaterial color={EYE_COLOR} toneMapped={false} />
        </mesh>

        {/* Arms */}
        {SHOW_ARMS && (
          <>
            <Arm side={-1} />
            <Arm side={1} />
          </>
        )}

        {/* Neck ring */}
        <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.08, 24, 64]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Head */}
        <group ref={head} position={[0, 1.3, 0]}>
          <mesh>
            <sphereGeometry args={[0.58, 64, 64]} />
            <meshStandardMaterial
              map={headTex}
              emissive="#b6ff2a"
              emissiveIntensity={0.4}
              roughness={0.25}
            />
          </mesh>

          {/* Eyes */}
          {[-0.2, 0.2].map((x) => (
            <mesh key={x} position={[x, 0.1, 0.55]} scale={[1, 1.5, 0.35]}>
              <sphereGeometry args={[0.07, 32, 32]} />
              <meshBasicMaterial color={EYE_COLOR} toneMapped={false} />
            </mesh>
          ))}

          {/* Glass shell */}
          <mesh>
            <sphereGeometry args={[0.63, 64, 64]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.14}
              roughness={0.05}
              clearcoat={1}
              depthWrite={false}
            />
          </mesh>

          {/* Ear pieces */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.63, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
              <meshStandardMaterial color="#e8e8e8" roughness={0.3} metalness={0.3} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

/* ---------- Chat bubble (fixed, typing effect) ---------- */
function Bubble() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const full = MESSAGES[msgIndex];
    let n = 0;
    let hold;
    const typer = setInterval(() => {
      n++;
      setText(full.slice(0, n));
      if (n >= full.length) {
        clearInterval(typer);
        hold = setTimeout(() => setMsgIndex((p) => (p + 1) % MESSAGES.length), 1800);
      }
    }, 55);
    return () => {
      clearInterval(typer);
      clearTimeout(hold);
    };
  }, [msgIndex]);

  return (
    <Html position={BUBBLE_POS} center zIndexRange={[100, 0]}>
      <style>{`
        @keyframes caret { 50% { opacity: 0; } }
        @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      `}</style>

      <div style={{ position: "relative", animation: "floaty 3.5s ease-in-out infinite" }}>
        <div
          style={{
            width: 215,
            height: 48,
            padding: "0 18px",
            display: "flex",
            alignItems: "center",
            borderRadius: 16,
            background: "rgba(245,245,245,0.95)",
            color: "#111",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.45), 0 0 0 1px rgba(249,115,22,0.5)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {text}
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 16,
              marginLeft: 3,
              background: "#f97316",
              animation: "caret 0.9s infinite",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 22,
            bottom: -8,
            width: 16,
            height: 16,
            background: "rgba(245,245,245,0.95)",
            transform: "rotate(45deg)",
            borderRadius: 3,
          }}
        />
      </div>
    </Html>
  );
}

/* ---------- Tech chips (orbit) ---------- */
const ICONS = {
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  cpu: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </>
  ),
  flow: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M9 6h5a4 4 0 0 1 4 4v5" />
    </>
  ),
  terminal: <path d="m4 17 6-6-6-6M12 19h8" />,
  db: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
};

const NODES = [
  { label: "Chatbot", sub: "Conversational UI", icon: "chat", pos: [-2.4, 1.6, 0.5], color: "#f97316" },
  { label: "RAG", sub: "Retrieval pipeline", icon: "search", pos: [2.3, 1.7, -0.4], color: "#f97316" },
  { label: "LLM", sub: "Inference & evals", icon: "cpu", pos: [2.5, -0.7, 0.7], color: "#f97316" },
  { label: "Agents", sub: "Plan · act · reason", icon: "flow", pos: [-2.4, -0.5, -0.6], color: "#38bdf8" },
  { label: "Tools", sub: "Function calling", icon: "terminal", pos: [0.3, 2.5, -1.0], color: "#38bdf8" },
  { label: "Memory", sub: "Vector store", icon: "db", pos: [-0.6, -2.3, 0.6], color: "#c084fc" },
];

function Chip({ node }) {
  const groupRef = useRef();
  const divRef = useRef();
  const v = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!groupRef.current || !divRef.current) return;
    groupRef.current.getWorldPosition(v);
    const t = THREE.MathUtils.clamp((v.z + 3) / 6, 0, 1);
    divRef.current.style.opacity = String(0.4 + t * 0.6);
    divRef.current.style.transform = `scale(${0.88 + t * 0.12})`;
  });

  return (
    <group ref={groupRef} position={node.pos}>
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.075, 24, 24]} />
        <meshBasicMaterial color={node.color} toneMapped={false} />
      </mesh>

      <Html center zIndexRange={[50, 0]} style={{ pointerEvents: "none" }}>
        <div
          ref={divRef}
          style={{
            marginTop: -50,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 11px 7px 8px",
            borderRadius: 11,
            background: "rgba(16,16,18,0.72)",
            border: `1px solid ${node.color}55`,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            whiteSpace: "nowrap",
            userSelect: "none",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              display: "grid",
              placeItems: "center",
              background: `${node.color}1f`,
              border: `1px solid ${node.color}40`,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={node.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {ICONS[node.icon]}
            </svg>
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ color: "#fff", fontSize: 12.5, fontWeight: 600, letterSpacing: 0.2 }}>
              {node.label}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>{node.sub}</div>
          </div>
        </div>
      </Html>
    </group>
  );
}

function Orbit() {
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * ORBIT_SPEED;
  });

  return (
    <group ref={ref} scale={NODE_SCALE}>
      <mesh rotation={[Math.PI / 2.15, 0, 0]} position={[0, 0.2, 0]}>
        <torusGeometry args={[3.3, 0.006, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.3, 0]} position={[0, 0.2, 0]}>
        <torusGeometry args={[2.5, 0.005, 8, 160]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.14} />
      </mesh>

      {NODES.map((n) => (
        <group key={n.label}>
          <Line
            points={[[0, 0.3, 0], n.pos]}
            color={n.color}
            lineWidth={1}
            transparent
            opacity={0.3}
            dashed
            dashSize={0.12}
            gapSize={0.1}
          />
          <Chip node={n} />
        </group>
      ))}
    </group>
  );
}

/* ---------- Main ---------- */
export default function AgentBot3D() {
  const drag = useRef({ active: false, x: 0, y: 0, ry: 0, rx: 0 });
  const [grabbing, setGrabbing] = useState(false);

  const onDown = (e) => {
    const d = drag.current;
    d.active = true;
    d.x = e.clientX;
    d.y = e.clientY;
    setGrabbing(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    d.ry += (e.clientX - d.x) * DRAG_SPEED;
    d.rx = THREE.MathUtils.clamp(d.rx + (e.clientY - d.y) * DRAG_SPEED, -0.6, 0.6);
    d.x = e.clientX;
    d.y = e.clientY;
  };

  const onUp = (e) => {
    drag.current.active = false;
    setGrabbing(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  return (
    <div
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      style={{
        width: "100%",
        height: "100%",
        maxWidth: 640,
        maxHeight: 640,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
        cursor: grabbing ? "grabbing" : "grab",
        touchAction: "pan-y",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.3, CAMERA_Z], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <hemisphereLight args={["#ffffff", "#3a2a1a", 0.7]} />
        <directionalLight position={[4, 5, 5]} intensity={2.2} />
        <directionalLight position={[-5, 2, -4]} intensity={1.4} color="#ffb27a" />
        <pointLight position={[-4, 1, 3]} intensity={0.8} color="#b6ff2a" />
        <Robot drag={drag} />
        <Orbit />
        <Bubble />
      </Canvas>
    </div>
  );
}