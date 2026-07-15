import { ReactNode, HTMLAttributes } from 'react';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  blur?: 'sm' | 'md' | 'lg';
}

const blurClasses = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-xl',
};

const GlassPanel = ({ children, blur = 'md', className = '', ...props }: GlassPanelProps) => {
  return (
    <div
      className={`bg-white/5 border border-white/10 rounded-2xl ${blurClasses[blur]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
