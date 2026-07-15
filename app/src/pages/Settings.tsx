import { useState } from 'react';
import GlassPanel from '../components/ui/GlassPanel';
import Toggle from '../components/ui/Toggle';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true);
  const [language, setLanguage] = useState('pt-BR');

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>

      <GlassPanel className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Aparência</h2>
        <Toggle enabled={darkMode} onChange={setDarkMode} label="Modo escuro" />
      </GlassPanel>

      <GlassPanel className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Editor</h2>
        <Toggle enabled={autoSave} onChange={setAutoSave} label="Salvamento automático" />
        <Toggle enabled={hardwareAcceleration} onChange={setHardwareAcceleration} label="Aceleração por hardware" />
      </GlassPanel>

      <GlassPanel className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Idioma</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
        >
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </GlassPanel>
    </div>
  );
};

export default Settings;
