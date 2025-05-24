const lead = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Lead Recebido</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        
        .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
        }
        
        .content {
            padding: 30px;
        }
        
        .alert-badge {
            background: #ff6b6b;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-block;
            margin-bottom: 20px;
        }
        
        .lead-info {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            margin: 20px 0;
        }
        
        .info-row {
            display: flex;
            margin-bottom: 15px;
            align-items: flex-start;
        }
        
        .info-label {
            font-weight: 700;
            color: #333;
            min-width: 100px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .info-value {
            color: #555;
            font-size: 15px;
            flex-grow: 1;
            word-break: break-word;
        }
        
        .message-box {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 15px;
            margin-top: 10px;
            font-style: italic;
            line-height: 1.5;
        }
        
        .cta-section {
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
            border-radius: 10px;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 14px;
            transition: transform 0.2s ease;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #e9ecef;
        }
        
        .timestamp {
            color: #999;
            font-size: 12px;
            text-align: right;
            margin-top: 20px;
            font-style: italic;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 0;
            }
            
            .info-row {
                flex-direction: column;
            }
            
            .info-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🎯 Novo Lead Recebido!</h1>
            <p>Um novo potencial cliente está interessado</p>
        </div>
        
        <div class="content">
            <div class="alert-badge">✨ Ação Necessária</div>
            
            <p>Olá! Você recebeu um novo lead através do seu formulário de contato.</p>
            
            <div class="lead-info">
                <div class="info-row">
                    <span class="info-label">👤 Nome:</span>
                    <span class="info-value">{name}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">🏢 Empresa:</span>
                    <span class="info-value">{company}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">📧 Email:</span>
                    <span class="info-value"><a href="mailto:{email}" style="color: #667eea; text-decoration: none;">{email}</a></span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">📱 Telefone:</span>
                    <span class="info-value"><a href="tel:{phone}" style="color: #667eea; text-decoration: none;">{phone}</a></span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">💬 Mensagem:</span>
                    <div class="info-value">
                        <div class="message-box">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="cta-section">
                <p><strong>🚀 Próximos passos recomendados:</strong></p>
                <p>Entre em contato em até 24 horas para maximizar as chances de conversão!</p>
                <a href="mailto:{email}" class="cta-button">Responder por Email</a>
            </div>
            
            <div class="timestamp">
                📅 Recebido em: {timestamp}
            </div>
        </div>
        
        <div class="footer">
            <p>Este email foi gerado automaticamente pelo seu sistema de captura de leads.</p>
            <p>© 2024 - Sistema de Leads</p>
        </div>
    </div>
</body>
</html>
`

module.exports = {
    lead,
};