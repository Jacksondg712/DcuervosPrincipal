# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from datetime import datetime
# import os
# from dotenv import load_dotenv

# # Cargar variables de entorno
# load_dotenv()

# app = Flask(__name__)

# # Configuración de CORS - Permite peticiones desde GitHub Pages
# CORS(app, resources={
#     r"/api/*": {
#         "origins": [
#             "https://jacksondg712.github.io",
#             "http://localhost:5000",
#             "http://127.0.0.1:5000"
#         ],
#         "methods": ["GET", "POST", "OPTIONS"],
#         "allow_headers": ["Content-Type", "Authorization"],
#         "supports_credentials": False
#     }
# })

# # Configuración de correo desde variables de entorno
# EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
# EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
# EMAIL_USER = os.getenv('EMAIL_USER')
# EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
# RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL')

# # Opción alternativa: Brevo API Key (más confiable que SMTP)
# BREVO_API_KEY = os.getenv('BREVO_API_KEY')
# USE_BREVO = os.getenv('USE_BREVO', 'false').lower() == 'true'

# def enviar_correo_brevo(datos):
#     """
#     Enviar correo usando Brevo API (antes Sendinblue)
#     """
#     try:
#         import sib_api_v3_sdk
#         from sib_api_v3_sdk.rest import ApiException
        
#         print("📧 Usando Brevo API...")
        
#         # Configurar API
#         configuration = sib_api_v3_sdk.Configuration()
#         configuration.api_key['api-key'] = BREVO_API_KEY
        
#         api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
#             sib_api_v3_sdk.ApiClient(configuration)
#         )
        
#         # Crear contenido HTML del correo
#         html_body = crear_html_correo(datos)
        
#         # Configurar el email
#         send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
#             to=[{"email": RECIPIENT_EMAIL, "name": "Destinatario"}],
#             sender={"email": EMAIL_USER, "name": "D Cuervos - Formulario Web"},
#             subject=f"📬 Nuevo contacto: {datos['name']} {datos['last']}",
#             html_content=html_body,
#             reply_to={"email": datos['email'], "name": f"{datos['name']} {datos['last']}"}
#         )
        
#         # Enviar
#         api_response = api_instance.send_transac_email(send_smtp_email)
#         message_id = api_response.message_id if hasattr(api_response, 'message_id') else 'N/A'
        
#         print(f"✅ Correo enviado via Brevo - Message ID: {message_id}")
#         return True
        
#     except ApiException as e:
#         import sys
#         error_msg = f"Error API Brevo: {e}"
#         print(f"❌ {error_msg}", file=sys.stderr)
#         return False
#     except Exception as e:
#         import sys
#         error_msg = f"Error general Brevo: {type(e).__name__}: {str(e)}"
#         print(f"❌ {error_msg}", file=sys.stderr)
#         import traceback
#         traceback.print_exc()
#         return False

