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

    // Create leaf / particle objects
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 14 + 6,
      speedX: Math.random() * 0.6 - 0.3,
      speedY: Math.random() * 0.6 + 0.3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.4 + 0.15,
      type: Math.random() > 0.4 ? 'leaf' : 'orb',
      color: Math.random() > 0.5 ? '#10b981' : '#6ee7b7'
    }));

    const drawLeaf = (ctx, particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.globalAlpha = particle.opacity;

      if (particle.type === 'orb') {
        // Soft glowing particle orb
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Vector leaf outline fill
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.moveTo(0, -particle.size);
        ctx.bezierCurveTo(
          particle.size * 0.8, -particle.size * 0.5,
          particle.size * 0.8, particle.size * 0.5,
          0, particle.size
        );
        ctx.bezierCurveTo(
          -particle.size * 0.8, particle.size * 0.5,
          -particle.size * 0.8, -particle.size * 0.5,
          0, -particle.size
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

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        drawLeaf(ctx, p);
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
      style={{ opacity: 0.85 }}
    />
  );
}
