---
name: 🐛 Reporte de Bug
about: Crie um reporte para nos ajudar a melhorar o Luria
title: '[BUG] '
labels: ['bug', 'triage']
assignees: ''
---

## 📋 Descrição do Bug

Uma descrição clara e concisa do que é o bug.

## 🔄 Passos para Reproduzir

1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## ✅ Comportamento Esperado

Uma descrição clara do que deveria acontecer.

## ❌ Comportamento Atual

Uma descrição clara do que está acontecendo.

## 📸 Screenshots

Se aplicável, adicione screenshots para ajudar a explicar o problema.

## 🖥️ Informações do Ambiente

**Desktop (complete as informações):**
 - OS: [ex: macOS 14.0]
 - Navegador: [ex: Chrome 120]
 - Versão do Luria: [ex: 1.0.4]
 - Modo de Integração: [ex: CDN/NPM]

**Mobile (complete as informações):**
 - Dispositivo: [ex: iPhone 15]
 - OS: [ex: iOS 17]
 - Navegador: [ex: Safari]
 - Versão do Luria: [ex: 1.0.4]

## 💻 Código de Exemplo

```html
<!-- Se aplicável, inclua código mínimo para reproduzir -->
<!DOCTYPE html>
<html>
<head>
    <title>Teste Luria</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/luria@latest/dist/embedded/luria-embedded.css">
</head>
<body>
    <div id="luria-chat"></div>
    
    <script src="https://cdn.jsdelivr.net/npm/luria@latest/dist/embedded/luria-embedded.umd.js"></script>
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

## 📝 Logs de Erro

Se houver erros no console, inclua-os aqui:

```
Error: [mensagem de erro]
    at [stack trace]
```

## 🔍 Contexto Adicional

Adicione qualquer outro contexto sobre o problema aqui.

## ✅ Checklist

- [ ] Verifiquei se o bug não foi já reportado
- [ ] Testei com a versão mais recente do Luria
- [ ] Reproduzi o bug em um ambiente limpo
- [ ] Incluí todas as informações necessárias
- [ ] Adicionei screenshots se aplicável
- [ ] Incluí código de exemplo se aplicável

---

**Obrigado por reportar este bug!** 🐛 