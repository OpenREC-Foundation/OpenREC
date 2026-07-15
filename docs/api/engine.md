# API da Engine

A engine do OpenREC expõe comandos via Tauri IPC e WebAssembly.

## Comandos Disponíveis

### Gravação

| Comando | Descrição |
|---------|-----------|
| `init_recorder` | Inicializa o gravador |
| `get_screen_sources` | Lista fontes de tela disponíveis |
| `start_recording` | Inicia a gravação |
| `stop_recording` | Para a gravação |
| `pause_recording` | Pausa a gravação |
| `resume_recording` | Retoma a gravação |
| `save_buffer` | Salva o conteúdo do buffer de replay |

### Editor

| Comando | Descrição |
|---------|-----------|
| `load_project` | Carrega um projeto |
| `save_project` | Salva um projeto |
| `get_timeline` | Obtém a timeline do projeto |
| `export_project` | Exporta o projeto |

### IA

| Comando | Descrição |
|---------|-----------|
| `analyze_project` | Analisa o projeto com IA |
| `apply_suggestion` | Aplica uma sugestão da IA |
| `super_resolution` | Executa super resolução |
| `enhance_audio` | Melhora o áudio com IA |
