import axios, { AxiosPromise } from 'axios';
import { Store } from 'vuex';
import VueRouter from 'vue-router';
import { SCAN_CLIENT_SERVER } from '@/constants';

export default class ScannerService {
  private facility: string = 'scanner';

  public getOnlineScanners(): AxiosPromise<any> {
    return axios.get('/acquire/facilities');
  }

  public selectedScanner(productName: string): AxiosPromise<any> {
    return axios.get('/acquire/connect/scanner/' + productName);
  }

  public realeaseScanner(productName: string): AxiosPromise<any> {
    return axios.get('/acquire/close/scanner/' + productName);
  }
}
