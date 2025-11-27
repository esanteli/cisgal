const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Middleware de logging para debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Configuración de Nodemailer (simulación - para producción usar SMTP real)
// Solo inicializar si tenemos las credenciales necesarias para producción
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  try {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    console.log('Transporter de Nodemailer inicializado');
  } catch (error) {
    console.warn('Error inicializando Nodemailer (modo simulación se usará):', error.message);
  }
} else {
  console.log('Modo simulación: EMAIL_PASSWORD no configurado');
}

// Verificar reCAPTCHA
const verifyRecaptcha = async (token) => {
  try {
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.warn('RECAPTCHA_SECRET_KEY no está configurada en .env');
      return false;
    }

    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token
        }
      }
    );
    
    if (!response.data.success) {
      console.warn('reCAPTCHA verificacion fallida:', response.data['error-codes']);
    }
    
    return response.data.success;
  } catch (error) {
    console.error('Error verificando reCAPTCHA:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    return false;
  }
};

// Endpoint para recibir formularios
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Request recibido en /api/contact');
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    const { name, email, interestType, product, message, recaptchaToken } = req.body;

    // Validaciones básicas
    if (!name || !email || !message) {
      console.warn('Validación fallida: faltan campos requeridos');
      return res.status(400).json({ 
        message: 'Faltan campos requeridos. Por favor completa todos los campos obligatorios.' 
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('Validación fallida: email inválido');
      return res.status(400).json({ 
        message: 'El correo electrónico no es válido' 
      });
    }

    // Verificar reCAPTCHA
    if (!recaptchaToken) {
      console.warn('Validación fallida: no hay token reCAPTCHA');
      return res.status(400).json({ 
        message: 'Por favor completa la verificación de seguridad' 
      });
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      console.warn('Validación fallida: reCAPTCHA inválido');
      return res.status(400).json({ 
        message: 'La verificación de seguridad falló. Por favor intenta nuevamente.' 
      });
    }

    // Preparar el email
    const interestLabels = {
      mantencion: 'Mantención',
      servicios: 'Servicios',
      comunicarnos: 'Solo comunicarnos'
    };

    const emailSubject = `Nuevo contacto desde el sitio web - ${interestLabels[interestType] || 'Consulta'}`;
    
    const emailBody = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Tipo de interés:</strong> ${interestLabels[interestType] || 'No especificado'}</p>
      ${product ? `<p><strong>Producto/Servicio:</strong> ${product}</p>` : ''}
      <p><strong>Mensaje:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Enviado desde el formulario de contacto del sitio web</small></p>
    `;

    // En modo desarrollo o sin EMAIL_PASSWORD, solo simular el envío
    if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_PASSWORD) {
      console.log('=== EMAIL SIMULADO ===');
      console.log('Para: Cisgal.spci@gmail.com');
      console.log('Asunto:', emailSubject);
      console.log('Contenido:', emailBody);
      console.log('=====================');
      
      return res.json({ 
        success: true, 
        message: 'Mensaje recibido correctamente (modo simulación)' 
      });
    }

    // En producción, enviar el email real
    if (transporter) {
      try {
        const mailOptions = {
          from: `"Sitio Web Cisgal" <${process.env.EMAIL_USER}>`,
          to: 'Cisgal.spci@gmail.com',
          subject: emailSubject,
          html: emailBody
        };

        await transporter.sendMail(mailOptions);
        
        console.log('Email enviado exitosamente a:', mailOptions.to);
        
        return res.json({ 
          success: true, 
          message: 'Mensaje enviado exitosamente' 
        });
      } catch (emailError) {
        console.error('Error enviando email:', emailError);
        // No fallar completamente si el email falla, pero retornar un aviso
        return res.status(500).json({ 
          message: 'El mensaje fue recibido pero hubo un problema al enviar el email. Por favor contacta directamente a Cisgal.spci@gmail.com',
          error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
        });
      }
    } else {
      // Si no hay transporter, usar modo simulación
      console.log('=== EMAIL SIMULADO (sin transporter) ===');
      console.log('Para: Cisgal.spci@gmail.com');
      console.log('Asunto:', emailSubject);
      console.log('Contenido:', emailBody);
      console.log('========================================');
      
      return res.json({ 
        success: true, 
        message: 'Mensaje recibido correctamente (modo simulación)' 
      });
    }

  } catch (error) {
    console.error('Error procesando formulario:', error);
    console.error('Stack trace:', error.stack);
    console.error('Body recibido:', req.body);
    
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

// Middleware de manejo de errores global (debe ir al final, después de todas las rutas)
app.use((err, req, res, next) => {
  console.error('Error no capturado:', err);
  console.error('Stack trace:', err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log(`EMAIL_USER: ${process.env.EMAIL_USER || 'No configurado'}`);
  console.log(`EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD ? 'Configurado' : 'No configurado (modo simulación)'}`);
  console.log(`RECAPTCHA_SECRET_KEY: ${process.env.RECAPTCHA_SECRET_KEY ? 'Configurado' : 'No configurado'}`);
  console.log(`========================================`);
});

