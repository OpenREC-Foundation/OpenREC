# Packs da Comunidade

Packs são coleções de efeitos, transições, sons, fontes e configurações de IA criados pela comunidade.

## Instalando um Pack

1. Acesse o **Hub** no aplicativo
2. Navegue ou pesquise por packs
3. Clique em **Instalar**
4. O pack fica disponível imediatamente no editor

## Criando um Pack

Estrutura de um pack:

```

meu-pack.openrecpack
├── effects/
├── transitions/
├── sounds/
├── fonts/
├── ai-rules.json
└── config.json

```

O arquivo `config.json` define metadados e parâmetros que a IA usará como estilo de edição.

### Exemplo de config.json

```json
{
  "name": "Gaming Extreme",
  "version": "1.2.0",
  "author": "criadorxyz",
  "description": "Cortes rápidos, zooms e memes",
  "category": "gaming",
  "ai_overrides": {
    "cut_interval": "0.8-2.0s",
    "zoom_intensity": "high"
  }
}
```

OpenREC Hub

O Hub é a loja comunitária integrada ao aplicativo. Ele mostra:

· Packs e plugins
· Criadores
· Avaliações
· Número de downloads
· Imagens de demonstração
