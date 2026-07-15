# Instalação

## Linux

### Flatpak (Recomendado)

```bash
flatpak install org.openrec.OpenREC
```

AppImage

Baixe a AppImage mais recente em openrec.org/download e torne executável:

```bash
chmod +x OpenREC-*.AppImage
./OpenREC-*.AppImage
```

A partir do código fonte

```bash
git clone https://github.com/openrec/openrec.git
cd openrec
cargo build --release
```

Web / PWA

Acesse app.openrec.org diretamente no navegador. Para instalar como PWA, use a opção "Instalar" no menu do navegador.

Requisitos de Sistema

Componente Mínimo Recomendado
RAM 4 GB 8 GB+
GPU Qualquer com Vulkan/DirectX 11 GPU com suporte a aceleração de hardware
Armazenamento 500 MB 2 GB+ (para projetos e cache)

Configuração Inicial

1. Abra o OpenREC
2. Configure as pastas de projetos e gravações
3. Ajuste as preferências de idioma e tema
4. Explore o Hub para baixar packs e plugins da comunidade

