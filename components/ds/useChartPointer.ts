'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type RefObject } from 'react';

/**
 * Shared hover / touch / keyboard state for the charts (§7.4).
 * - Pointer move sets the hovered index; pointer leave clears it (mouse and pen only).
 * - On touch, a tap pins the tooltip to the nearest index; a tap on the same index or outside the chart dismisses it.
 * - Arrow keys move the index, Home/End jump, Escape clears.
 */
export function useChartPointer(ref: RefObject<HTMLDivElement | null>, count: number, indexAt: (clientX: number, clientY: number) => number) {
  const [index, setIndex] = useState<number | null>(null);
  const pinned = useRef(false);

  useEffect(() => {
    if (!pinned.current) return;
    function onDocDown(e: Event) {
      const el = ref.current;
      if (el && e.target instanceof Node && el.contains(e.target)) return;
      pinned.current = false;
      setIndex(null);
    }
    document.addEventListener('pointerdown', onDocDown, true);
    return () => document.removeEventListener('pointerdown', onDocDown, true);
  }, [index, ref]);

  const clamp = useCallback((i: number) => Math.max(0, Math.min(count - 1, i)), [count]);

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'touch') return;
      if (pinned.current) return;
      setIndex(clamp(indexAt(e.clientX, e.clientY)));
    },
    [clamp, indexAt],
  );

  const onPointerLeave = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || pinned.current) return;
    setIndex(null);
  }, []);

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== 'touch') return;
      const i = clamp(indexAt(e.clientX, e.clientY));
      if (pinned.current && index === i) {
        pinned.current = false;
        setIndex(null);
      } else {
        pinned.current = true;
        setIndex(i);
      }
    },
    [clamp, index, indexAt],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (count === 0) return;
      let next: number | null | undefined;
      switch (e.key) {
        case 'ArrowRight':
          next = index == null ? 0 : clamp(index + 1);
          break;
        case 'ArrowLeft':
          next = index == null ? count - 1 : clamp(index - 1);
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = count - 1;
          break;
        case 'Escape':
          next = null;
          break;
        default:
          return;
      }
      e.preventDefault();
      pinned.current = next != null;
      setIndex(next);
    },
    [clamp, count, index],
  );

  const onBlur = useCallback(() => {
    pinned.current = false;
    setIndex(null);
  }, []);

  return { index, handlers: { onPointerMove, onPointerLeave, onPointerDown, onKeyDown, onBlur } };
}