# def crear_html_correo(datos):
#     """
#     Crear el HTML del correo (reutilizable para SMTP y SendGrid)
#     """
#     return f"""
#     <html>
#         <head>
#             <style>
#                 body {{
#                     font-family: 'Segoe UI', Arial, sans-serif;
#                     line-height: 1.6;
#                     color: #333;
#                     background-color: #f5f5f5;
#                 }}
#                 .container {{
#                     max-width: 700px;
#                     margin: 20px auto;
#                     background-color: #ffffff;
#                     border-radius: 12px;
#                     overflow: hidden;
#                     box-shadow: 0 4px 6px rgba(0,0,0,0.1);
#                 }}
#                 .header {{
#                     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
#                     color: white;
#                     padding: 30px;
#                     text-align: center;
#                 }}
#                 .header h1 {{
#                     margin: 0;
#                     font-size: 24px;
#                     font-weight: 600;
#                 }}
#                 .content {{
#                     padding: 30px;
#                 }}
#                 .section {{
#                     margin-bottom: 25px;
#                     padding-bottom: 20px;
#                     border-bottom: 1px solid #e0e0e0;
#                 }}
#                 .section:last-child {{
#                     border-bottom: none;
#                 }}
#                 .section-title {{
#                     color: #667eea;
#                     font-size: 16px;
#                     font-weight: 700;
#                     margin-bottom: 15px;
#                     text-transform: uppercase;
#                     letter-spacing: 0.5px;
#                 }}
#                 .field-group {{
#                     display: grid;
#                     grid-template-columns: 1fr 1fr;
#                     gap: 15px;
#                     margin-bottom: 10px;
#                 }}
#                 .field {{
#                     background-color: #f8f9fa;
#                     padding: 12px;
#                     border-radius: 6px;
#                     border-left: 3px solid #667eea;
#                 }}
#                 .label {{
#                     font-weight: 600;
#                     color: #667eea;
#                     font-size: 12px;
#                     text-transform: uppercase;
#                     letter-spacing: 0.5px;
#                     margin-bottom: 5px;
#                 }}
#                 .value {{
#                     color: #333;
#                     font-size: 14px;
#                     word-wrap: break-word;
#                 }}
#                 .message-box {{
#                     background-color: #f8f9fa;
#                     padding: 15px;
#                     border-radius: 6px;
#                     border-left: 3px solid #667eea;
#                     margin-top: 10px;
#                 }}
#                 .footer {{
#                     background-color: #f8f9fa;
#                     padding: 20px;
#                     text-align: center;
#                     font-size: 12px;
#                     color: #666;
#                 }}
#             </style>
#         </head>
#         <body>
#             <div class="container">
#                 <div class="header">
#                     <h1>📬 Nuevo Mensaje de Contacto</h1>
#                 </div>
                
#                 <div class="content">
#                     <div class="section">
#                         <div class="section-title">🆔 Identificación</div>
#                         <div class="field-group">
#                             <div class="field">
#                                 <div class="label">Tipo de Documento</div>
#                                 <div class="value">{datos['document']}</div>
#                             </div>
#                             <div class="field">
#                                 <div class="label">Número de Documento</div>
#                                 <div class="value">{datos['numbers']}</div>
#                             </div>
#                         </div>
#                     </div>
                    
#                     <div class="section">
#                         <div class="section-title">👤 Datos Personales</div>
#                         <div class="field-group">
#                             <div class="field">
#                                 <div class="label">Nombres</div>
#                                 <div class="value">{datos['name']}</div>
#                             </div>
#                             <div class="field">
#                                 <div class="label">Apellidos</div>
#                                 <div class="value">{datos['last']}</div>
#                             </div>
#                         </div>
#                     </div>
                    
#                     <div class="section">
#                         <div class="section-title">📞 Información de Contacto</div>
#                         <div class="field-group">
#                             <div class="field">
#                                 <div class="label">Teléfono</div>
#                                 <div class="value">{datos['phone']}</div>
#                             </div>
#                             <div class="field">
#                                 <div class="label">Correo Electrónico</div>
#                                 <div class="value"><a href="mailto:{datos['email']}">{datos['email']}</a></div>
#                             </div>
#                         </div>
#                     </div>
                    
#                     <div class="section">
#                         <div class="section-title">📍 Ubicación</div>
#                         <div class="field-group">
#                             <div class="field">
#                                 <div class="label">Departamento</div>
#                                 <div class="value">{datos['departments']}</div>
#                             </div>
#                             <div class="field">
#                                 <div class="label">Ciudad</div>
#                                 <div class="value">{datos['city']}</div>
#                             </div>
#                             <div class="field">
#                                 <div class="label">Barrio</div>
#                                 <div class="value">{datos['neighborhood']}</div>
#                             </div>
#                             <div class="field">
#                                 <div class="label">Dirección</div>
#                                 <div class="value">{datos['address']}</div>
#                             </div>
#                         </div>
#                     </div>
                    
