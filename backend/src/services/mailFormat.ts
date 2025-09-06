const mailFormat = (message: string, subject: string) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Notificación de Laboratorio Genérico</title>
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      font-family: sans-serif, Arial, Helvetica;
      background-color: #f7f7f7;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
    }
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
    }
  </style>
</head>
<body style="margin: 0; padding: 0;">
  <!-- Tabla principal -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
    <tr>
      <td style="padding: 20px 0;">
        <!-- Contenedor del correo centrado -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Encabezado -->
          <tr>
            <td align="center" style="padding: 40px; background-color: #004d99; color: #ffffff; font-size: 24px; font-weight: bold;">
              Laboratorio Genérico
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 30px 20px 30px; color: #333333; font-size: 16px; line-height: 1.6;">
              <h1 style="margin: 0 0 20px 0; font-size: 22px; font-weight: bold; color: #007bff;">${subject}</h1>

              <!-- Parrafo -->
              <p style="margin: 0 0 20px 0;">Estimado/a cliente,</p>
              
              <!-- Mensaje -->
              <p style="margin: 0 0 20px 0;">${message}</p>
              
              <!-- Botón -->
              <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="border-radius: 50px; background-color: #007bff; padding: 12px 25px;">
                          <a href="#" target="_blank" style="font-size: 16px; font-weight: bold; font-family: sans-serif, Arial, Helvetica; color: #ffffff; text-decoration: none; display: inline-block;">Ver detalles del turno</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0;">Atentamente,<br />Equipo de Laboratorio</p>
            </td>
          </tr>
          
          <!-- Pie de página -->
          <tr>
            <td align="center" style="padding: 30px; background-color: #f0f0f0; color: #999999; font-size: 12px; line-height: 1.5;">
              <p style="margin: 0;">Laboratorio Genérico © 2025</p>
              <p style="margin: 0;">Calle Ejemplo 123, Ciudad, País</p>
              <p style="margin: 0;"><a href="#" style="color: #999999;">Política de privacidad</a> | <a href="#" style="color: #999999;">Anular suscripción</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export {mailFormat};