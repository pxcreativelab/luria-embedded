# Luria Embedded - Componente de Chat Inteligente

<div align="center">
  <img src="public/luria_logo.svg" alt="Luria Logo" width="200"/>
  <br/>
  <p><strong>Componente React para integração de chat inteligente em qualquer aplicação</strong></p>
  <p>Powered by <a href="https://pxdata.ai">PXData</a></p>
</div>

## 🚀 Sobre o Luria Embedded

Luria Embedded é um componente React leve e flexível que permite integrar chat inteligente com IA em qualquer aplicação web. Desenvolvido pela PXData, oferece uma experiência de conversação natural e personalizável.

### ✨ Características Principais

- 🤖 **Chat Inteligente**: IA conversacional com contexto e memória
- 🎨 **Totalmente Customizável**: Design adaptável ao seu projeto
- 🔒 **Autenticação Integrada**: Sistema de login e refresh token automático
- 🌐 **Multi-idioma**: Suporte para português, inglês e espanhol
- ⚡ **Performance Otimizada**: Bundle otimizado e carregamento rápido
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- 🔌 **Fácil Integração**: Instalação simples via npm ou CDN

## 📦 Instalação

### Via NPM

```bash
npm install luria-embedded
```

### Via CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/luria-embedded@latest/dist/embedded/luria-embedded.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/luria-embedded@latest/dist/embedded/luria-embedded.umd.js"></script>
```

## 🚀 Uso Rápido

### React

```tsx
import { LuriaEmbedded } from 'luria-embedded';

function App() {
  return (
    <div>
      <h1>Minha Aplicação</h1>
      <LuriaEmbedded 
        apiUrl="https://api.luria.ai"
        theme="light"
        language="pt-BR"
      />
    </div>
  );
}
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/luria-embedded@latest/dist/embedded/luria-embedded.css">
</head>
<body>
  <div id="luria-chat"></div>
  
  <script src="https://cdn.jsdelivr.net/npm/luria-embedded@latest/dist/embedded/luria-embedded.umd.js"></script>
  <script>
    const { LuriaEmbedded } = window.LuriaEmbedded;
    
    ReactDOM.render(
      React.createElement(LuriaEmbedded, {
        apiUrl: 'https://api.luria.ai',
        theme: 'light',
        language: 'pt-BR'
      }),
      document.getElementById('luria-chat')
    );
  </script>
</body>
</html>
```

## ⚙️ Configuração

### Props Disponíveis

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `apiUrl` | string | - | URL da API do Luria (obrigatório) |
| `theme` | 'light' \| 'dark' | 'light' | Tema do componente |
| `language` | 'pt-BR' \| 'en' \| 'es' | 'pt-BR' | Idioma da interface |
| `position` | 'bottom-right' \| 'bottom-left' | 'bottom-right' | Posição do chat |
| `initialMessage` | string | - | Mensagem inicial |
| `onMessage` | function | - | Callback para novas mensagens |
| `onError` | function | - | Callback para erros |

### Exemplo Completo

```tsx
import { LuriaEmbedded } from 'luria-embedded';

function App() {
  const handleMessage = (message) => {
    console.log('Nova mensagem:', message);
  };

  const handleError = (error) => {
    console.error('Erro no chat:', error);
  };

  return (
    <LuriaEmbedded 
      apiUrl="https://api.luria.ai"
      theme="dark"
      language="en"
      position="bottom-left"
      initialMessage="Olá! Como posso ajudar?"
      onMessage={handleMessage}
      onError={handleError}
    />
  );
}
```

## 🎨 Personalização

### CSS Customizado

```css
/* Personalizar cores */
.luria-embedded {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --background-color: #ffffff;
  --text-color: #333333;
}

/* Personalizar tamanho */
.luria-chat-container {
  width: 400px;
  height: 600px;
}
```

### Temas

O componente suporta temas claro e escuro, e pode ser facilmente customizado através de CSS variables.

## 🔒 Autenticação

O componente gerencia automaticamente a autenticação e refresh de tokens. Para usar:

1. Configure a `apiUrl` correta
2. O componente fará login automático ou redirecionará para login
3. Tokens são gerenciados automaticamente

## 📱 Responsividade

O componente é totalmente responsivo e se adapta automaticamente a diferentes tamanhos de tela:

- **Desktop**: Chat em janela flutuante
- **Mobile**: Chat em tela cheia
- **Tablet**: Layout adaptativo

## 🚀 Performance

- **Bundle otimizado**: Apenas 4.2MB (1.3MB gzipped)
- **Tree shaking**: Apenas código necessário incluído
- **Lazy loading**: Componentes carregados sob demanda
- **Caching**: Assets otimizados para cache

## 🔧 Desenvolvimento

### Instalação Local

```bash
git clone https://github.com/pxcreativelab/luria-embedded.git
cd luria-embedded
npm install
npm run dev
```

### Build

```bash
npm run build:embedded
```

### Scripts Disponíveis

```bash
npm run dev              # Desenvolvimento
npm run build:embedded   # Build do componente
npm run lint             # Linting
npm run type-check       # Verificação de tipos
```

## 📚 Exemplos

Veja exemplos práticos na pasta `examples/`:

- [Exemplo Básico](examples/embedded/cdn-example.html)
- [Integração React](examples/embedded/react-integration.tsx)
- [Teste de Produção](examples/embedded/production-test.html)

## 🤝 Suporte

- **Documentação**: [docs.luria.ai](https://docs.luria.ai)
- **Issues**: [GitHub Issues](https://github.com/pxcreativelab/luria-embedded/issues)
- **Email**: support@pxdata.ai

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🏢 Sobre a PXData

PXData é uma empresa especializada em inteligência artificial e inteligência competitiva. A Luria Embedded é parte do ecossistema Luria, nossa plataforma completa de IA conversacional.

---

<div align="center">
  <p>Desenvolvido pela equipe PXData</p>
  <p>
    <a href="https://pxdata.ai">PXData</a> •
    <a href="https://luria.ai">Luria</a>
  </p>
</div> 