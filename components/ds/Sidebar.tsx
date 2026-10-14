'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import { Logo } from './Logo';
import { cx } from './geometry';

export interface NavItem {
  id?: string;
  label?: string;
  icon?: IconName;
  badge?: number | string;
  onClick?: () => void;
  section?: string;
  /** Renders the item as a link instead of a button */
  href?: string;
}

export interface SidebarProps {
  items: NavItem[];
  active?: string;
  onSelect?: (id: string, item: NavItem) => void;
  brand?: ReactNode;
  footer?: ReactNode;
  /** The nav's accessible name (default "Primary") */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Sidebar(props: SidebarProps) {
  const items = props.items || [];
  const controlled = props.active != null;
  const [state, setState] = useState<string | null>(items.length ? (items[0].id || items[0].label || null) : null);
  const active = controlled ? props.active : state;
  function pick(it: NavItem) {
    const id = it.id || it.label || '';
    if (!controlled) setState(id);
    if (props.onSelect) props.onSelect(id, it);
    if (it.onClick) it.onClick();
  }
  return (
    <nav className={cx('amb-sidebar', props.className)} style={props.style} aria-label={props.label || 'Primary'}>
      <div className="amb-sidebar-brand">{props.brand || <Logo variant="lockup" size={18} />}</div>
      <ul className="amb-nav">
        {items.map((it, i) => {
          if (it.section)
            return (
              <li key={'s' + i} className="amb-nav-section">
                {it.section}
              </li>
            );
          const id = it.id || it.label || String(i);
          const isActive = active === id;
          const body = (
            <>
              {it.icon ? <Icon name={it.icon} size={20} /> : null}
              <span>{it.label}</span>
              {it.badge != null ? <span className="amb-nav-badge">{it.badge}</span> : null}
            </>
          );
          return (
            <li key={id}>
              {it.href ? (
                <a href={it.href} className={cx('amb-nav-item', isActive && 'is-active')} aria-current={isActive ? 'page' : undefined} onClick={() => pick(it)}>
                  {body}
                </a>
              ) : (
                <button type="button" className={cx('amb-nav-item', isActive && 'is-active')} aria-current={isActive ? 'page' : undefined} onClick={() => pick(it)}>
                  {body}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {props.footer ? <div className="amb-sidebar-foot">{props.footer}</div> : null}
    </nav>
  );
}
