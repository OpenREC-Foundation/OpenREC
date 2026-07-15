# Plugins

Plugins são extensões em WebAssembly que adicionam novas funcionalidades ao OpenREC.

## Instalando um Plugin

1. Vá até o **Hub** > **Plugins**
2. Escolha um plugin da comunidade
3. Revise as permissões solicitadas
4. Clique em **Instalar**

## Permissões de Segurança

Os plugins rodam em sandbox e precisam de permissão explícita para:

- Acessar microfone
- Capturar tela
- Acessar arquivos
- Usar rede

Exemplo de diálogo de permissão:

> "Este plugin deseja acessar o microfone e captura de tela. Permitir?"

## Criando um Plugin

Um plugin consiste em:

```

meu-plugin/
├── plugin.json
├── src/
│   └── lib.rs
└── Cargo.toml

```

O `plugin.json` define nome, versão, permissões e o arquivo WASM principal.
```
