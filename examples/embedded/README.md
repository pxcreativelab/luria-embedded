# Luria Embedded - Integração com Refresh Token

Este documento explica como integrar o Luria Embedded com suporte a refresh token para renovação automática de autenticação.

## Visão Geral

O Luria Embedded agora suporta refresh token para renovação automática de tokens expirados, seguindo a mesma lógica da plataforma principal. Quando um token expira (erro 401), o sistema automaticamente tenta renovar o token usando o refresh token fornecido.

## Configuração

### 1. Configuração Básica

```javascript
const config = {
    authMode: 'token', // ou 'postMessage'
    apiBaseUrl: 'https://sua-api.com',
    token: 'seu-access-token',
    refreshToken: 'seu-refresh-token', // Novo parâmetro
    // ... outras configurações
};

window.LuriaEmbedded.init(config);
window.LuriaEmbedded.render('#container');
```

### 2. Modo PostMessage

Se você estiver usando `authMode: 'postMessage'`, o refresh token será solicitado automaticamente quando necessário:

```javascript
// Configuração
const config = {
    authMode: 'postMessage',
    apiBaseUrl: 'https://sua-api.com',
    refreshToken: 'seu-refresh-token',
    // ... outras configurações
};

// Listener para solicitação de refresh
window.addEventListener('message', function(event) {
    if (event.data.type === 'LURIA_REQUEST_REFRESH_TOKEN') {
        // Fazer chamada para renovar o token
        refreshUserToken().then(response => {
            window.postMessage({
                type: 'LURIA_REFRESH_TOKEN_RESPONSE',
                payload: {
                    success: true,
                    token: response.access_token,
                    refreshToken: response.refresh_token
                }
            }, '*');
        }).catch(error => {
            window.postMessage({
                type: 'LURIA_REFRESH_TOKEN_RESPONSE',
                payload: {
                    success: false,
                    error: error.message
                }
            }, '*');
        });
    }
});
```

## Fluxo de Renovação Automática

### 1. Detecção de Token Expirado
- Quando uma requisição retorna erro 401, o sistema detecta automaticamente
- O refresh token é verificado se está disponível

### 2. Tentativa de Renovação
- **Modo PostMessage**: Solicita novo token via PostMessage
- **Modo Token**: Faz chamada direta para `/auth/implicit` com refresh token

### 3. Atualização de Tokens
- Se bem-sucedido, o novo token é aplicado automaticamente
- A requisição original é reenviada com o novo token
- O refresh token é atualizado se fornecido na resposta

### 4. Falha na Renovação
- Se a renovação falhar, o parent é notificado via `LURIA_TOKEN_EXPIRED`
- O usuário pode ser redirecionado para login

## Tipos de Mensagens

### Mensagens Enviadas pelo Embedded

```javascript
// Solicitação de refresh token
{
    type: 'LURIA_REQUEST_REFRESH_TOKEN',
    payload: {
        timestamp: Date.now(),
        reason: 'expired' | 'manual' | 'auto'
    }
}

// Notificação de token expirado
{
    type: 'LURIA_TOKEN_EXPIRED',
    payload: {
        timestamp: Date.now(),
        error: 'Descrição do erro'
    }
}
```

### Mensagens Recebidas pelo Embedded

```javascript
// Resposta de refresh token
{
    type: 'LURIA_REFRESH_TOKEN_RESPONSE',
    payload: {
        success: boolean,
        token?: string,
        refreshToken?: string,
        error?: string
    }
}

// Atualização de token
{
    type: 'LURIA_TOKEN_UPDATE',
    payload: {
        token: string,
        refreshToken?: string,
        expiresAt?: number
    }
}
```

## API Methods

### Atualização Programática

```javascript
// Atualizar token
window.LuriaEmbedded.updateToken('novo-token', 'novo-refresh-token');

// Atualizar apenas refresh token
window.LuriaEmbedded.updateRefreshToken('novo-refresh-token');
```

## Exemplo Completo

```html
<!DOCTYPE html>
<html>
<head>
    <title>Luria Embedded com Refresh Token</title>
</head>
<body>
    <div id="chat-container"></div>
    
    <script src="luria-embedded.js"></script>
    <script>
        // Configuração
        const config = {
            authMode: 'postMessage',
            apiBaseUrl: 'https://api.luria.ai',
            refreshToken: 'seu-refresh-token-inicial',
            theme: 'light',
            showSidebar: false,
            hideNavigation: true
        };

        // Inicializar
        window.LuriaEmbedded.init(config);
        window.LuriaEmbedded.render('#chat-container');

        // Listener para refresh token
        window.addEventListener('message', function(event) {
            if (event.data.type === 'LURIA_REQUEST_REFRESH_TOKEN') {
                // Simular chamada para renovar token
                fetch('/api/auth/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        refresh_token: 'seu-refresh-token-atual' 
                    })
                })
                .then(response => response.json())
                .then(data => {
                    window.postMessage({
                        type: 'LURIA_REFRESH_TOKEN_RESPONSE',
                        payload: {
                            success: true,
                            token: data.access_token,
                            refreshToken: data.refresh_token
                        }
                    }, '*');
                })
                .catch(error => {
                    window.postMessage({
                        type: 'LURIA_REFRESH_TOKEN_RESPONSE',
                        payload: {
                            success: false,
                            error: error.message
                        }
                    }, '*');
                });
            }
        });
    </script>
</body>
</html>
```

## Considerações de Segurança

1. **Armazenamento Seguro**: Sempre armazene refresh tokens de forma segura
2. **HTTPS**: Use sempre HTTPS para transmissão de tokens
3. **Expiração**: Refresh tokens devem ter tempo de expiração adequado
4. **Rotação**: Considere rotacionar refresh tokens periodicamente

## Troubleshooting

### Token não é renovado
- Verifique se o refresh token está sendo fornecido na configuração
- Confirme se o endpoint de refresh está funcionando
- Verifique os logs do console para erros

### Loop infinito de refresh
- Verifique se o refresh token não está expirado
- Confirme se a resposta do refresh está correta
- Verifique se não há conflitos de configuração

### Erro 401 persistente
- Verifique se o refresh token é válido
- Confirme se o endpoint `/auth/implicit` está acessível
- Verifique se as credenciais estão corretas 