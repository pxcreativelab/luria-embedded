# Política de Segurança - Luria

## 🛡️ Reportando uma Vulnerabilidade

A segurança é uma prioridade para o Luria. Se você descobriu uma vulnerabilidade de segurança, agradecemos que a reporte de forma responsável.

### Como Reportar

**NÃO** abra uma issue pública no GitHub para vulnerabilidades de segurança. Em vez disso, use um dos métodos privados abaixo:

### 📧 Email Seguro (Recomendado)

Envie um email detalhado para: **security@luria.ai**

### 🔐 PGP Key (Opcional)

Para comunicações mais seguras, você pode usar nossa chave PGP:

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
[Chave PGP será adicionada aqui]
-----END PGP PUBLIC KEY BLOCK-----
```

## 📋 Informações Necessárias

Para que possamos investigar e corrigir a vulnerabilidade rapidamente, inclua:

### Informações Básicas
- **Descrição**: Descrição clara da vulnerabilidade
- **Severidade**: Baixa, Média, Alta ou Crítica
- **Impacto**: O que pode ser afetado
- **Reprodução**: Passos para reproduzir o problema

### Informações Técnicas
- **Versão**: Versão do Luria afetada
- **Ambiente**: Navegador, sistema operacional, etc.
- **Configuração**: Configurações relevantes
- **Logs**: Logs de erro (se aplicável)

### Exemplo de Report

```
Assunto: [SECURITY] Vulnerabilidade XSS no componente embedded

Descrição:
Encontrei uma vulnerabilidade XSS no parâmetro de configuração...

Severidade: Alta

Impacto:
Permite execução de código JavaScript arbitrário...

Passos para Reproduzir:
1. Configure o Luria com...
2. Execute o seguinte código...
3. Observe o comportamento...

Versão: 1.0.4
Navegador: Chrome 120
Sistema: macOS 14.0

Configuração:
{
  "apiBaseUrl": "...",
  "customization": {
    "primaryColor": "javascript:alert('xss')"
  }
}
```

## ⏱️ Processo de Resposta

### Timeline

1. **24 horas**: Confirmação de recebimento
2. **72 horas**: Avaliação inicial e classificação
3. **7 dias**: Atualização sobre o progresso
4. **30 dias**: Resolução ou plano detalhado

### Comunicação

- Você receberá atualizações regulares sobre o progresso
- Seremos transparentes sobre o que está sendo feito
- Você será notificado quando a correção for lançada

## 🏆 Programa de Bug Bounty

### Elegibilidade

- Vulnerabilidades em componentes públicos
- Relatórios bem documentados
- Descobertas originais (não reportadas anteriormente)

### Recompensas

- **Crítica**: $500 - $1000
- **Alta**: $200 - $500
- **Média**: $50 - $200
- **Baixa**: $25 - $50

### Critérios de Avaliação

- **Impacto**: Quão séria é a vulnerabilidade
- **Probabilidade**: Quão fácil é explorar
- **Qualidade**: Qualidade do relatório
- **Originalidade**: Se é uma descoberta nova

## 🔒 Melhores Práticas de Segurança

### Para Desenvolvedores

1. **Validação**: Sempre valide inputs do usuário
2. **Sanitização**: Sanitize dados antes de renderizar
3. **HTTPS**: Use sempre HTTPS em produção
4. **CORS**: Configure CORS adequadamente
5. **Tokens**: Use tokens seguros e com expiração

### Para Usuários

1. **Atualizações**: Mantenha o Luria atualizado
2. **Configuração**: Use configurações seguras
3. **Tokens**: Não exponha tokens em código cliente
4. **Origem**: Configure `parentOrigin` corretamente

## 📚 Recursos de Segurança

### Documentação
- [Guia de Segurança](examples/embedded/README.md#segurança)
- [Configuração CORS](examples/embedded/README.md#cors)
- [Autenticação](examples/embedded/README.md#autenticação)

### Ferramentas
- [OWASP ZAP](https://owasp.org/www-project-zap/)
- [Burp Suite](https://portswigger.net/burp)
- [Security Headers](https://securityheaders.com/)

## 🏢 Contato da Equipe de Segurança

### Equipe Principal
- **Líder de Segurança**: security@luria.ai
- **CTO**: cto@luria.ai
- **Suporte**: suporte@luria.ai

### Escalação
Para questões urgentes ou críticas, entre em contato diretamente com nossa equipe de segurança.

## 📄 Histórico de Vulnerabilidades

### Versão 1.0.4 (Atual)
- Nenhuma vulnerabilidade conhecida

### Versões Anteriores
- Todas as vulnerabilidades conhecidas foram corrigidas

---

**Obrigado por ajudar a manter o Luria seguro!** 🛡️ 