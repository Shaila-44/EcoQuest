import React, { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setSize();
    window.addEventListener('resize', setSize);

    // Bioluminescent spores, golden XP motes, drifting leaves
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 12 + 4,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.2,
      opacity: Math.random() * 0.6 + 0.2,
      type: Math.random() > 0.6 ? 'leaf' : Math.random() > 0.3 ? 'xp_mote' : 'spore',
      color: Math.random() > 0.6 ? '#10b981' : Math.random() > 0.3 ? '#fbbf24' : '#6ee7b7',
      pulse: Math.random() * Math.PI
    }));

    const drawParticle = (ctx, p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      
      const currentOpacity = p.opacity * (0.8 + 0.2 * Math.sin(p.pulse));
      ctx.globalAlpha = Math.max(0.1, currentOpacity);

      if (p.type === 'xp_mote') {
        // Golden XP Sparkle Mote
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 1.5);
        grad.addColorStop(0, '#fef08a');
        grad.addColorStop(0.5, '#fbbf24');
        grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'spore') {
        // Bioluminescent Emerald Spore
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 1.8);
        grad.addColorStop(0, '#a7f3d0');
        grad.addColorStop(0.4, '#10b981');
        grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 1.8, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Drifting Fantasy Leaf Silhouette
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(
          p.size * 0.9, -p.size * 0.4,
          p.size * 0.9, p.size * 0.6,
          0, p.size
        );
        ctx.bezierCurveTo(
          -p.size * 0.9, p.size * 0.6,
          -p.size * 0.9, -p.size * 0.4,
          0, -p.size
        );
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        p.pulse += 0.03;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        drawParticle(ctx, p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}

