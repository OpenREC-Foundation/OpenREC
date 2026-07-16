interface Props { value?: string; onChange?: (v: string) => void; placeholder?: string; className?: string }
const SearchBar = ({ value, onChange, placeholder = 'Buscar...', className = '' }: Props) => {
  return (
    <div className={`relative ${className}`}>
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" value={value||''} onChange={e => onChange?.(e.target.value)} placeholder={placeholder} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-8 py-2 text-sm focus:outline-none focus:border-violet-500 placeholder-gray-500" />
    </div>
  );
};
export default SearchBar;
