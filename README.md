# Luria - Chat Inteligente Embutido

<div align="center">
  <img src="public/luria_logo.svg" alt="Luria Logo" width="200"/>
  <br/>
  <p><strong>Plataforma completa de automação e chat inteligente com IA</strong></p>
  <p>Powered by <a href="https://pxdata.com.br">PXData</a></p>
</div>

## 🚀 Sobre o Luria

Luria é uma plataforma completa de automação e chat inteligente que permite integrar IA conversacional em qualquer aplicação web através de um componente embutido simples e poderoso.

### ✨ Características Principais

- 🤖 **Chat Inteligente**: IA conversacional avançada com contexto e memória
- 🔧 **Fácil Integração**: Componente embutido via CDN ou NPM
- 🎨 **Personalização Total**: Whitelabel automático e customização visual
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- 🔒 **Seguro**: Autenticação robusta e comunicação segura
- 🌐 **Multi-idioma**: Suporte para português, inglês e espanhol
- ⚡ **Performance**: Otimizado para carregamento rápido

## 📦 Instalação

### Via CDN (Recomendado para uso simples)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Minha Aplicação com Luria</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/luria-embedded@latest/dist/embedded/luria-embedded.css">
</head>
<body>
    <div id="luria-chat"></div>
    
    <script src="https://cdn.jsdelivr.net/npm/luria-embedded@latest/dist/embedded/luria-embedded.umd.js"></script>
    <script>
        const config = {
            apiBaseUrl: 'https://api.luria.com.br',
            authMode: 'token',
            theme: 'light'
        };
        
        const luria = window.LuriaEmbedded.init(config);
        luria.render('#luria-chat');
    </script>
</body>
</html>
```

### Via NPM (Recomendado para projetos avançados)

```bash
npm install luria-embedded
```

```typescript
import { initLuriaEmbedded } from 'luria-embedded/embedded';
import 'luria-embedded/dist/embedded/luria-embedded.css';

const config = {
    apiBaseUrl: 'https://api.luria.com.br',
    authMode: 'token',
    theme: 'light'
};

const luria = initLuriaEmbedded(config);
luria.render('#luria-chat');
```

## 🎯 Casos de Uso

- **E-commerce**: Assistente de vendas e suporte ao cliente
- **SaaS**: Onboarding e suporte técnico automatizado
- **Educação**: Tutoria personalizada e dúvidas em tempo real
- **Saúde**: Triagem inicial e informações médicas
- **Financeiro**: Consultas e orientações financeiras
- **Imobiliário**: Busca de imóveis e agendamento de visitas

## 📚 Documentação

- [📖 Guia de Integração](examples/embedded/README.md)
- [🎨 Personalização e Whitelabel](examples/embedded/README.md#personalização)
- [🔒 Segurança e Autenticação](examples/embedded/README.md#segurança)
- [📱 Exemplos Práticos](examples/embedded/)
- [🔧 API Reference](examples/embedded/README.md#api)

## 🛠️ Tecnologias

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build**: Vite, Rollup
- **UI**: Radix UI, shadcn/ui
- **Estado**: TanStack Query, React Context
- **Internacionalização**: i18next

## 🤝 Contribuindo

Este repositório contém apenas o componente embedded público. Para contribuições no projeto principal, entre em contato com nossa equipe.

### Reportando Bugs

Use as [Issues do GitHub](https://github.com/pxcreativelab/luria-embedded/issues) para reportar bugs ou solicitar novas funcionalidades.

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

- 📧 **Email**: suporte@luria.ai
- 🌐 **Website**: [luria.ai](https://luria.ai)
- 📖 **Documentação**: [docs.luria.ai](https://docs.luria.ai)

## 🏢 Sobre a PXData

Luria é desenvolvido pela [PXData](https://pxdata.com.br), empresa especializada em soluções de IA e automação para empresas.

---

<div align="center">
  <p>Feito com ❤️ pela equipe Luria</p>
  <p>
    <a href="https://luria.ai">Website</a> •
    <a href="https://docs.luria.ai">Documentação</a> •
    <a href="https://pxdata.com.br">PXData</a>
  </p>
</div>
