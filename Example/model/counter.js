import {observable, observe, computed, autorun} from 'mobx';
import autobind from 'autobind-decorator'

@autobind
class CounterStore {
  @observable counter = 0;
  total = -1;

  constructor(){
    autorun(() => {
      this.total += 1 + this.counter*0;
    } );
  }

  increase(){
    this.counter++;
  }

  decrease(){
    this.counter--;
  }
}

export default  new CounterStore();
