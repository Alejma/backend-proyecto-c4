import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {EmpleadoRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(@repository(EmpleadoRepository)
  public empleadoRepository: EmpleadoRepository) { }

  enviarSms(numero: string, nombre: string, clave: string) {
    const accountSid = 'AC0cd5202526504f4727741e1c3e2e683b';
    const authToken = '01f8235fe4964a7863833bc6a109ba92'
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: "Hola, " + nombre + " bienvenido a la app, su clave es: " + clave,
        from: '+18155679471',
        to: '+57' + numero
      })
      .then((message: any) => console.log(message.sid));
  }
}
