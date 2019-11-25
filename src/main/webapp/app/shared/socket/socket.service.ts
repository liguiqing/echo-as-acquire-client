import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Message } from './socket.message';
import { Event } from './socket.event';

export class SocketService {
  private socket;

  constructor(url: string) {
    this.socket = this.socket = socketIo(url);
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return this.on('message');
  }

  public on(method: string): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on(method, (data: Message) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
