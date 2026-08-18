const bar = document.querySelector("#bar");
const nav = document.querySelector("#navbar");
const theme = document.querySelector("#theme");

bar.addEventListener("click", () => {
  nav.classList.toggle("active");
});

if (theme) {
  theme.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      theme.classList.remove("fa-circle-half-stroke");
      theme.classList.add("fa-sun");
    } else {
      theme.classList.add("fa-circle-half-stroke");
      theme.classList.remove("fa-sun");
    }
  });
}

// --- THREE.JS HERO SCENE ---
function initHero3D() {
  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // performance optimization
  container.appendChild(renderer.domElement);

  // Group for rotation
  const ecosystemGroup = new THREE.Group();
  scene.add(ecosystemGroup);

  // Center Core (YH AI CORE)
  const coreGeometry = new THREE.IcosahedronGeometry(2, 1);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffcc,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  ecosystemGroup.add(core);

  // Core Glow (simple particle)
  const glowGeo = new THREE.SphereGeometry(2.5, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.1,
    blending: THREE.AdditiveBlending
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  ecosystemGroup.add(glow);

  // Nodes
  const nodeCount = 8;
  const radius = 6;
  const nodes = [];

  const nodeGeo = new THREE.SphereGeometry(0.4, 16, 16);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // Lines material
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.3
  });

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;

    // Create Node
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.x = Math.cos(angle) * radius;
    node.position.y = Math.sin(angle * 2) * 2; // Add some wave
    node.position.z = Math.sin(angle) * radius;

    // Create Line to core
    const points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(node.position);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeo, lineMat);

    ecosystemGroup.add(line);
    ecosystemGroup.add(node);

    nodes.push({
      mesh: node,
      angle: angle,
      speed: 0.01 + Math.random() * 0.01,
      yOffset: Math.random() * Math.PI * 2
    });
  }

  // Animation Loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);

    time += 0.01;

    // Rotate core
    core.rotation.x += 0.005;
    core.rotation.y += 0.01;

    // Rotate entire group slowly
    ecosystemGroup.rotation.y += 0.002;
    ecosystemGroup.rotation.x = Math.sin(time * 0.5) * 0.1;

    // Animate nodes
    nodes.forEach((n, i) => {
      n.mesh.position.y = Math.sin(time + n.yOffset) * 1.5;

      // Update line positions
      // Line is at index: core (0), glow (1), line(2), node(3), line(4), node(5)...
      const lineIndex = 2 + (i * 2);
      const line = ecosystemGroup.children[lineIndex];
      const positions = line.geometry.attributes.position.array;
      positions[3] = n.mesh.position.x;
      positions[4] = n.mesh.position.y;
      positions[5] = n.mesh.position.z;
      line.geometry.attributes.position.needsUpdate = true;
    });

    renderer.render(scene, camera);
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

// --- ECOSYSTEM PANEL LOGIC ---
const ecoData = {
  ai: {
    title: "AI",
    items: ["AI Agents", "AI Assistants", "AI Tutors", "AI Business Intelligence"]
  },
  automation: {
    title: "AUTOMATION",
    items: ["Business Automation", "Workflow Automation", "Marketing Automation", "Communication Automation"]
  },
  software: {
    title: "SOFTWARE",
    items: ["Web Apps", "Mobile Apps", "Dashboards", "SaaS Platforms"]
  },
  smart: {
    title: "SMART SPACES",
    items: ["Home Automation", "Office Automation", "Smart Energy", "IoT Systems"]
  },
  creative: {
    title: "CREATIVE AI",
    items: ["AI Content", "AI Images", "AI Video", "Product Visualization"]
  },
  mobility: {
    title: "MOBILITY",
    items: ["EV Charging", "Connected Devices", "Smart Mobility"]
  }
};

function openEcoPanel(moduleKey) {
  const panel = document.getElementById('eco-panel');
  const title = document.getElementById('eco-panel-title');
  const list = document.getElementById('eco-panel-list');

  const data = ecoData[moduleKey];
  if(!data) return;

  title.innerText = data.title;
  list.innerHTML = data.items.map(item => `<li>${item}</li>`).join('');

  panel.classList.remove('hidden');
}

function closeEcoPanel() {
  document.getElementById('eco-panel').classList.add('hidden');
}

// --- AUTOMATION WORKFLOW ANIMATION ---
function initWorkflowAnimation() {
  const steps = 7;
  let currentStep = 1;

  setInterval(() => {
    // Reset all
    for(let i=1; i<=steps; i++) {
      document.getElementById(`step${i}`)?.classList.remove('active');
      if(i < steps) {
        document.getElementById(`line${i}`)?.classList.remove('active');
      }
    }

    // Animate up to current
    for(let i=1; i<=currentStep; i++) {
      document.getElementById(`step${i}`)?.classList.add('active');
      if(i < currentStep) {
        document.getElementById(`line${i}`)?.classList.add('active');
      }
    }

    currentStep++;
    if(currentStep > steps) {
      setTimeout(() => { currentStep = 1; }, 2000); // pause before restart
    }
  }, 1000);
}

// --- LIVE VISUALIZER LOGIC ---
function initLiveVisualizer() {
  const timeEl = document.getElementById('dash-time');
  const tasksEl = document.getElementById('stat-tasks');
  const logsEl = document.getElementById('dash-logs');

  if(!timeEl || !tasksEl || !logsEl) return;

  let tasksCompleted = 8420;

  const logMessages = [
    "Agent [Research] completed market scan.",
    "Workflow [Marketing] generated 5 social posts.",
    "Agent [Sales] updated CRM lead score: +15.",
    "System optimized database queries.",
    "Agent [Execution] deployed minor patch.",
    "Workflow [Support] resolved ticket #4029.",
    "Smart Energy module adjusted HVAC settings."
  ];

  // Update Clock
  setInterval(() => {
    const now = new Date();
    timeEl.innerText = now.toTimeString().split(' ')[0];
  }, 1000);

  // Update Stats & Logs
  setInterval(() => {
    // Randomly increment tasks
    if(Math.random() > 0.5) {
      tasksCompleted += Math.floor(Math.random() * 3) + 1;
      tasksEl.innerText = tasksCompleted.toLocaleString();
    }

    // Add log
    if(Math.random() > 0.7) {
      const log = document.createElement('div');
      log.className = 'log-entry';
      const timeStr = new Date().toTimeString().split(' ')[0];
      const msg = logMessages[Math.floor(Math.random() * logMessages.length)];
      log.innerHTML = `<span class="timestamp">[${timeStr}]</span> <span class="action">SYS:</span> ${msg}`;

      logsEl.prepend(log);

      // keep only last 6 logs
      if(logsEl.children.length > 6) {
        logsEl.removeChild(logsEl.lastChild);
      }
    }
  }, 2000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initHero3D();
  initWorkflowAnimation();
  initLiveVisualizer();
});
