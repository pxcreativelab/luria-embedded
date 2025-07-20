# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.4] - 2024-12-19

### ✨ Adicionado
- Suporte completo a whitelabel automático baseado na URL da API
- Detecção automática de configurações do tenant
- Aplicação automática de cores, favicon e nome da aplicação
- Suporte a temas light/dark via configuração
- Componente Toaster isolado com CSS próprio
- Build otimizado para UMD e ES modules
- Tipos TypeScript completos
- Documentação completa de integração

### 🔧 Melhorado
- Isolamento CSS completo com prefixos únicos
- Performance de carregamento otimizada
- Responsividade em dispositivos móveis
- Tratamento de erros mais robusto
- Comunicação PostMessage mais segura

### 🐛 Corrigido
- Problema de layout dividido com Toaster
- Chamadas duplicadas ao endpoint `/essentials`
- Configuração de tema não aplicada corretamente
- Caminhos de script incorretos em exemplos

### 📚 Documentação
- README principal atualizado
- Guia de integração completo
- Exemplos práticos de uso
- Documentação de API detalhada
- Guia de personalização e whitelabel

## [1.0.3] - 2024-12-18

### ✨ Adicionado
- Suporte inicial a whitelabel
- Configuração de tema via parâmetros
- Componente Toaster integrado

### 🔧 Melhorado
- Isolamento CSS melhorado
- Tratamento de erros

### 🐛 Corrigido
- Problemas de layout em containers específicos

## [1.0.2] - 2024-12-17

### ✨ Adicionado
- Build para ES modules
- Tipos TypeScript
- Exemplos de integração

### 🔧 Melhorado
- Configuração de build
- Documentação

## [1.0.1] - 2024-12-16

### ✨ Adicionado
- Primeira versão do componente embedded
- Build UMD básico
- CSS isolado

### 🔧 Melhorado
- Estrutura inicial do projeto

## [1.0.0] - 2024-12-15

### ✨ Adicionado
- Lançamento inicial do Luria Embedded
- Componente de chat básico
- Integração via CDN e NPM
- Documentação inicial

---

## Tipos de Mudanças

- **✨ Adicionado**: para novas funcionalidades
- **🔧 Melhorado**: para mudanças em funcionalidades existentes
- **🐛 Corrigido**: para correções de bugs
- **💥 Breaking**: para mudanças que quebram compatibilidade
- **📚 Documentação**: para mudanças na documentação
- **🎨 Estilo**: para mudanças que não afetam o código
- **♻️ Refatoração**: para refatorações de código
- **⚡ Performance**: para melhorias de performance
- **✅ Teste**: para adição ou correção de testes
- **🔧 Build**: para mudanças no sistema de build 