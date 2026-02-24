#!/usr/bin/env python3
"""
Script de prueba para el endpoint de contacto
Ejecutar: python test_api.py
"""

import requests
import json

# URL de tu API
API_URL = "http://localhost:5000/api/contacto"

# Datos de prueba
datos_prueba = {
    "nombre": "Juan Pérez",
    "email": "juan.perez@example.com",
    "telefono": "+57 300 123 4567",
    "asunto": "Prueba del sistema de contacto",
    "mensaje": "Este es un mensaje de prueba para verificar que el sistema está funcionando correctamente."
}

def test_envio():
    """
    Prueba el envío de un mensaje a través de la API
    """
    print("🧪 Iniciando prueba del sistema de contacto...")
    print("-" * 50)
    
    try:
        # Verificar que el servidor está corriendo
        print("1️⃣  Verificando que el servidor está activo...")
        health_response = requests.get("http://localhost:5000/api/health", timeout=5)
        
        if health_response.status_code == 200:
            print("   ✅ Servidor activo")
        else:
            print("   ❌ Servidor no responde correctamente")
            return
        
        # Enviar mensaje de prueba
        print("\n2️⃣  Enviando mensaje de prueba...")
        print(f"   📧 A: {API_URL}")
        
        response = requests.post(
            API_URL,
            headers={"Content-Type": "application/json"},
            json=datos_prueba,
            timeout=10
        )
        
        print(f"\n3️⃣  Respuesta del servidor:")
        print(f"   Status Code: {response.status_code}")
        
        try:
            data = response.json()
            print(f"   Respuesta: {json.dumps(data, indent=2, ensure_ascii=False)}")
            
            if response.status_code == 200 and data.get("success"):
                print("\n✅ ¡PRUEBA EXITOSA! El correo debería haber sido enviado.")
                print("   Revisa tu bandeja de entrada (y spam si no lo ves).")
            else:
                print(f"\n❌ PRUEBA FALLIDA: {data.get('error', 'Error desconocido')}")
        except json.JSONDecodeError:
            print(f"   Error: Respuesta no es JSON válido")
            print(f"   Respuesta raw: {response.text}")
        
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: No se pudo conectar al servidor")
        print("   Asegúrate de que el servidor está corriendo en http://localhost:5000")
        print("   Ejecuta: python app.py")
    except requests.exceptions.Timeout:
        print("\n❌ ERROR: Timeout - el servidor tardó demasiado en responder")
    except Exception as e:
        print(f"\n❌ ERROR INESPERADO: {str(e)}")
    
    print("\n" + "-" * 50)

def test_validacion():
    """
    Prueba las validaciones del formulario
    """
    print("\n🧪 Probando validaciones...")
    print("-" * 50)
    
    # Prueba 1: Sin campos requeridos
    print("\n1️⃣  Prueba: Campos vacíos")
    try:
        response = requests.post(
            API_URL,
            headers={"Content-Type": "application/json"},
            json={"nombre": "", "email": "", "asunto": "", "mensaje": ""},
            timeout=5
        )
        data = response.json()
        if response.status_code == 400:
            print(f"   ✅ Validación correcta: {data.get('error')}")
        else:
            print(f"   ❌ Debería rechazar campos vacíos")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    # Prueba 2: Email inválido
    print("\n2️⃣  Prueba: Email inválido")
    try:
        response = requests.post(
            API_URL,
            headers={"Content-Type": "application/json"},
            json={
                "nombre": "Test",
                "email": "email_invalido",
                "asunto": "Test",
                "mensaje": "Test"
            },
            timeout=5
        )
        data = response.json()
        if response.status_code == 400:
            print(f"   ✅ Validación correcta: {data.get('error')}")
        else:
            print(f"   ❌ Debería rechazar email inválido")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    print("\n" + "-" * 50)

if __name__ == "__main__":
    print("\n" + "=" * 50)
    print("🚀 SISTEMA DE PRUEBAS - API DE CONTACTO")
    print("=" * 50)
    
    # Ejecutar pruebas
    test_envio()
    test_validacion()
    
    print("\n✅ Pruebas completadas")
    print("=" * 50 + "\n")
