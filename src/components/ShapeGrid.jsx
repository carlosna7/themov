'use client'
import { useEffect, useRef } from 'react';

// Grade de quadrados animada do portfólio (porte do ShapeGrid do React Bits).
// O mouse é lido no elemento pai, porque o conteúdo fica por cima do canvas.
export default function ShapeGrid({
  squareSize = 56,
  speed = 0.3,
  borderColor = 'rgba(149, 171, 184, .12)',
  hoverFillColor = 'rgba(149, 171, 184, .22)',
  hoverTrailAmount = 6,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const area = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = reduceMotion ? 0 : speed;

    const offset = { x: 0, y: 0 };
    const opacities = new Map();
    let trail = [];
    let hovered = null;
    let mouse = null;
    let width = 0;
    let height = 0;
    let frame = null;
    let isVisible = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const cellAt = (x, y) => ({
      col: Math.floor((x - offset.x) / squareSize),
      row: Math.floor((y - offset.y) / squareSize),
    });

    const updateHover = () => {
      const cell = mouse ? cellAt(mouse.x, mouse.y) : null;
      const changed = !cell || !hovered || cell.col !== hovered.col || cell.row !== hovered.row;

      if (changed && hovered && hoverTrailAmount > 0) {
        trail = [hovered, ...trail].slice(0, hoverTrailAmount);
      }
      hovered = cell;
    };

    const updateOpacities = () => {
      const targets = new Map();

      if (hovered) targets.set(`${hovered.col},${hovered.row}`, 1);

      trail.forEach((cell, i) => {
        const key = `${cell.col},${cell.row}`;
        if (!targets.has(key)) targets.set(key, (trail.length - i) / (trail.length + 1));
      });

      targets.forEach((_, key) => {
        if (!opacities.has(key)) opacities.set(key, 0);
      });

      opacities.forEach((opacity, key) => {
        const next = opacity + ((targets.get(key) || 0) - opacity) * 0.15;
        if (next < 0.005) opacities.delete(key);
        else opacities.set(key, next);
      });
    };

    const draw = () => {
      const firstCol = Math.floor(-offset.x / squareSize) - 1;
      const firstRow = Math.floor(-offset.y / squareSize) - 1;
      const cols = Math.ceil(width / squareSize) + 2;
      const rows = Math.ceil(height / squareSize) + 2;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = borderColor;
      ctx.fillStyle = hoverFillColor;

      for (let col = firstCol; col < firstCol + cols; col++) {
        for (let row = firstRow; row < firstRow + rows; row++) {
          const x = Math.round(col * squareSize + offset.x) + 0.5;
          const y = Math.round(row * squareSize + offset.y) + 0.5;
          const alpha = opacities.get(`${col},${row}`);

          if (alpha) {
            ctx.globalAlpha = alpha;
            ctx.fillRect(x, y, squareSize, squareSize);
            ctx.globalAlpha = 1;
          }

          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }
    };

    const tick = () => {
      offset.x -= step;
      offset.y -= step;
      updateHover();
      updateOpacities();
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (isVisible && !document.hidden && !frame) frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = null;
    };

    const onMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onLeave = () => { mouse = null; };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => { resize(); draw(); };

    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      isVisible ? start() : stop();
    });
    observer.observe(canvas);

    resize();
    draw();

    return () => {
      stop();
      observer.disconnect();
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, [squareSize, speed, borderColor, hoverFillColor, hoverTrailAmount]);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
