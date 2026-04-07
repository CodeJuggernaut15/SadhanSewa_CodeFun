import React from 'react';

/**
 * Standardized Input Component for the Vehicle System.
 * Ensures consistent styling, spacing, and icon placement across all modules.
 * Demonstrates: Code Modularity (SoC) and SRP.
 */
const InputField = ({ label, icon: Icon, placeholder, type = "text", ...props }) => {
  return (
    <div className="input-group">
      <label className="label">{label}</label>
      <div className="relative">
        <input 
          type={type} 
          className="input" 
          placeholder={placeholder} 
          style={{ paddingRight: Icon ? '3rem' : '1rem' }}
          {...props} 
        />
        {Icon && (
          <span 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
            style={{ pointerEvents: 'none' }}
          >
            <Icon size={18} />
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