#                     <div class="section">
#                         <div class="section-title">💬 Mensaje</div>
#                         <div class="message-box">
#                             <div class="value">{datos['message']}</div>
#                         </div>
#                     </div>
#                 </div>
                
#                 <div class="footer">
#                     <div>Mensaje recibido desde el formulario web</div>
#                     <div>📅 {datetime.now().strftime('%d/%m/%Y a las %H:%M:%S')}</div>
#                 </div>
#             </div>
#         </body>
#     </html>
#     """

# def enviar_correo(datos):
#     """
#     Función para enviar el correo con TODOS los datos del formulario
#     Soporta SMTP (Gmail) y Brevo API
#     """
#     import sys
    
#     # Si Brevo está habilitado, usarlo (más confiable)
#     if USE_BREVO and BREVO_API_KEY:
#         print("🚀 Usando Brevo API (recomendado)")
#         return enviar_correo_brevo(datos)
    
#     # Si no, intentar con SMTP
#     print("📮 Usando SMTP tradicional")
#     return enviar_correo_smtp(datos)

# def enviar_correo_smtp(datos):
#     """
#     Enviar correo usando SMTP (Gmail)
#     """
#     import sys
    
#     try:
#         # Verificar variables de entorno
#         print("🔍 Verificando configuración de correo...")
#         if not EMAIL_USER or not EMAIL_PASSWORD or not RECIPIENT_EMAIL:
#             error_msg = f"Variables de entorno faltantes: USER={EMAIL_USER}, PASS={'***' if EMAIL_PASSWORD else 'NONE'}, RECIPIENT={RECIPIENT_EMAIL}"
#             print(f"❌ {error_msg}", file=sys.stderr)
#             return False
        
#         print(f"✅ Configuración OK - Enviando desde: {EMAIL_USER}")
#         print(f"✅ Destinatario: {RECIPIENT_EMAIL}")
        
#         # Crear el mensaje
#         msg = MIMEMultipart('alternative')
#         msg['From'] = EMAIL_USER
#         msg['To'] = RECIPIENT_EMAIL
#         msg['Subject'] = f"📬 Nuevo contacto: {datos['name']} {datos['last']}"
        
#         # Usar la función centralizada para crear HTML
#         html_body = crear_html_correo(datos)
        
#         # Adjuntar el HTML al mensaje
#         msg.attach(MIMEText(html_body, 'html'))
        
#         # Conectar al servidor SMTP y enviar
#         print(f"🌐 Conectando a {EMAIL_HOST}:{EMAIL_PORT}...")
        
#         # Usar SMTP_SSL para puerto 465 o SMTP para puerto 587
#         if int(EMAIL_PORT) == 465:
#             server = smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT, timeout=60)
#             print("🔐 Conexión SSL establecida")
#         else:
#             server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT, timeout=60)
#             print("🔐 Iniciando TLS...")
#             server.starttls()
        
#         print("🔑 Autenticando...")
#         server.login(EMAIL_USER, EMAIL_PASSWORD)
        
#         print("📧 Enviando correo...")
#         server.send_message(msg)
        
#         print("✅ Correo enviado exitosamente")
#         server.quit()
        
#         return True
#     except smtplib.SMTPAuthenticationError as e:
#         error_msg = f"Error de autenticación SMTP: {str(e)}"
#         print(f"❌ {error_msg}", file=sys.stderr)
#         return False
#     except smtplib.SMTPException as e:
#         error_msg = f"Error SMTP: {str(e)}"
#         print(f"❌ {error_msg}", file=sys.stderr)
#         return False
#     except Exception as e:
#         error_msg = f"Error general al enviar correo: {type(e).__name__}: {str(e)}"
#         print(f"❌ {error_msg}", file=sys.stderr)
#         import traceback
#         traceback.print_exc()
#         return False

