import axios from 'axios';
import Component from 'vue-class-component';
import { Vue, Inject } from 'vue-property-decorator';

export class ScanTodo extends Vue {
  private todoes: any[] = [];

  getTodoList(): any[] {
    return this.todoes;
  }
}
