from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)

# ⚠️ IMPORTANTE: En producción, cambia "*" por tu dominio de GitHub Pages
# Ejemplo: CORS(app, resources={r"/api/*": {"origins": ["https://tuusuario.github.io"]}})
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configuración de correo desde variables de entorno
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL')

def enviar_correo(datos):
    """
    Función para enviar el correo con TODOS los datos del formulario
    """
    try:
        # Crear el mensaje
        msg = MIMEMultipart('alternative')
        msg['From'] = EMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = f"📬 Nuevo contacto: {datos['name']} {datos['last']}"
        
        # Crear el cuerpo del correo en HTML (profesional y organizado)
        html_body = f"""
        <html>
            <head>
                <style>
                    body {{
                        font-family: 'Segoe UI', Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background-color: #f5f5f5;
                    }}
                    .container {{
                        max-width: 700px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }}
                    .header {{
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 30px;
                        text-align: center;
                    }}
                    .header h1 {{
                        margin: 0;
                        font-size: 24px;
                        font-weight: 600;
                    }}
                    .content {{
                        padding: 30px;
                    }}
                    .section {{
                        margin-bottom: 25px;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #e0e0e0;
                    }}
                    .section:last-child {{
                        border-bottom: none;
                    }}
                    .section-title {{
                        color: #667eea;
                        font-size: 16px;
                        font-weight: 700;
                        margin-bottom: 15px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }}
                    .field-group {{
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        margin-bottom: 10px;
                    }}
                    .field {{
                        background-color: #f8f9fa;
                        padding: 12px;
                        border-radius: 6px;
                        border-left: 3px solid #667eea;
                    }}
                    .field-full {{
                        grid-column: 1 / -1;
                    }}
                    .label {{
                        font-weight: 600;
                        color: #667eea;
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 5px;
                    }}
                    .value {{
                        color: #333;
                        font-size: 14px;
                        word-wrap: break-word;
                    }}
                    .message-box {{
                        background-color: #f8f9fa;
                        padding: 15px;
                        border-radius: 6px;
                        border-left: 3px solid #667eea;
                        margin-top: 10px;
                    }}
                    .footer {{
                        background-color: #f8f9fa;
                        padding: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                    }}
                    .footer .time {{
                        color: #999;
                        margin-top: 5px;
                    }}
                    .highlight {{
                        background-color: #fff3cd;
                        padding: 2px 6px;
                        border-radius: 3px;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <!-- Header -->
                    <div class="header">
                        <h1>📬 Nuevo Mensaje de Contacto</h1>
                    </div>
                    
                    <!-- Content -->
                    <div class="content">
                        <!-- Identificación -->
                        <div class="section">
                            <div class="section-title">🆔 Identificación</div>
                            <div class="field-group">
                                <div class="field">
                                    <div class="label">Tipo de Documento</div>
                                    <div class="value">{datos['document']}</div>
                                </div>
                                <div class="field">
                                    <div class="label">Número de Documento</div>
                                    <div class="value">{datos['numbers']}</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Datos Personales -->
                        <div class="section">
                            <div class="section-title">👤 Datos Personales</div>
                            <div class="field-group">
                                <div class="field">
                                    <div class="label">Nombres</div>
                                    <div class="value">{datos['name']}</div>
                                </div>
                                <div class="field">
                                    <div class="label">Apellidos</div>
                                    <div class="value">{datos['last']}</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Contacto -->
                        <div class="section">
                            <div class="section-title">📞 Información de Contacto</div>
                            <div class="field-group">
                                <div class="field">
                                    <div class="label">Teléfono</div>
                                    <div class="value">{datos['phone']}</div>
                                </div>
                                <div class="field">
                                    <div class="label">Correo Electrónico</div>
                                    <div class="value"><a href="mailto:{datos['email']}" style="color: #667eea; text-decoration: none;">{datos['email']}</a></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Ubicación -->
                        <div class="section">
                            <div class="section-title">📍 Ubicación</div>
                            <div class="field-group">
                                <div class="field">
                                    <div class="label">Departamento</div>
                                    <div class="value">{datos['departments']}</div>
                                </div>
                                <div class="field">
                                    <div class="label">Ciudad</div>
                                    <div class="value">{datos['city']}</div>
                                </div>
                                <div class="field">
                                    <div class="label">Barrio</div>
                                    <div class="value">{datos['neighborhood']}</div>
                                </div>
                                <div class="field">
                                    <div class="label">Dirección</div>
                                    <div class="value">{datos['address']}</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Mensaje -->
                        <div class="section">
                            <div class="section-title">💬 Mensaje</div>
                            <div class="message-box">
                                <div class="value">{datos['message']}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="footer">
                        <div>Mensaje recibido desde el formulario web</div>
                        <div class="time">📅 {datetime.now().strftime('%d/%m/%Y a las %H:%M:%S')}</div>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Adjuntar el HTML al mensaje
        msg.attach(MIMEText(html_body, 'html'))
        
        # Conectar al servidor SMTP y enviar
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        return True
    except Exception as e:
        print(f"❌ Error al enviar correo: {str(e)}")
        return False

@app.route('/')
def home():
    return jsonify({
        "mensaje": "API de formulario de contacto funcionando",
        "version": "2.0",
        "status": "online",
        "endpoints": {
            "GET /api/health": "Verificar estado del servidor",
            "POST /api/contacto": "Enviar formulario de contacto"
        }
    })

@app.route('/api/health', methods=['GET'])
def health():
    """
    Endpoint para verificar que el servidor está funcionando
    """
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Formulario de Contacto API"
    }), 200

@app.route('/api/contacto', methods=['POST'])
def contacto():
    """
    Endpoint para recibir los datos del formulario completo
    """
    try:
        # Obtener datos del JSON
        datos = request.get_json()
        
        # Campos requeridos
        campos_requeridos = [
            'document', 'numbers', 'name', 'last', 
            'phone', 'email', 'departments', 'city',
            'neighborhood', 'address', 'message'
        ]
        
        # Validar que vengan todos los campos requeridos
        for campo in campos_requeridos:
            if campo not in datos or not str(datos[campo]).strip():
                return jsonify({
                    "success": False,
                    "error": f"El campo '{campo}' es requerido"
                }), 400
        
        # Validación básica de email
        email = datos['email'].strip()
        if '@' not in email or '.' not in email:
            return jsonify({
                "success": False,
                "error": "Email no válido"
            }), 400
        
        # Log para debugging (solo en desarrollo)
        print("📥 Datos recibidos:")
        print(f"   Nombre: {datos['name']} {datos['last']}")
        print(f"   Email: {datos['email']}")
        print(f"   Ciudad: {datos['city']}, {datos['departments']}")
        
        # Enviar el correo
        if enviar_correo(datos):
            print("✅ Correo enviado exitosamente")
            return jsonify({
                "success": True,
                "mensaje": "Formulario enviado exitosamente. Te contactaremos pronto."
            }), 200
        else:
            print("❌ Error al enviar el correo")
            return jsonify({
                "success": False,
                "error": "Error al enviar el correo. Por favor intenta nuevamente."
            }), 500
            
    except Exception as e:
        print(f"❌ Error en el servidor: {str(e)}")
        return jsonify({
            "success": False,
            "error": f"Error en el servidor: {str(e)}"
        }), 500

if __name__ == '__main__':
    # Verificar que las variables de entorno estén configuradas
    if not EMAIL_USER or not EMAIL_PASSWORD or not RECIPIENT_EMAIL:
        print("⚠️  ADVERTENCIA: Configura las variables de entorno:")
        print("   EMAIL_USER, EMAIL_PASSWORD, RECIPIENT_EMAIL")
        print("   Ver README-ENV.md para instrucciones")
    else:
        print("✅ Variables de entorno configuradas correctamente")
    
    # En producción, Render usa gunicorn automáticamente
    # Este bloque solo se ejecuta en desarrollo local
    app.run(debug=False, host='0.0.0.0', port=5000)