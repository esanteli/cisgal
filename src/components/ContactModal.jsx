import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactModal = ({ show, onHide, title = "Contáctanos" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interestType: '', // 'mantencion', 'servicios', 'comunicarnos'
    product: '', // Producto seleccionado
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  // Productos según tipo de interés
  const productsByInterest = {
    mantencion: [
      'Mantención de Red Seca',
      'Mantención de Red Húmeda',
      'Mantención de Sistema Contra Incendios',
      'Mantención de Extintores',
      'Mantención Integral'
    ],
    servicios: [
      'Sistemas de Protección Pasiva',
      'Sistemas de Detección y Alarmas',
      'Sistemas de Agentes Limpios (Gaseosos)',
      'Sistemas de Extinción con Agua',
      'Protección de Vehículos y Cocinas',
      'Sistemas Water Mist'
    ],
    comunicarnos: []
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Reset producto si cambia el tipo de interés
      ...(name === 'interestType' && { product: '' })
    });
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    if (errors.recaptcha) {
      setErrors({ ...errors, recaptcha: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }
    if (!formData.interestType) {
      newErrors.interestType = 'Por favor selecciona un interés';
    }
    if (formData.interestType !== 'comunicarnos' && !formData.product) {
      newErrors.product = 'Por favor selecciona un producto';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }
    if (!recaptchaToken) {
      newErrors.recaptcha = 'Por favor completa la verificación';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ejecutar reCAPTCHA invisible si no hay token
    if (!recaptchaToken && recaptchaRef.current) {
      recaptchaRef.current.execute();
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      });

      // Verificar si la respuesta es JSON válido
      let data;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Error parseando respuesta:', parseError);
        throw new Error('Error al procesar la respuesta del servidor');
      }

      if (response.ok) {
        setSubmitStatus('success');
        // Resetear formulario después de 2 segundos
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
        const errorMessage = data.message || data.error || `Error ${response.status}: Error al enviar el mensaje`;
        setErrors({ submit: errorMessage });
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus('error');
      let errorMessage = 'Error de conexión. Por favor intenta nuevamente.';
      
      // Mensajes de error más específicos
      if (error.message) {
        errorMessage = error.message;
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'No se pudo conectar con el servidor. Verifica que el servidor esté corriendo en el puerto 3001.';
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
      // Resetear reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken(null);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      interestType: '',
      product: '',
      message: ''
    });
    setErrors({});
    setSubmitStatus(null);
    setRecaptchaToken(null);
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    onHide();
  };

  // Ejecutar reCAPTCHA cuando se intenta enviar sin token
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (!recaptchaToken && recaptchaRef.current) {
      recaptchaRef.current.execute();
    } else {
      handleSubmit(e);
    }
  };

  const shouldShowProductSelector = 
    formData.interestType && 
    formData.interestType !== 'comunicarnos' &&
    productsByInterest[formData.interestType]?.length > 0;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submitStatus === 'success' && (
          <Alert variant="success" className="mb-3">
            <i className="fas fa-check-circle me-2"></i>
            ¡Mensaje enviado exitosamente! Te contactaremos pronto.
          </Alert>
        )}
        
        {submitStatus === 'error' && errors.submit && (
          <Alert variant="danger" className="mb-3">
            <i className="fas fa-exclamation-circle me-2"></i>
            {errors.submit}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Correo Electrónico *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group>
                <Form.Label>¿Cuál es tu interés? *</Form.Label>
                <Form.Select
                  name="interestType"
                  value={formData.interestType}
                  onChange={handleChange}
                  isInvalid={!!errors.interestType}
                  disabled={loading}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="mantencion">Mantención</option>
                  <option value="servicios">Servicios</option>
                  <option value="comunicarnos">Solo comunicarnos</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.interestType}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {shouldShowProductSelector && (
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>
                    {formData.interestType === 'mantencion' 
                      ? 'Tipo de Mantención *' 
                      : 'Servicio de Interés *'}
                  </Form.Label>
                  <Form.Select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    isInvalid={!!errors.product}
                    disabled={loading}
                  >
                    <option value="">Selecciona un producto/servicio</option>
                    {productsByInterest[formData.interestType].map((product, index) => (
                      <option key={index} value={product}>
                        {product}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.product}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Mensaje *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  isInvalid={!!errors.message}
                  disabled={loading}
                  placeholder="Cuéntanos más sobre tu consulta..."
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} className="d-none">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LdehBksAAAAAJAHTSMZurX0o6JyE8a0w2Fiq_9n"
                onChange={handleRecaptchaChange}
                size="invisible"
              />
            </Col>
            {errors.recaptcha && (
              <Col xs={12}>
                <div className="text-danger small">
                  {errors.recaptcha}
                </div>
              </Col>
            )}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cerrar
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmitClick}
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Enviando...
            </>
          ) : (
            'Enviar Mensaje'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;

