import React from "react";

export default function Button({
  type,
  onClick,
  className,
  icon,
  iconClass,
  text,
  badge,
  arrow,
  children,
  style,
}) {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={className}
      style={{ style }}
    >
      {icon || iconClass ? (
        <i className={iconClass || "material-icons"}>{icon}</i>
      ) : (
        <></>
      )}
      {text && <span>{text}</span>}
      {badge && <sup className={badge.variant}>{badge.text}</sup>}
      {arrow && <small className="material-icons">{arrow}</small>}
      {children}
    </button>
  );
}