# @app.route('/')
# def home():
#     return jsonify({
#         "mensaje": "API de formulario de contacto funcionando",
#         "version": "2.0",
#         "status": "online",
#         "endpoints": {
#             "GET /api/health": "Verificar estado del servidor",
#             "POST /api/contacto": "Enviar formulario de contacto"
#         }
#     })

# @app.route('/api/health', methods=['GET'])
# def health():
#     """
#     Endpoint para verificar que el servidor está funcionando
#     """
#     return jsonify({
#         "status": "healthy",
#         "timestamp": datetime.now().isoformat(),
#         "service": "Formulario de Contacto API"
#     }), 200

# @app.route('/api/contacto', methods=['POST'])
# def contacto():
#     """
#     Endpoint para recibir los datos del formulario completo
#     """
#     try:
#         # Obtener datos del JSON
#         datos = request.get_json()
        
#         # Campos requeridos
#         campos_requeridos = [
#             'document', 'numbers', 'name', 'last', 
#             'phone', 'email', 'departments', 'city',
#             'neighborhood', 'address', 'message'
#         ]
        
#         # Validar que vengan todos los campos requeridos
#         for campo in campos_requeridos:
#             if campo not in datos or not str(datos[campo]).strip():
#                 return jsonify({
#                     "success": False,
#                     "error": f"El campo '{campo}' es requerido"
#                 }), 400
        
#         # Validación básica de email
#         email = datos['email'].strip()
#         if '@' not in email or '.' not in email:
#             return jsonify({
#                 "success": False,
#                 "error": "Email no válido"
#             }), 400
        
#         # Log para debugging (solo en desarrollo)
#         print("📥 Datos recibidos:")
#         print(f"   Nombre: {datos['name']} {datos['last']}")
#         print(f"   Email: {datos['email']}")
#         print(f"   Ciudad: {datos['city']}, {datos['departments']}")
        
#         # Enviar el correo
#         if enviar_correo(datos):
#             print("✅ Correo enviado exitosamente")
#             return jsonify({
#                 "success": True,
#                 "mensaje": "Formulario enviado exitosamente. Te contactaremos pronto."
#             }), 200
#         else:
#             print("❌ Error al enviar el correo")
#             return jsonify({
#                 "success": False,
#                 "error": "Error al enviar el correo. Por favor intenta nuevamente."
#             }), 500
            
#     except Exception as e:
#         import sys
#         import traceback
#         error_msg = f"Error en el servidor: {type(e).__name__}: {str(e)}"
#         print(f"❌ {error_msg}", file=sys.stderr)
#         traceback.print_exc()
#         return jsonify({
#             "success": False,
#             "error": "Error interno del servidor. Revisa los logs."
#         }), 500

# if __name__ == '__main__':
#     # Verificar que las variables de entorno estén configuradas
#     if not EMAIL_USER or not EMAIL_PASSWORD or not RECIPIENT_EMAIL:
#         print("⚠️  ADVERTENCIA: Configura las variables de entorno:")
#         print("   EMAIL_USER, EMAIL_PASSWORD, RECIPIENT_EMAIL")
#         print("   Ver README-ENV.md para instrucciones")
#     else:
#         print("✅ Variables de entorno configuradas correctamente")
    
#     # En producción, Render usa gunicorn automáticamente
#     # Este bloque solo se ejecuta en desarrollo local
#     app.run(debug=False, host='0.0.0.0', port=5000)



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

# Configuración de CORS - Permite peticiones desde GitHub Pages
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://jacksondg712.github.io",
            "http://localhost:5000",
            "http://127.0.0.1:5000"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": False
    }
})

# Configuración de correo desde variables de entorno
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USER = os.getenv('EMAIL_USER')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL')

# Opción alternativa: Brevo API Key (más confiable que SMTP)
BREVO_API_KEY = os.getenv('BREVO_API_KEY')
USE_BREVO = os.getenv('USE_BREVO', 'false').lower() == 'true'

