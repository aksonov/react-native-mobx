import {action, reaction, observable, observe, computed, autorun} from 'mobx';
import autobind from 'autobind-decorator'

@autobind
class CounterStore {
  @observable counter = 0;
  @observable total = 0;

  constructor(){
    reaction(()=>this.counter, ()=>this.total++);
  }


  @action increase(){
    this.counter++;
  }

  @action decrease(){
    this.counter--;
  }
}

export default  new CounterStore();
