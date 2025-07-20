import React, { useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import { 
  EmbeddedChatApp, 
  EmbeddedConfig, 
  EmbeddedTheme, 
  EmbeddedMessage,
  DEFAULT_EMBEDDED_CONFIG,
  mergeEmbeddedConfig 
} from '../../src/embedded';

interface LuriaEmbeddedReactProps {
  token: string;
  apiBaseUrl: string;
  agentId?: string;
  initialQuestion?: string;
  theme?: EmbeddedTheme;
  customization?: {
    hideHeader?: boolean;
    hideFooter?: boolean;
    customTitle?: string;
    compactMode?: boolean;
  };
  features?: {
    canvas?: boolean;
    pdfViewer?: boolean;
    exportExcel?: boolean;
    feedback?: boolean;
  };
  onMessage?: (message: EmbeddedMessage) => void;
  onReady?: () => void;
  onError?: (error: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const LuriaEmbeddedReact: React.FC<LuriaEmbeddedReactProps> = ({
  token,
  apiBaseUrl,
  agentId = 'pixie',
  initialQuestion,
  theme = 'system',
  customization = {},
  features = {},
  onMessage,
  onReady,
  onError,
  className = '',
  style = {}
}) => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<EmbeddedConfig | null>(null);
  const messageHandlerRef = useRef<((event: MessageEvent) => void) | null>(null);

  // Configuração do embedded chat
  useEffect(() => {
    const baseConfig = {
      authMode: 'postMessage' as const,
      apiBaseUrl,
      parentOrigin: window.location.origin,
      allowedOrigins: [window.location.origin],
      theme,
      defaultAgent: {
        id: agentId,
        name: agentId.charAt(0).toUpperCase() + agentId.slice(1),
        avatar: `/icons/agent-${agentId}.png`
      },
      initialQuestion,
      customization: {
        hideHeader: false,
        hideFooter: false,
        showTypingIndicator: true,
        showTimestamps: true,
        compactMode: false,
        floatingMode: false,
        ...customization
      },
      features: {
        canvas: true,
        pdfViewer: true,
        exportExcel: true,
        feedback: true,
        references: true,
        fileUpload: false,
        voiceInput: false,
        multipleAgents: true,
        history: true,
        search: true,
        ...features
      },
      security: {
        allowedOrigins: [window.location.origin],
        tokenExpiration: 24 * 60 * 60 * 1000, // 24 horas
        maxTokenRefresh: 5,
        csrfProtection: true,
      },
      debug: process.env.NODE_ENV === 'development'
    };

    const mergedConfig = mergeEmbeddedConfig(DEFAULT_EMBEDDED_CONFIG, baseConfig);
    setConfig(mergedConfig);
  }, [apiBaseUrl, agentId, initialQuestion, theme, customization, features]);

  // Handler para mensagens PostMessage
  const handleMessage = useCallback((event: MessageEvent) => {
    if (!event.data.type || !event.data.type.startsWith('LURIA_')) {
      return;
    }

    const message = event.data as EmbeddedMessage;
    console.log('[LuriaEmbeddedReact] Mensagem recebida:', message);

    // Chamar callback personalizado se fornecido
    if (onMessage) {
      onMessage(message);
    }

    // Processar mensagens específicas
    switch (message.type) {
      case 'LURIA_READY':
        setIsReady(true);
        setError(null);
        if (onReady) {
          onReady();
        }
        break;

      case 'LURIA_REQUEST_TOKEN':
        // Responder com token
        if (token) {
          event.source?.postMessage({
            type: 'LURIA_TOKEN_UPDATE',
            payload: { token },
            timestamp: Date.now()
          }, event.origin);
        } else {
          const errorMsg = 'Token não disponível';
          event.source?.postMessage({
            type: 'LURIA_TOKEN_ERROR',
            payload: { error: errorMsg },
            timestamp: Date.now()
          }, event.origin);
          setError(errorMsg);
          if (onError) {
            onError(errorMsg);
          }
        }
        break;

      case 'LURIA_TOKEN_ERROR':
        const tokenError = message.payload.error;
        setError(tokenError);
        if (onError) {
          onError(tokenError);
        }
        break;

      case 'LURIA_TOKEN_EXPIRED':
        const expiredError = 'Token expirado';
        setError(expiredError);
        if (onError) {
          onError(expiredError);
        }
        break;

      case 'LURIA_CHAT_EVENT':
        console.log('[LuriaEmbeddedReact] Evento do chat:', message.payload);
        break;

      case 'LURIA_RESIZE':
        console.log('[LuriaEmbeddedReact] Redimensionamento solicitado:', message.payload);
        break;

      default:
        console.log('[LuriaEmbeddedReact] Mensagem não processada:', message.type);
    }
  }, [token, onMessage, onReady, onError]);

  // Configurar listener de mensagens
  useEffect(() => {
    if (messageHandlerRef.current) {
      window.removeEventListener('message', messageHandlerRef.current);
    }

    messageHandlerRef.current = handleMessage;
    window.addEventListener('message', handleMessage);

    return () => {
      if (messageHandlerRef.current) {
        window.removeEventListener('message', messageHandlerRef.current);
        messageHandlerRef.current = null;
      }
    };
  }, [handleMessage]);

  // Métodos públicos via ref
  const updateToken = useCallback((newToken: string) => {
    window.postMessage({
      type: 'LURIA_TOKEN_UPDATE',
      payload: { token: newToken },
      timestamp: Date.now()
    }, window.location.origin);
  }, []);

  const updateTheme = useCallback((newTheme: EmbeddedTheme) => {
    window.postMessage({
      type: 'LURIA_THEME_CHANGE',
      payload: { theme: newTheme },
      timestamp: Date.now()
    }, window.location.origin);
  }, []);

  const updateConfig = useCallback((newConfig: Partial<EmbeddedConfig>) => {
    window.postMessage({
      type: 'LURIA_CONFIG_UPDATE',
      payload: { config: newConfig },
      timestamp: Date.now()
    }, window.location.origin);
  }, []);

  // Expor métodos via ref imperativo
  React.useImperativeHandle(ref, () => ({
    updateToken,
    updateTheme,
    updateConfig,
    isReady,
    error
  }));

  if (!config) {
    return (
      <div className={`luria-embedded-loading ${className}`} style={style}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando configuração...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`luria-embedded-container ${className}`} style={style}>
      {error && (
        <div className="luria-embedded-error bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Erro:</strong> {error}
        </div>
      )}
      
      <EmbeddedChatApp config={config} />
    </div>
  );
};

// Hook personalizado para usar o Luria Embedded
export const useLuriaEmbedded = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<EmbeddedMessage | null>(null);

  const handleMessage = useCallback((message: EmbeddedMessage) => {
    setLastMessage(message);
    
    if (message.type === 'LURIA_READY') {
      setIsReady(true);
      setError(null);
    } else if (message.type === 'LURIA_TOKEN_ERROR' || message.type === 'LURIA_TOKEN_EXPIRED') {
      setError(message.payload.error);
    }
  }, []);

  const handleReady = useCallback(() => {
    setIsReady(true);
    setError(null);
  }, []);

  const handleError = useCallback((error: string) => {
    setError(error);
    setIsReady(false);
  }, []);

  return {
    isReady,
    error,
    lastMessage,
    handleMessage,
    handleReady,
    handleError
  };
};

// Exemplo de uso avançado com Context
interface LuriaEmbeddedContextValue {
  isReady: boolean;
  error: string | null;
  updateToken: (token: string) => void;
  updateTheme: (theme: EmbeddedTheme) => void;
  sendMessage: (message: string) => void;
}

const LuriaEmbeddedContext = React.createContext<LuriaEmbeddedContextValue | null>(null);

export const LuriaEmbeddedProvider: React.FC<{
  children: React.ReactNode;
  config: EmbeddedConfig;
}> = ({ children, config }) => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateToken = useCallback((token: string) => {
    window.postMessage({
      type: 'LURIA_TOKEN_UPDATE',
      payload: { token },
      timestamp: Date.now()
    }, window.location.origin);
  }, []);

  const updateTheme = useCallback((theme: EmbeddedTheme) => {
    window.postMessage({
      type: 'LURIA_THEME_CHANGE',
      payload: { theme },
      timestamp: Date.now()
    }, window.location.origin);
  }, []);

  const sendMessage = useCallback((message: string) => {
    window.postMessage({
      type: 'LURIA_SEND_MESSAGE',
      payload: { message },
      timestamp: Date.now()
    }, window.location.origin);
  }, []);

  const value: LuriaEmbeddedContextValue = {
    isReady,
    error,
    updateToken,
    updateTheme,
    sendMessage
  };

  return (
    <LuriaEmbeddedContext.Provider value={value}>
      {children}
    </LuriaEmbeddedContext.Provider>
  );
};

export const useLuriaEmbeddedContext = () => {
  const context = React.useContext(LuriaEmbeddedContext);
  if (!context) {
    throw new Error('useLuriaEmbeddedContext deve ser usado dentro de LuriaEmbeddedProvider');
  }
  return context;
};

// Exemplo de componente que usa o contexto
export const LuriaEmbeddedStatus: React.FC = () => {
  const { isReady, error } = useLuriaEmbeddedContext();

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Erro:</strong> {error}
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <strong>Carregando:</strong> Aguarde enquanto o chat é inicializado...
      </div>
    );
  }

  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
      <strong>Pronto:</strong> Chat inicializado e pronto para uso!
    </div>
  );
};

export default LuriaEmbeddedReact; 