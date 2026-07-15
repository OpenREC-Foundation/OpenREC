import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

const Card = ({ children, hover = false, className = '', ...props }: CardProps) => {
  return (
    <div
      className={`p-4 rounded-xl bg-white/5 border border-white/5 ${
        hover ? 'hover:border-violet-500/30 hover:bg-white/10 transition-all cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;