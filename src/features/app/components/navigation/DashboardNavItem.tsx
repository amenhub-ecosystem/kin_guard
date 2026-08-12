// components/Dashboard/DashboardNavItem.tsx
import React from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';

interface DashboardNavItemProps extends Omit<NavLinkProps, 'className'> {
  label: string;
  icon: React.ReactNode;
  className?: string;
}

export const DashboardNavItem: React.FC<DashboardNavItemProps> = ({
  to,
  label,
  icon,
  className,
  ...rest
}) => {
  return (
    <NavLink to={to} {...rest}>
      {({ isActive }) => {
        const hasExplicitTextColor = Boolean(
          className?.match(/\btext-(?:\[[^\]]+\]|[^\s]+)/)
        );

        const stateClasses = isActive
          ? `bg-white/10 ${hasExplicitTextColor ? '' : 'text-white'} font-medium`
          : `${hasExplicitTextColor ? '' : 'text-white/70 hover:text-white'} hover:bg-white/5 font-normal`;

        const base = `flex flex-row items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 w-full ${className ? `${className} ` : ''}${stateClasses}`;
        const iconClass = isActive ? 'text-white' : 'text-white/70';

        let renderedIcon = icon;

        if (React.isValidElement(icon)) {
          const existingProps = (icon as React.ReactElement<any>).props || {};
          const mergedClassName = [existingProps.className, iconClass]
            .filter(Boolean)
            .join(' ');

          renderedIcon = React.cloneElement(icon as React.ReactElement<any>, {
            className: mergedClassName,
            color: isActive && !hasExplicitTextColor ? 'white' : existingProps.color,
          });
        } else {
          renderedIcon = <span className={iconClass}>{icon}</span>;
        }

        return (
          <span className={base}>
            <span className="flex items-center justify-center shrink-0 w-5 h-5">
              {renderedIcon}
            </span>
            <span className="text-[16px] leading-6 tracking-[0.0039em]">
              {label}
            </span>
          </span>
        );
      }}
    </NavLink>
  );
};