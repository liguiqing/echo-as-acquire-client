import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';
import ScannerService from './scan.scanner.service';
import { SocketService } from '@/shared/socket/socket.service';
import { Message } from '@/shared/socket/socket.message';
import { Event } from '@/shared/socket/socket.event';
import { SCAN_CLIENT_SERVER } from '@/constants';

import * as socketIo from 'socket.io-client';

@Component
export default class ScanClient extends Vue {
  // @Inject('scannerService')
  private scannerService = new ScannerService();

  public selectedScanner: string = null;

  public onlineScanners: string[] = [];

  public hasScanner: boolean = false;

  public scanning: boolean = false;

  public scanBtnDisabled: boolean = true;

  public scanningImage: string = null;

  private socket: any = null;

  private interval: any = null;

  public mounted(): void {
    this.init();
  }

  public init(): void {
    this.socket = socketIo(SCAN_CLIENT_SERVER);
    this.getOnlineScanners();
    // this.createScanningSocket();
    this.scanningListened();
  }

  public createScanningSocket() {
    const scanningSocket = new SocketService(SCAN_CLIENT_SERVER + 'scanning');
    scanningSocket.onEvent(Event.CONNECT).subscribe(() => {
      console.log('connected');
    });
    scanningSocket.onMessage().subscribe((message: Message) => {
      console.log(message);
    });
  }

  public getOnlineScanners() {
    this.scannerService.getOnlineScanners().then(response => {
      if (response.data.success) {
        response.data.data.forEach((val, idx, array) => {
          if (val.name == 'scanner') this.onlineScanners = val.instances;
        });
      }

      if (this.onlineScanners.length) {
        this.selectedScanner = this.onlineScanners[0];
        this.hasScanner = true;
      }
    });
  }

  public scannerChange(value) {
    this.selectedScanner = value;
    this.connectScanner(this.selectedScanner, this.connectSuccess, this.connectError);
  }

  public scan() {
    this.scanDisabled();
    this.scanning = true;
    this.socket.emit('acquire', {
      productName: this.selectedScanner
    });
  }

  public finish() {
    this.connectScanner(this.selectedScanner, this.connectSuccess, this.connectError);
  }

  public reconnect() {
    this.connectScanner(this.selectedScanner, this.connectSuccess, this.connectError);
  }

  public connectScanner(productName: string, succssCallback, errorCallback) {
    this.scannerService
      .selectedScanner(productName)
      .then(response => {
        succssCallback(response);
      })
      .catch(error => {
        errorCallback(error);
      });
  }

  public connectSuccess(response) {
    this.scanEnabled();
  }

  public connectError(error) {
    this.$Notice.warning({
      title: '扫描仪故障',
      desc: '无法连接到扫描仪'
    });
    this.scanDisabled();
  }

  public getScanningImage() {
    this.interval = setInterval(() => {
      this.getImage();
    }, 100);
  }

  public stopGetScanningImage() {
    clearInterval(this.interval);
  }

  public getImage() {
    this.scannerService.getOnlineScanners().then(response => {
      this.scanningImage = SCAN_CLIENT_SERVER + response.data.image.path;
    });
  }

  public scanDisabled() {
    this.scanBtnDisabled = true;
  }

  public scanEnabled() {
    this.scanBtnDisabled = false;
  }

  public reset() {}

  public scanningListened() {
    this.socket.on('acquired', data => {
      console.log(data);
      this.scanningImage = SCAN_CLIENT_SERVER + 'acquire/image/' + data.path;
    });

    this.socket.on('keep_live', data => {
      console.log(data);
    });

    this.socket.on('over', data => {
      console.log('batch finished : ' + data.success);
      this.scanning = false;
      this.scanEnabled();
      this.stopGetScanningImage();
    });

    this.socket.on('failure', data => {
      console.log('batch finished : ' + data.message);
      this.scanning = false;
      this.scanEnabled();
      this.stopGetScanningImage();
      this.$Notice.warning({
        title: '扫描仪异常',
        desc: data.message
      });
    });
  }
}