def enviar_correo_brevo(datos):
    """
    Enviar correo usando Brevo API (antes Sendinblue)
    """
    try:
        import sib_api_v3_sdk
        from sib_api_v3_sdk.rest import ApiException
        
        print("📧 Usando Brevo API...")
        
        # Configurar API
        configuration = sib_api_v3_sdk.Configuration()
        configuration.api_key['api-key'] = BREVO_API_KEY
        
        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
            sib_api_v3_sdk.ApiClient(configuration)
        )
        
        # Crear contenido HTML del correo
        html_body = crear_html_correo(datos)
        
        # Configurar el email
        send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
            to=[{"email": RECIPIENT_EMAIL, "name": "Destinatario"}],
            sender={"email": EMAIL_USER, "name": "D Cuervos - Formulario Web"},
            subject=f"📬 Nuevo contacto: {datos['name']} {datos['last']}",
            html_content=html_body,
            reply_to={"email": datos['email'], "name": f"{datos['name']} {datos['last']}"}
        )
        
        # Enviar
        api_response = api_instance.send_transac_email(send_smtp_email)
        message_id = api_response.message_id if hasattr(api_response, 'message_id') else 'N/A'
        
        print(f"✅ Correo enviado via Brevo - Message ID: {message_id}")
        return True
        
    except ApiException as e:
        import sys
        error_msg = f"Error API Brevo: {e}"
        print(f"❌ {error_msg}", file=sys.stderr)
        return False
    except Exception as e:
        import sys
        error_msg = f"Error general Brevo: {type(e).__name__}: {str(e)}"
        print(f"❌ {error_msg}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return False

def enviar_correo_trabajo(datos):
    """
    Enviar correo con hoja de vida adjunta en PDF usando Brevo API
    """
    try:
        import sib_api_v3_sdk
        from sib_api_v3_sdk.rest import ApiException
        
        print("📧 Enviando hoja de vida con Brevo API...")
        
        # Configurar API
        configuration = sib_api_v3_sdk.Configuration()
        configuration.api_key['api-key'] = BREVO_API_KEY
        
        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
            sib_api_v3_sdk.ApiClient(configuration)
        )
        
        # Crear contenido HTML del correo
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
                        max-width: 600px;
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
                    .field {{
                        background-color: #f8f9fa;
                        padding: 12px;
                        border-radius: 6px;
                        border-left: 3px solid #667eea;
                        margin-bottom: 15px;
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
                    }}
                    .badge {{
                        display: inline-block;
                        padding: 8px 16px;
                        background-color: #28a745;
                        color: white;
                        border-radius: 20px;
                        font-weight: 600;
                        font-size: 14px;
                    }}
                    .footer {{
                        background-color: #f8f9fa;
                        padding: 20px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>💼 Nueva Hoja de Vida Recibida</h1>
                    </div>
                    
                    <div class="content">
                        <div class="field">
                            <div class="label">Nombre Completo</div>
                            <div class="value">{datos['nombre']}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Correo Electrónico</div>
                            <div class="value"><a href="mailto:{datos['email']}">{datos['email']}</a></div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Teléfono</div>
                            <div class="value">{datos['telefono']}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Posición de Interés</div>
                            <div class="value"><span class="badge">{datos['posicion']}</span></div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Archivo Adjunto</div>
                            <div class="value">📎 {datos['archivo']['nombre']}</div>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <div>Hoja de vida recibida desde el formulario web</div>
                        <div>📅 {datetime.now().strftime('%d/%m/%Y a las %H:%M:%S')}</div>
                    </div>
                </div>
            </body>
        </html>
        """
        
        # Preparar el adjunto en Base64
        archivo = datos['archivo']
        attachment = [
            {
                "content": archivo['contenido'],  # Base64 del PDF
                "name": archivo['nombre']  # Nombre del archivo
            }
        ]
        
        # Configurar el email
        send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
            to=[{"email": RECIPIENT_EMAIL, "name": "Recursos Humanos"}],
            sender={"email": EMAIL_USER, "name": "D Cuervos - Portal de Trabajo"},
            subject=f"💼 Nueva hoja de vida: {datos['nombre']} - {datos['posicion']}",
            html_content=html_body,
            reply_to={"email": datos['email'], "name": datos['nombre']},
            attachment=attachment
        )
        
        # Enviar
        api_response = api_instance.send_transac_email(send_smtp_email)
        message_id = api_response.message_id if hasattr(api_response, 'message_id') else 'N/A'
        
        print(f"✅ Hoja de vida enviada via Brevo - Message ID: {message_id}")
        print(f"   Archivo adjunto: {archivo['nombre']}")
        return True
        
    except ApiException as e:
        import sys
        error_msg = f"Error API Brevo: {e}"
        print(f"❌ {error_msg}", file=sys.stderr)
        return False
    except Exception as e:
        import sys
        error_msg = f"Error general enviando hoja de vida: {type(e).__name__}: {str(e)}"
        print(f"❌ {error_msg}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return False

def crear_html_correo(datos):
    """
    Crear el HTML del correo (reutilizable para SMTP y SendGrid)
    """
    return f"""
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
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📬 Nuevo Mensaje de Contacto</h1>
                </div>
                
                <div class="content">
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
                    
                    <div class="section">
                        <div class="section-title">📞 Información de Contacto</div>
                        <div class="field-group">
                            <div class="field">
                                <div class="label">Teléfono</div>
                                <div class="value">{datos['phone']}</div>
                            </div>
                            <div class="field">
                                <div class="label">Correo Electrónico</div>
                                <div class="value"><a href="mailto:{datos['email']}">{datos['email']}</a></div>
                            </div>
                        </div>
                    </div>
                    
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
                    
                    <div class="section">
                        <div class="section-title">💬 Mensaje</div>
                        <div class="message-box">
                            <div class="value">{datos['message']}</div>
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <div>Mensaje recibido desde el formulario web</div>
                    <div>📅 {datetime.now().strftime('%d/%m/%Y a las %H:%M:%S')}</div>
                </div>
            </div>
        </body>
    </html>
    """

def enviar_correo(datos):
    """
    Función para enviar el correo con TODOS los datos del formulario
    Soporta SMTP (Gmail) y Brevo API
    """
    import sys
    
    # Si Brevo está habilitado, usarlo (más confiable)
    if USE_BREVO and BREVO_API_KEY:
        print("🚀 Usando Brevo API (recomendado)")
        return enviar_correo_brevo(datos)
    
    # Si no, intentar con SMTP
    print("📮 Usando SMTP tradicional")
    return enviar_correo_smtp(datos)

def enviar_correo_smtp(datos):
    """
    Enviar correo usando SMTP (Gmail)
    """
    import sys
    
    try:
        # Verificar variables de entorno
        print("🔍 Verificando configuración de correo...")
        if not EMAIL_USER or not EMAIL_PASSWORD or not RECIPIENT_EMAIL:
            error_msg = f"Variables de entorno faltantes: USER={EMAIL_USER}, PASS={'***' if EMAIL_PASSWORD else 'NONE'}, RECIPIENT={RECIPIENT_EMAIL}"
            print(f"❌ {error_msg}", file=sys.stderr)
            return False
        
        print(f"✅ Configuración OK - Enviando desde: {EMAIL_USER}")
        print(f"✅ Destinatario: {RECIPIENT_EMAIL}")
        
        # Crear el mensaje
        msg = MIMEMultipart('alternative')
        msg['From'] = EMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = f"📬 Nuevo contacto: {datos['name']} {datos['last']}"
        
        # Usar la función centralizada para crear HTML
        html_body = crear_html_correo(datos)
        
        # Adjuntar el HTML al mensaje
        msg.attach(MIMEText(html_body, 'html'))
        
        # Conectar al servidor SMTP y enviar
        print(f"🌐 Conectando a {EMAIL_HOST}:{EMAIL_PORT}...")
        
        # Usar SMTP_SSL para puerto 465 o SMTP para puerto 587
        if int(EMAIL_PORT) == 465:
            server = smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT, timeout=60)
            print("🔐 Conexión SSL establecida")
        else:
            server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT, timeout=60)
            print("🔐 Iniciando TLS...")
            server.starttls()
        
        print("🔑 Autenticando...")
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        
        print("📧 Enviando correo...")
        server.send_message(msg)
        
        print("✅ Correo enviado exitosamente")
        server.quit()
        
        return True
    except smtplib.SMTPAuthenticationError as e:
        error_msg = f"Error de autenticación SMTP: {str(e)}"
        print(f"❌ {error_msg}", file=sys.stderr)
        return False
    except smtplib.SMTPException as e:
        error_msg = f"Error SMTP: {str(e)}"
        print(f"❌ {error_msg}", file=sys.stderr)
        return False
    except Exception as e:
        error_msg = f"Error general al enviar correo: {type(e).__name__}: {str(e)}"
        print(f"❌ {error_msg}", file=sys.stderr)
        import traceback
        traceback.print_exc()
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
        import sys
        import traceback
        error_msg = f"Error en el servidor: {type(e).__name__}: {str(e)}"
        print(f"❌ {error_msg}", file=sys.stderr)
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error": "Error interno del servidor. Revisa los logs."
        }), 500

@app.route('/api/trabajo', methods=['POST'])
def trabajo():
    """
    Endpoint para recibir formulario de trabajo con hoja de vida en PDF
    """
    try:
        # Obtener datos del JSON
        datos = request.get_json()
        
        # Campos requeridos
        campos_requeridos = ['nombre', 'email', 'telefono', 'posicion', 'archivo']
        
        # Validar que vengan todos los campos
        for campo in campos_requeridos:
            if campo not in datos:
                return jsonify({
                    "success": False,
                    "error": f"El campo '{campo}' es requerido"
                }), 400
        
        # Validar email
        email = datos['email'].strip()
        if '@' not in email or '.' not in email:
            return jsonify({
                "success": False,
                "error": "Email no válido"
            }), 400
        
        # Validar que el archivo tenga los campos necesarios
        archivo = datos['archivo']
        if not isinstance(archivo, dict) or 'contenido' not in archivo or 'nombre' not in archivo:
            return jsonify({
                "success": False,
                "error": "Formato de archivo inválido"
            }), 400
        
        # Log para debugging
        print("📥 Solicitud de trabajo recibida:")
        print(f"   Nombre: {datos['nombre']}")
        print(f"   Email: {datos['email']}")
        print(f"   Teléfono: {datos['telefono']}")
        print(f"   Posición: {datos['posicion']}")
        print(f"   Archivo: {archivo['nombre']} ({archivo.get('tamano', 0)} bytes)")
        
        # Enviar el correo con adjunto
        if enviar_correo_trabajo(datos):
            print("✅ Hoja de vida enviada exitosamente")
            return jsonify({
                "success": True,
                "mensaje": "Hoja de vida recibida exitosamente. Nos pondremos en contacto contigo pronto."
            }), 200
        else:
            print("❌ Error al enviar el correo")
            return jsonify({
                "success": False,
                "error": "Error al enviar la hoja de vida. Por favor intenta nuevamente."
            }), 500
            
    except Exception as e:
        import sys
        import traceback
        error_msg = f"Error en el servidor: {type(e).__name__}: {str(e)}"
        print(f"❌ {error_msg}", file=sys.stderr)
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error": "Error interno del servidor. Revisa los logs."
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