import { observable } from 'mobx';
import { Scene } from 'src/script/Scene';

export class Script {
  @observable scenes: Scene[] = [];

  constructor() {}
}
